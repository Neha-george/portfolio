import { useState } from 'react'
import { Play, RotateCcw, Eye, EyeOff, ArrowRight } from 'lucide-react'
import './BB84Demo.css'

function randomBit() { return Math.random() > 0.5 ? 1 : 0 }
function randomBasis() { return Math.random() > 0.5 ? '+' : '×' }

const PHOTON_SYMBOLS = {
  '+': { 0: '→', 1: '↑' },
  '×': { 0: '↗', 1: '↘' },
}

function generateSession(eveActive) {
  const n = 12
  const aliceBits = Array.from({ length: n }, randomBit)
  const aliceBases = Array.from({ length: n }, randomBasis)
  const bobBases = Array.from({ length: n }, randomBasis)

  let transmitted = aliceBits.map((b, i) => b)
  let eveBits = null

  if (eveActive) {
    eveBits = aliceBits.map((b, i) => {
      const eveBasis = randomBasis()
      if (eveBasis !== aliceBases[i]) return randomBit()
      return b
    })
    transmitted = eveBits
  }

  const bobBits = transmitted.map((b, i) => {
    if (bobBases[i] === aliceBases[i]) return b
    return randomBit()
  })

  const siftedIndices = aliceBases.map((b, i) => b === bobBases[i] ? i : -1).filter(i => i >= 0)
  const rawKey = siftedIndices.map(i => aliceBits[i])
  const bobKey = siftedIndices.map(i => bobBits[i])

  // QBER: fraction of mismatches in sifted key
  const errors = rawKey.filter((b, i) => b !== bobKey[i]).length
  const qber = siftedIndices.length > 0 ? (errors / siftedIndices.length) : 0

  // Privacy amplification: trim last 2 bits if Eve
  const finalKey = eveActive ? rawKey.slice(0, Math.max(rawKey.length - 3, 1)) : rawKey

  return { n, aliceBits, aliceBases, bobBases, bobBits, siftedIndices, rawKey, bobKey, qber, finalKey, eveActive }
}

const STEPS = ['Alice Prepares', 'Bob Measures', 'Basis Sifting', 'QBER Check', 'Final Key']

export default function BB84Demo() {
  const [eveActive, setEveActive] = useState(false)
  const [step, setStep] = useState(0)
  const [session, setSession] = useState(null)
  const [started, setStarted] = useState(false)

  const start = () => {
    setSession(generateSession(eveActive))
    setStep(0)
    setStarted(true)
  }

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const reset = () => { setStarted(false); setSession(null); setStep(0) }

  return (
    <div className="bb84">
      {/* Controls */}
      <div className="bb84__controls">
        <div className="bb84__eve-toggle">
          <button
            className={`bb84__eve-btn ${eveActive ? 'bb84__eve-btn--active' : ''}`}
            onClick={() => { setEveActive(!eveActive); if (started) setSession(generateSession(!eveActive)) }}
          >
            {eveActive ? <Eye size={14} /> : <EyeOff size={14} />}
            Eve (Eavesdropper) {eveActive ? 'ON' : 'OFF'}
          </button>
          {eveActive && <span className="bb84__eve-warn">⚠ Intercept active — expect QBER spike!</span>}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={start} style={{ fontSize: 13, padding: '7px 14px' }}>
            <Play size={13} /> {started ? 'Regenerate' : 'Start Protocol'}
          </button>
          {started && (
            <button className="btn btn-ghost" onClick={reset} style={{ fontSize: 13, padding: '7px 14px' }}>
              <RotateCcw size={13} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Step Navigator */}
      {started && (
        <>
          <div className="bb84__steps">
            {STEPS.map((s, i) => (
              <div key={i} className={`bb84__step ${i <= step ? 'bb84__step--done' : ''} ${i === step ? 'bb84__step--active' : ''}`}>
                <div className="bb84__step-num">{i + 1}</div>
                <div className="bb84__step-label">{s}</div>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="bb84__panel glass">
            {step === 0 && <StepAlice s={session} />}
            {step === 1 && <StepBob s={session} />}
            {step === 2 && <StepSifting s={session} />}
            {step === 3 && <StepQBER s={session} />}
            {step === 4 && <StepKey s={session} />}
          </div>

          {step < STEPS.length - 1 && (
            <button className="btn btn-cyan" onClick={next} style={{ alignSelf: 'flex-start' }}>
              Next Step <ArrowRight size={14} />
            </button>
          )}
        </>
      )}

      {!started && (
        <div className="bb84__intro glass">
          <div className="bb84__intro-grid">
            {[
              { icon: '🔑', title: 'Alice', desc: 'Prepares qubits with random bits + random bases (+ or ×)' },
              { icon: '📡', title: 'Quantum Channel', desc: 'Photons transmitted — Eve may intercept and re-send' },
              { icon: '🔭', title: 'Bob', desc: 'Measures with random bases — matches retained' },
              { icon: '🔒', title: 'Shared Key', desc: 'Sifted bits form the secure key after error correction' },
            ].map(c => (
              <div key={c.title} className="bb84__intro-card">
                <div className="bb84__intro-icon">{c.icon}</div>
                <div className="bb84__intro-title">{c.title}</div>
                <div className="bb84__intro-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Bit({ bit, basis, highlight }) {
  const symbol = PHOTON_SYMBOLS[basis]?.[bit] ?? '?'
  return (
    <div className={`bb84__bit ${highlight ? 'bb84__bit--highlight' : ''}`}>
      <div className="bb84__photon">{symbol}</div>
      <div className="bb84__bit-val">{bit}</div>
      <div className="bb84__bit-basis">{basis}</div>
    </div>
  )
}

function StepAlice({ s }) {
  return (
    <div>
      <div className="bb84__step-title">Step 1: Alice Prepares Qubits</div>
      <p className="bb84__step-desc">Alice generates random bits and encodes each in a random quantum basis (+ rectilinear, × diagonal).</p>
      <div className="bb84__bit-row">
        {s.aliceBits.map((b, i) => <Bit key={i} bit={b} basis={s.aliceBases[i]} />)}
      </div>
      <div className="bb84__legend">
        <span>↑ / → = Basis +</span><span>↗ / ↘ = Basis ×</span>
        <span>Top: photon state · Middle: bit · Bottom: basis</span>
      </div>
    </div>
  )
}

function StepBob({ s }) {
  return (
    <div>
      <div className="bb84__step-title">Step 2: Bob Measures Randomly</div>
      <p className="bb84__step-desc">Bob independently chooses random measurement bases. When basis matches Alice's, measurement is perfect.</p>
      <div className="bb84__compare">
        <div>
          <div className="bb84__compare-label" style={{ color: 'var(--indigo-light)' }}>Alice Bases</div>
          <div className="bb84__bit-row">
            {s.aliceBases.map((b, i) => (
              <div key={i} className={`bb84__basis-cell ${b === s.bobBases[i] ? 'bb84__basis-cell--match' : 'bb84__basis-cell--miss'}`}>{b}</div>
            ))}
          </div>
        </div>
        <div>
          <div className="bb84__compare-label" style={{ color: 'var(--cyan-light)' }}>Bob Bases</div>
          <div className="bb84__bit-row">
            {s.bobBases.map((b, i) => (
              <div key={i} className={`bb84__basis-cell ${b === s.aliceBases[i] ? 'bb84__basis-cell--match' : 'bb84__basis-cell--miss'}`}>{b}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StepSifting({ s }) {
  return (
    <div>
      <div className="bb84__step-title">Step 3: Basis Sifting</div>
      <p className="bb84__step-desc">Alice and Bob publicly compare bases. Only matching-basis positions are kept for the raw key.</p>
      <div className="bb84__sift-grid">
        {s.aliceBits.map((b, i) => {
          const kept = s.siftedIndices.includes(i)
          return (
            <div key={i} className={`bb84__sift-cell ${kept ? 'bb84__sift-cell--kept' : 'bb84__sift-cell--drop'}`}>
              <div className="bb84__sift-bases">{s.aliceBases[i]}/{s.bobBases[i]}</div>
              <div className="bb84__sift-bit">{kept ? b : '✕'}</div>
              <div className="bb84__sift-status">{kept ? 'KEEP' : 'DROP'}</div>
            </div>
          )
        })}
      </div>
      <div className="bb84__sift-result">
        Raw sifted key ({s.rawKey.length} bits): <span className="bb84__key-bits">{s.rawKey.join(' ')}</span>
      </div>
    </div>
  )
}

function StepQBER({ s }) {
  const pct = Math.round(s.qber * 100)
  const safe = pct < 11
  return (
    <div>
      <div className="bb84__step-title">Step 4: Quantum Bit Error Rate (QBER)</div>
      <p className="bb84__step-desc">
        Compare a subset of sifted bits. Error rate above ~11% indicates eavesdropping (Eve intercept collapses superpositions, introducing detectable errors).
      </p>
      <div className="bb84__qber-display" style={{ borderColor: safe ? 'var(--emerald)' : 'var(--red)' }}>
        <div className="bb84__qber-val" style={{ color: safe ? 'var(--emerald)' : 'var(--red)' }}>
          QBER: {pct}%
        </div>
        <div className="bb84__qber-bar-wrap">
          <div className="bb84__qber-threshold" style={{ left: '11%' }} title="Eve detection threshold" />
          <div className="bb84__qber-bar" style={{
            width: `${Math.min(pct, 100)}%`,
            background: safe ? 'var(--emerald)' : 'var(--red)'
          }} />
        </div>
        <div className="bb84__qber-status">
          {safe
            ? '✅ Channel Secure — No eavesdrop detected'
            : `🚨 Eve Detected! QBER ${pct}% exceeds 11% threshold. Key ABORTED.`
          }
        </div>
        {s.eveActive && (
          <div className="bb84__qber-note">Eve's random basis guessing caused ~25% of measurements to collapse incorrectly.</div>
        )}
      </div>
    </div>
  )
}

function StepKey({ s }) {
  const pct = Math.round(s.qber * 100)
  const safe = pct < 11
  return (
    <div>
      <div className="bb84__step-title">Step 5: Privacy Amplification & Final Key</div>
      <p className="bb84__step-desc">
        {safe
          ? 'Channel is clean. Error correction and privacy amplification yield the final shared secret key.'
          : 'Eavesdrop detected — this key would be DISCARDED. Run new protocol with authenticated channel.'
        }
      </p>
      {safe ? (
        <div className="bb84__final-key">
          <div className="bb84__key-label">🔐 Shared Cryptographic Key ({s.finalKey.length} bits)</div>
          <div className="bb84__key-display">{s.finalKey.join('')}</div>
          <div className="bb84__key-hex">
            Hex: 0x{parseInt(s.finalKey.join(''), 2).toString(16).toUpperCase().padStart(4, '0')}
          </div>
        </div>
      ) : (
        <div className="bb84__aborted">
          <div>🔴 KEY ABORTED — Communication compromised</div>
          <div>Re-run protocol over authenticated channel with new qubits.</div>
        </div>
      )}
    </div>
  )
}

