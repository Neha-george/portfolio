import { useState } from 'react'
import { Phone, PhoneCall, Globe, CheckCircle, Star } from 'lucide-react'
import './SKILLSYNCDemo.css'

const LANGUAGES = ['English', 'Hindi', 'Malayalam', 'Tamil', 'Bengali', 'Telugu']

const LANG_GREETINGS = {
  English: "Hello! I'm SKILLSYNC. Let's verify your identity and build your worker profile.",
  Hindi: "नमस्ते! मैं SKILLSYNC हूँ। आइए आपकी पहचान सत्यापित करें।",
  Malayalam: "ഹലോ! ഞാൻ SKILLSYNC ആണ്. നമ്മൾ നിങ്ങളുടെ ഐഡൻ്റിറ്റി വെരിഫൈ ചെയ്യാം.",
  Tamil: "வணக்கம்! நான் SKILLSYNC. உங்கள் அடையாளத்தை சரிபார்க்கலாம்.",
  Bengali: "হ্যালো! আমি SKILLSYNC। আসুন আপনার পরিচয় যাচাই করি।",
  Telugu: "నమస్కారం! నేను SKILLSYNC. మీ గుర్తింపు ధృవీకరించుదాం.",
}

const defaults = { aadhaar: true, jobsDone: 14, clientRating: 4.2, referrals: 3, qrStamps: 9 }

export default function SKILLSYNCDemo() {
  const [lang, setLang] = useState('English')
  const [calling, setCalling] = useState(false)
  const [connected, setConnected] = useState(false)
  const [state, setState] = useState(defaults)

  const trustScore = Math.round(
    (state.aadhaar ? 25 : 0) +
    Math.min(state.jobsDone * 2, 25) +
    (state.clientRating / 5) * 20 +
    Math.min(state.referrals * 3, 15) +
    Math.min(state.qrStamps * 1.5, 15)
  )

  const trustBand = trustScore >= 80 ? 'Platinum' : trustScore >= 65 ? 'Gold' : trustScore >= 45 ? 'Silver' : 'Bronze'
  const trustColor = trustScore >= 80 ? 'var(--cyan)' : trustScore >= 65 ? 'var(--amber)' : trustScore >= 45 ? 'var(--text-secondary)' : 'var(--amber)'

  const handleCall = () => {
    setCalling(true)
    setTimeout(() => { setCalling(false); setConnected(true) }, 1800)
  }

  return (
    <div className="skillsync">
      <div className="skillsync__body">
        {/* Left: Dialer */}
        <div className="skillsync__dialer glass">
          <div className="skillsync__dialer-top">
            <Globe size={14} />
            <span className="skillsync__label">Voice Agent Dialer</span>
          </div>

          {/* Language Selector */}
          <div className="skillsync__lang-grid">
            {LANGUAGES.map(l => (
              <button
                key={l}
                className={`skillsync__lang-btn ${lang === l ? 'skillsync__lang-btn--active' : ''}`}
                onClick={() => { setLang(l); setConnected(false) }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Phone screen */}
          <div className="skillsync__phone">
            <div className="skillsync__phone-screen">
              <div className="skillsync__phone-name">SKILLSYNC AI</div>
              <div className="skillsync__phone-num">+91-VOICE-AI</div>
              {!connected && !calling && (
                <div className="skillsync__phone-status">Ready · {lang}</div>
              )}
              {calling && (
                <div className="skillsync__phone-status" style={{ color: 'var(--amber)' }}>
                  Connecting...
                </div>
              )}
              {connected && (
                <>
                  <div className="skillsync__phone-status" style={{ color: 'var(--emerald)' }}>
                    ● Connected · {lang}
                  </div>
                  <div className="skillsync__greeting">{LANG_GREETINGS[lang]}</div>
                </>
              )}
            </div>
            <div className="skillsync__dial-row">
              <button
                className={`skillsync__call-btn ${calling ? 'skillsync__call-btn--calling' : connected ? 'skillsync__call-btn--connected' : ''}`}
                onClick={!connected && !calling ? handleCall : () => setConnected(false)}
              >
                {calling ? <PhoneCall size={22} /> : connected ? <Phone size={22} style={{ transform: 'rotate(135deg)' }} /> : <Phone size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Trust Score */}
        <div className="skillsync__trust">
          <div className="skillsync__label"><Star size={13} /> Trust Score Calculator</div>

          <div className="skillsync__trust-display" style={{ borderColor: trustColor }}>
            <div className="skillsync__trust-score" style={{ color: trustColor }}>{trustScore}</div>
            <div className="skillsync__trust-band" style={{ color: trustColor }}>{trustBand} Worker</div>
            <div className="skillsync__trust-bar-wrap">
              <div className="skillsync__trust-bar" style={{ width: `${trustScore}%`, background: trustColor }} />
            </div>
          </div>

          <div className="skillsync__sliders">
            {/* Aadhaar */}
            <div className="skillsync__slider-row">
              <label className="skillsync__slider-label">
                <CheckCircle size={12} style={{ color: state.aadhaar ? 'var(--emerald)' : 'var(--text-faint)' }} />
                Aadhaar Verified <span className="skillsync__points">+25pts</span>
              </label>
              <button
                className={`skillsync__toggle ${state.aadhaar ? 'skillsync__toggle--on' : ''}`}
                onClick={() => setState(s => ({ ...s, aadhaar: !s.aadhaar }))}
              >
                <div className="skillsync__toggle-thumb" />
              </button>
            </div>

            {[
              { key: 'jobsDone', label: 'QR-Stamped Jobs', min: 0, max: 20, unit: 'jobs', points: '×2pts' },
              { key: 'clientRating', label: 'Client Rating', min: 1, max: 5, step: 0.1, unit: '⭐', points: '×4pts' },
              { key: 'referrals', label: 'Peer Referrals', min: 0, max: 10, unit: 'refs', points: '×3pts' },
              { key: 'qrStamps', label: 'QR Credential Stamps', min: 0, max: 15, unit: 'stamps', points: '×1.5pts' },
            ].map(({ key, label, min, max, step = 1, unit, points }) => (
              <div key={key} className="skillsync__slider-row skillsync__slider-row--range">
                <div className="skillsync__slider-top">
                  <label className="skillsync__slider-label">{label} <span className="skillsync__points">{points}</span></label>
                  <span className="skillsync__slider-val">{state[key]} {unit}</span>
                </div>
                <input
                  type="range"
                  min={min} max={max} step={step}
                  value={state[key]}
                  className="skillsync__range"
                  onChange={e => setState(s => ({ ...s, [key]: parseFloat(e.target.value) }))}
                />
              </div>
            ))}
          </div>

          <div className="skillsync__breakdown">
            <div className="skillsync__label" style={{ marginBottom: 8 }}>Score Breakdown</div>
            {[
              { label: 'Aadhaar ID', pts: state.aadhaar ? 25 : 0, max: 25, color: 'var(--emerald)' },
              { label: 'Jobs Completed', pts: Math.min(state.jobsDone * 2, 25), max: 25, color: 'var(--indigo-light)' },
              { label: 'Client Rating', pts: Math.round((state.clientRating / 5) * 20), max: 20, color: 'var(--amber)' },
              { label: 'Peer Referrals', pts: Math.min(state.referrals * 3, 15), max: 15, color: 'var(--cyan)' },
              { label: 'QR Stamps', pts: Math.min(Math.round(state.qrStamps * 1.5), 15), max: 15, color: 'var(--purple)' },
            ].map(b => (
              <div key={b.label} className="skillsync__bd-row">
                <span className="skillsync__bd-label">{b.label}</span>
                <div className="skillsync__bd-bar-wrap">
                  <div className="skillsync__bd-bar" style={{ width: `${(b.pts / b.max) * 100}%`, background: b.color }} />
                </div>
                <span className="skillsync__bd-pts" style={{ color: b.color }}>{b.pts}/{b.max}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

