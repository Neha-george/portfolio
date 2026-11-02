import { ArrowDown, ArrowUpRight, Terminal, Cpu, Shield, Sparkles, GitBranch, Link as LinkIcon, Mail } from 'lucide-react'
import './Hero.css'

export default function Hero({ onOpenCmd }) {
  return (
    <section className="editorial-hero">
      <div className="container">
        {/* Top meta indices */}
        <div className="editorial-hero__meta-bar">
          <div className="editorial-hero__meta-item">
            <span className="editorial-hero__meta-index">[01 // INDEX]</span>
            <span>PORTFOLIO '26</span>
          </div>
          <div className="editorial-hero__meta-item">
            <span className="editorial-hero__meta-index">[LOC]</span>
            <span>KERALA, INDIA (UTC+5:30)</span>
          </div>
          <div className="editorial-hero__meta-item">
            <span className="editorial-hero__meta-index">[ACAD]</span>
            <span>B.TECH CSE (DATA SCIENCE) @ MACE</span>
          </div>
        </div>

        {/* Massive Editorial Headline */}
        <div className="editorial-hero__headline-wrap">
          <h1 className="editorial-hero__title">
            <span className="editorial-hero__title-line">AI SYSTEMS</span>
            <span className="editorial-hero__title-line editorial-hero__title-line--gradient">
              & RAG ARCHITECT
            </span>
          </h1>
        </div>

        {/* Dual Column Layout: Statement + CTAs */}
        <div className="editorial-hero__grid">
          <div className="editorial-hero__col-statement">
            <p className="editorial-hero__lead">
              Hi, I'm <strong style={{ color: '#FFFFFF' }}>Neha George</strong> — an AI Engineer architecting enterprise compliance automation with zero-hallucination RAG, voice-first digital identity for 450M+ informal workers, and quantum key distribution simulations.
            </p>
            <div className="editorial-hero__tags">
              <span className="editorial-tag editorial-tag--accent">RAG Pipelines</span>
              <span className="editorial-tag editorial-tag--cyan">Google Gemini 2.0 Flash</span>
              <span className="editorial-tag editorial-tag--emerald">ChromaDB Vector DB</span>
              <span className="editorial-tag">BB84 QKD Protocol</span>
              <span className="editorial-tag">Multilingual Diarization</span>
              <span className="editorial-tag">FastAPI & Python</span>
            </div>
          </div>

          <div className="editorial-hero__col-actions">
            <div className="editorial-hero__btn-group">
              <a href="#works" className="btn-editorial btn-editorial-primary">
                <span>Selected Works</span>
                <ArrowDown size={14} />
              </a>
              <a href="#sandbox" className="btn-editorial btn-editorial-secondary">
                <Sparkles size={14} style={{ color: 'var(--cyan)' }} />
                <span>Sandbox Studio</span>
              </a>
              <button onClick={onOpenCmd} className="btn-editorial btn-editorial-secondary">
                <Terminal size={14} />
                <span>Terminal (⌘K)</span>
              </button>
            </div>

            <div className="editorial-hero__links">
              <a
                href="https://github.com/Neha-george"
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-hero__link"
              >
                <GitBranch size={14} />
                <span>github.com/Neha-george</span>
                <ArrowUpRight size={12} />
              </a>
              <a
                href="https://www.linkedin.com/in/neha-george26/"
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-hero__link"
              >
                <LinkIcon size={14} />
                <span>linkedin.com/in/neha-george26</span>
                <ArrowUpRight size={12} />
              </a>
              <a
                href="mailto:nehageorge008@gmail.com"
                className="editorial-hero__link"
              >
                <Mail size={14} />
                <span>nehageorge008@gmail.com</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Editorial Metric Cards */}
        <div className="editorial-hero__stats-row">
          <div className="editorial-hero__stat-card">
            <div className="editorial-hero__stat-header">
              <span className="editorial-hero__stat-num">3×</span>
              <span className="editorial-tag editorial-tag--amber">Podium Finishes</span>
            </div>
            <div className="editorial-hero__stat-title">Hackathon Honors</div>
            <div className="editorial-hero__stat-desc">Vajra Top 4 · Tinkherhack Winner · Girlathon Best Innovation</div>
          </div>

          <div className="editorial-hero__stat-card">
            <div className="editorial-hero__stat-header">
              <span className="editorial-hero__stat-num">8.2</span>
              <span className="editorial-tag editorial-tag--accent">MACE Engineering</span>
            </div>
            <div className="editorial-hero__stat-title">CGPA (Data Science)</div>
            <div className="editorial-hero__stat-desc">Mar Athanasius College of Engineering · Class of 2026</div>
          </div>

          <div className="editorial-hero__stat-card">
            <div className="editorial-hero__stat-header">
              <span className="editorial-hero__stat-num">10+</span>
              <span className="editorial-tag editorial-tag--cyan">Multilingual AI</span>
            </div>
            <div className="editorial-hero__stat-title">Supported Languages</div>
            <div className="editorial-hero__stat-desc">Voice diarization & onboarding for India's regional workforce</div>
          </div>

          <div className="editorial-hero__stat-card">
            <div className="editorial-hero__stat-header">
              <span className="editorial-hero__stat-num">0.0%</span>
              <span className="editorial-tag editorial-tag--emerald">Zero Hallucination</span>
            </div>
            <div className="editorial-hero__stat-title">RAG Precision</div>
            <div className="editorial-hero__stat-desc">Strict ChromaDB clause matching for RBI/NBFC compliance audits</div>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Ticker */}
      <div className="marquee-container" style={{ marginTop: '50px' }}>
        <div className="marquee-content">
          <span>APPLIED AI & RAG ARCHITECT</span>
          <span className="marquee-separator">✦</span>
          <span>GOOGLE GEMINI 2.0 FLASH</span>
          <span className="marquee-separator">✦</span>
          <span>TINKHERHACK 2026 WINNER</span>
          <span className="marquee-separator">✦</span>
          <span>BB84 QUANTUM CRYPTOGRAPHY</span>
          <span className="marquee-separator">✦</span>
          <span>SPEAKER DIARIZATION</span>
          <span className="marquee-separator">✦</span>
          <span>VAJRA HACKATHON TOP 4</span>
          <span className="marquee-separator">✦</span>
          <span>CHROMADB VECTOR EMBEDDINGS</span>
          <span className="marquee-separator">✦</span>
          <span>IEEE VTS JOINT SECRETARY</span>
          <span className="marquee-separator">✦</span>
          <span>FASTAPI & PYTHON</span>
          <span className="marquee-separator">✦</span>
          <span>GIRLATHON BEST INNOVATION</span>
          <span className="marquee-separator">✦</span>
          <span>APPLIED AI & RAG ARCHITECT</span>
          <span className="marquee-separator">✦</span>
          <span>GOOGLE GEMINI 2.0 FLASH</span>
          <span className="marquee-separator">✦</span>
          <span>TINKHERHACK 2026 WINNER</span>
          <span className="marquee-separator">✦</span>
        </div>
      </div>
    </section>
  )
}
