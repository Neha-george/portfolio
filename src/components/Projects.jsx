import { useState } from 'react'
import { ArrowUpRight, Play, Sparkles, GitBranch, Shield, Mic, Atom, TrendingUp, Heart } from 'lucide-react'
import './Projects.css'

const WORKS = [
  {
    id: 'vigilant',
    index: '01',
    title: 'VIGILANT',
    subtitle: 'Real-Time RBI Compliance Call Auditor',
    category: 'Enterprise Applied AI & RAG',
    year: '2026',
    accolade: 'Vajra Hackathon Top 4 Finalist',
    accoladeType: 'cyan',
    icon: Shield,
    desc: 'Audits multi-turn debt recovery calls against official RBI/NBFC regulatory clauses with speaker diarization, risk scoring (0-100), and zero hallucination through vector verification in ChromaDB.',
    stack: ['Google Gemini 2.0 Flash', 'ChromaDB', 'FastAPI', 'Speaker Diarization', 'Python'],
    metrics: ['0.0% Hallucination Target', '<1.2s Audit Latency', '100% RBI Clause Traceability'],
    github: 'https://github.com/Neha-george',
    sandboxAnchor: '#sandbox',
    sandboxTab: 'vigilant',
  },
  {
    id: 'skillsync',
    index: '02',
    title: 'SKILLSYNC',
    subtitle: 'Multilingual Voice Identity & Trust Engine',
    category: 'Voice AI & Social Impact Infrastructure',
    year: '2026',
    accolade: 'Tinkherhack 2026 Winner (1st) & Girlathon Best Innovation',
    accoladeType: 'amber',
    icon: Mic,
    desc: 'Voice-first digital identity & portable credentialing platform for India\'s 450M+ informal workforce. Features conversational AI onboarding in 10+ regional languages and a dynamic 0-100 Trust Score based on Aadhaar and QR job stamps.',
    stack: ['Google Gemini 1.5 Flash', 'FastAPI', 'Multilingual STT', 'Trust Algorithm', 'QR Verification'],
    metrics: ['10+ Indian Languages', '450M+ Worker Target', 'Dynamic Trust Score (0-100)'],
    github: 'https://github.com/Neha-george',
    sandboxAnchor: '#sandbox',
    sandboxTab: 'skillsync',
  },
  {
    id: 'bb84',
    index: '03',
    title: 'BB84 QKD SIMULATOR',
    subtitle: 'Quantum Key Distribution & Attack Resilience',
    category: 'Quantum Computing & Cryptography',
    year: '2025',
    accolade: 'Academic & Research Project',
    accoladeType: 'emerald',
    icon: Atom,
    desc: 'Simulates the BB84 single-photon quantum cryptographic key exchange protocol. Incorporates recursive basis sifting, Eve eavesdropping interception, dynamic Quantum Bit Error Rate (QBER) calculation, and privacy amplification.',
    stack: ['Python', 'NumPy', 'Quantum Mechanics', 'Cryptographic Sifting', 'QBER Analysis'],
    metrics: ['11% Theoretical Eve Threshold', 'Recursive Basis Sifting', 'Cryptographic Key Derivation'],
    github: 'https://github.com/Neha-george',
    sandboxAnchor: '#sandbox',
    sandboxTab: 'bb84',
  },
  {
    id: 'fintrack',
    index: '04',
    title: 'FINTRACK AI',
    subtitle: 'Predictive Personal Financial Intelligence',
    category: 'Applied Machine Learning & FinTech',
    year: '2025',
    accolade: 'Academic Project',
    accoladeType: 'indigo',
    icon: TrendingUp,
    desc: 'Intelligent expense categorization and time-series spending forecaster. Leverages NLP for SMS/receipt transaction extraction and statistical forecasting models for personal budget control.',
    stack: ['Python', 'Scikit-Learn', 'FastAPI', 'React', 'Time-Series Forecasting'],
    metrics: ['94% Transaction Parsing Accuracy', '30-Day Predictive Cash Flow', 'Automated Anomaly Flags'],
    github: 'https://github.com/Neha-george',
    sandboxAnchor: null,
  },
  {
    id: 'heforher',
    index: '05',
    title: 'HEFORHER PLATFORM',
    subtitle: 'Social Equity & Policy Accessibility Engine',
    category: 'Community Tech & IEEE Initiative',
    year: '2024',
    accolade: 'IEEE WIE MACE Flagship Project',
    accoladeType: 'indigo',
    icon: Heart,
    desc: 'Digital resource and reporting platform promoting workplace equality, transparent rights education, and community support networks under the IEEE Women in Engineering banner.',
    stack: ['React', 'Node.js', 'Firebase', 'UI/UX Design', 'Accessibility Standards'],
    metrics: ['500+ Community Members', 'Multilingual Resource Library', 'Safe Reporting Channel'],
    github: 'https://github.com/Neha-george',
    sandboxAnchor: null,
  },
]

export default function Projects({ onSelectSandboxTab }) {
  const [hovered, setHovered] = useState(null)

  const handleOpenSandbox = (tabId) => {
    if (onSelectSandboxTab) {
      onSelectSandboxTab(tabId)
    }
    const sandboxEl = document.querySelector('#sandbox')
    if (sandboxEl) {
      sandboxEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="works" className="editorial-works">
      <div className="container">
        {/* Section Header */}
        <div className="editorial-works__header">
          <div>
            <div className="section-meta-tag">[02 // SELECTED WORKS]</div>
            <h2 className="section-title-large">Engineered Systems & Projects</h2>
          </div>
          <p className="section-lead">
            Production-grade AI compliance systems, multilingual voice agents, and quantum cryptographic algorithms built with relentless focus on zero-hallucination reliability.
          </p>
        </div>

        {/* Editorial Project List */}
        <div className="editorial-works__list">
          {WORKS.map((project) => (
            <div
              key={project.id}
              className={`editorial-works__item ${hovered === project.id ? 'editorial-works__item--hovered' : ''}`}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="editorial-works__item-main">
                {/* Number & Category */}
                <div className="editorial-works__item-meta">
                  <span className="editorial-works__item-index">{project.index}</span>
                  <span className="editorial-tag">{project.category}</span>
                  <span className="editorial-works__item-year">{project.year}</span>
                  {project.accolade && (
                    <span className={`editorial-tag editorial-tag--${project.accoladeType}`}>
                      ✦ {project.accolade}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div className="editorial-works__item-title-row">
                  <h3 className="editorial-works__item-title">{project.title}</h3>
                  <span className="editorial-works__item-sub">{project.subtitle}</span>
                </div>

                {/* Description */}
                <p className="editorial-works__item-desc">{project.desc}</p>

                {/* Stack Pills */}
                <div className="editorial-works__item-stack">
                  {project.stack.map(s => (
                    <span key={s} className="editorial-tag">{s}</span>
                  ))}
                </div>

                {/* Metric Strip */}
                <div className="editorial-works__metrics">
                  {project.metrics.map(m => (
                    <div key={m} className="editorial-works__metric-item">
                      <span className="editorial-works__metric-bullet">●</span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="editorial-works__item-actions">
                {project.sandboxTab && (
                  <button
                    className="btn-editorial btn-editorial-accent editorial-works__sandbox-btn"
                    onClick={() => handleOpenSandbox(project.sandboxTab)}
                  >
                    <Play size={13} fill="currentColor" />
                    <span>Run Live Sandbox</span>
                  </button>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial btn-editorial-secondary"
                  title="View Source on GitHub"
                >
                  <GitBranch size={14} />
                  <span>GitHub</span>
                  <ArrowUpRight size={13} style={{ opacity: 0.6 }} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
