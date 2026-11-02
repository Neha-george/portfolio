import { useState, useEffect, useRef } from 'react'
import { Play, Pause, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'
import './VIGILANTDemo.css'

const TRANSCRIPT = [
  { id: 1, speaker: 'Agent', time: '0:00', text: "Hello, this is Raj calling from CreditCare Collections. May I speak to Mr. Sharma?", flags: [] },
  { id: 2, speaker: 'Customer', time: '0:08', text: "Yes, speaking.", flags: [] },
  { id: 3, speaker: 'Agent', time: '0:10', text: "Sir, you have an outstanding loan of ₹45,000. You must pay immediately or we will contact your family members and employer.", flags: ['violation'] },
  { id: 4, speaker: 'Customer', time: '0:22', text: "I told you, I'll pay next week. Why do you keep calling after 8 PM?", flags: ['evidence'] },
  { id: 5, speaker: 'Agent', time: '0:28', text: "We will call whenever we need to. You are a defaulter and this will be reported everywhere.", flags: ['violation', 'harassment'] },
  { id: 6, speaker: 'Customer', time: '0:36', text: "This is harassment. I want a written notice.", flags: [] },
  { id: 7, speaker: 'Agent', time: '0:42', text: "You will receive a legal notice by tomorrow morning. Please make the payment.", flags: ['warning'] },
]

const RAG_RESULTS = [
  {
    clause: 'RBI/2022-23/147 — Para 4.2',
    title: 'Prohibited Contact Practices',
    match: 'Contacting third parties (family/employer) without borrower consent is strictly prohibited.',
    severity: 'violation',
    score: 0.97,
  },
  {
    clause: 'NBFC Fair Practice Code — Para 3(iv)',
    title: 'Calling Hours Restriction',
    match: 'Collection calls must only be made between 8:00 AM and 7:00 PM local time.',
    severity: 'violation',
    score: 0.94,
  },
  {
    clause: 'RBI Circular DOR.STR.REC.68/21.04.048',
    title: 'Harassment & Intimidation Ban',
    match: 'Using threatening, abusive or humiliating language during recovery is a regulatory violation.',
    severity: 'violation',
    score: 0.91,
  },
  {
    clause: 'NBFC FPC — Para 7',
    title: 'Written Notice Obligation',
    match: 'Borrower has right to written communication; agent acknowledgment of notice is compliant.',
    severity: 'compliant',
    score: 0.88,
  },
]

export default function VIGILANTDemo() {
  const [playing, setPlaying] = useState(false)
  const [currentLine, setCurrentLine] = useState(-1)
  const [riskScore, setRiskScore] = useState(0)
  const [analysisReady, setAnalysisReady] = useState(false)
  const timerRef = useRef(null)

  const targetScore = 82

  useEffect(() => {
    if (playing) {
      let idx = 0
      timerRef.current = setInterval(() => {
        setCurrentLine(idx)
        idx++
        if (idx >= TRANSCRIPT.length) {
          clearInterval(timerRef.current)
          setPlaying(false)
          setAnalysisReady(true)
        }
      }, 1600)
    }
    return () => clearInterval(timerRef.current)
  }, [playing])

  useEffect(() => {
    if (analysisReady) {
      let score = 0
      const interval = setInterval(() => {
        score += 2
        setRiskScore(Math.min(score, targetScore))
        if (score >= targetScore) clearInterval(interval)
      }, 30)
      return () => clearInterval(interval)
    }
  }, [analysisReady])

  const reset = () => {
    setPlaying(false)
    setCurrentLine(-1)
    setRiskScore(0)
    setAnalysisReady(false)
    clearInterval(timerRef.current)
  }

  const getRiskColor = (score) => {
    if (score >= 70) return 'var(--red)'
    if (score >= 40) return 'var(--amber)'
    return 'var(--emerald)'
  }

  const getRiskLabel = (score) => {
    if (score >= 70) return 'HIGH RISK'
    if (score >= 40) return 'MEDIUM RISK'
    return 'COMPLIANT'
  }

  return (
    <div className="vigilant">
      {/* Controls */}
      <div className="vigilant__controls">
        <div className="vigilant__call-info">
          <div className="pulse-dot" style={{ background: playing ? 'var(--red)' : 'var(--emerald)' }} />
          <span className="vigilant__call-label">
            {playing ? 'Analyzing Call...' : analysisReady ? 'Analysis Complete' : 'Simulated Debt Collection Call · Jun 2025'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className={`btn ${playing ? 'btn-ghost' : 'btn-primary'}`}
            onClick={() => { if (!playing) { reset(); setTimeout(() => setPlaying(true), 50) } else setPlaying(false) }}
            style={{ fontSize: 13, padding: '7px 14px' }}
          >
            {playing ? <><Pause size={13} /> Pause</> : <><Play size={13} /> {analysisReady ? 'Replay' : 'Run Audit'}</>}
          </button>
          {analysisReady && (
            <button className="btn btn-ghost" onClick={reset} style={{ fontSize: 13, padding: '7px 14px' }}>Reset</button>
          )}
        </div>
      </div>

      <div className="vigilant__body">
        {/* Left: Transcript */}
        <div className="vigilant__transcript">
          <div className="vigilant__pane-label">📞 Call Transcript</div>
          {TRANSCRIPT.map((line, i) => (
            <div
              key={line.id}
              className={`vigilant__line ${i <= currentLine ? 'vigilant__line--visible' : ''} ${line.speaker === 'Agent' ? 'vigilant__line--agent' : 'vigilant__line--customer'} ${i === currentLine ? 'vigilant__line--current' : ''}`}
            >
              <div className="vigilant__line-header">
                <span className={`vigilant__speaker badge ${line.speaker === 'Agent' ? 'badge-indigo' : 'badge-cyan'}`}>{line.speaker}</span>
                <span className="vigilant__time">{line.time}</span>
                {line.flags.map(f => (
                  <span key={f} className={`badge ${f === 'violation' ? 'badge-red' : f === 'warning' ? 'badge-amber' : 'badge-emerald'}`}>
                    {f === 'violation' ? <><XCircle size={10} /> VIOLATION</> : f === 'warning' ? <><AlertTriangle size={10} /> WARNING</> : <><Info size={10} /> EVIDENCE</>}
                  </span>
                ))}
              </div>
              <p className="vigilant__text">{line.text}</p>
            </div>
          ))}
        </div>

        {/* Right: RAG + Risk */}
        <div className="vigilant__right">
          {/* Risk Gauge */}
          <div className="vigilant__gauge glass">
            <div className="vigilant__pane-label">⚡ Risk Score</div>
            <div className="vigilant__gauge-meter">
              <svg viewBox="0 0 120 60" className="vigilant__gauge-svg">
                <path d="M10,55 A50,50 0 0,1 110,55" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" strokeLinecap="round" />
                <path
                  d="M10,55 A50,50 0 0,1 110,55"
                  fill="none"
                  stroke={getRiskColor(riskScore)}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(riskScore / 100) * 157} 157`}
                  style={{ transition: 'stroke-dasharray 0.1s, stroke 0.5s' }}
                />
                <text x="60" y="48" textAnchor="middle" fill={getRiskColor(riskScore)} fontSize="18" fontWeight="800" fontFamily="JetBrains Mono">{riskScore}</text>
              </svg>
            </div>
            <div className="vigilant__risk-label" style={{ color: getRiskColor(riskScore) }}>
              {getRiskLabel(riskScore)}
            </div>
            {analysisReady && (
              <div className="vigilant__flag-summary">
                <span className="badge badge-red"><XCircle size={10} /> 3 Violations</span>
                <span className="badge badge-amber"><AlertTriangle size={10} /> 1 Warning</span>
                <span className="badge badge-emerald"><CheckCircle size={10} /> 1 Compliant</span>
              </div>
            )}
          </div>

          {/* RAG Clauses */}
          {analysisReady && (
            <div className="vigilant__rag">
              <div className="vigilant__pane-label">🔍 RAG Clause Inspector</div>
              {RAG_RESULTS.map((r, i) => (
                <div key={i} className={`vigilant__clause ${r.severity === 'violation' ? 'vigilant__clause--violation' : r.severity === 'warning' ? 'vigilant__clause--warning' : 'vigilant__clause--compliant'}`}>
                  <div className="vigilant__clause-header">
                    <span className="vigilant__clause-code">{r.clause}</span>
                    <span className={`badge ${r.severity === 'violation' ? 'badge-red' : r.severity === 'warning' ? 'badge-amber' : 'badge-emerald'}`}>
                      {Math.round(r.score * 100)}% match
                    </span>
                  </div>
                  <div className="vigilant__clause-title">{r.title}</div>
                  <div className="vigilant__clause-match">{r.match}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

