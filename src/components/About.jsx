import { GraduationCap, Heart, Terminal, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import './About.css'

export default function About() {
  return (
    <section id="about" className="editorial-about">
      <div className="container">
        {/* Header */}
        <div className="editorial-about__header">
          <div>
            <div className="section-meta-tag">[06 // ABOUT & BACKGROUND]</div>
            <h2 className="section-title-large">Philosophy, Rigor & Roots</h2>
          </div>
          <p className="section-lead">
            Bridging theoretical data science, voice multimodality, and quantum mechanics with real-world enterprise engineering.
          </p>
        </div>

        {/* Dual Grid */}
        <div className="editorial-about__grid">
          {/* Left: Bio & Values */}
          <div className="editorial-about__bio-col">
            <h3 className="editorial-about__bio-title">
              "Software should be provably reliable, socially empowering, and mathematically sound."
            </h3>

            <p className="editorial-about__bio-p">
              I am a final-year Data Science Engineer based in Kerala, India, currently pursuing my B.Tech in Computer Science & Engineering at <strong>Mar Athanasius College of Engineering (MACE)</strong> with an <strong>8.2 CGPA</strong>.
            </p>

            <p className="editorial-about__bio-p">
              My engineering philosophy revolves around three non-negotiables:
            </p>

            <div className="editorial-about__values-list">
              <div className="editorial-about__value-card">
                <div className="editorial-about__value-num">01</div>
                <div>
                  <h4 className="editorial-about__value-heading">Deterministic & Zero-Hallucination AI</h4>
                  <p className="editorial-about__value-text">
                    Generative models are only as good as their guardrails. Through vector databases (ChromaDB) and citation mapping, I ensure every LLM output maps directly to verifiable ground truth.
                  </p>
                </div>
              </div>

              <div className="editorial-about__value-card">
                <div className="editorial-about__value-num">02</div>
                <div>
                  <h4 className="editorial-about__value-heading">Voice-First Inclusion for Bharat</h4>
                  <p className="editorial-about__value-text">
                    Over 450M informal workers in India face digital exclusion due to complex English UIs. My focus is building conversational voice agents that understand regional accents, dialects, and build portable trust.
                  </p>
                </div>
              </div>

              <div className="editorial-about__value-card">
                <div className="editorial-about__value-num">03</div>
                <div>
                  <h4 className="editorial-about__value-heading">Cryptographic Resilience</h4>
                  <p className="editorial-about__value-text">
                    As quantum computing looms, traditional public-key infrastructure will break. My research in BB84 QKD simulates single-photon transmission, basis sifting, and eavesdropper detection.
                  </p>
                </div>
              </div>
            </div>

            <div className="editorial-about__cta-row">
              <a href="#contact" className="btn-editorial btn-editorial-primary">
                <span>Start a Conversation</span>
                <ArrowUpRight size={14} />
              </a>
              <a href="#works" className="btn-editorial btn-editorial-secondary">
                <span>Explore Works</span>
              </a>
            </div>
          </div>

          {/* Right: Academic & Leadership Cards */}
          <div className="editorial-about__academic-col">
            {/* Education Card */}
            <div className="editorial-card editorial-about__edu-card">
              <div className="editorial-about__edu-icon-wrap">
                <GraduationCap size={22} />
              </div>
              <div>
                <span className="editorial-tag editorial-tag--accent">2022 — 2026</span>
                <h4 className="editorial-about__edu-title">B.Tech CSE (Data Science)</h4>
                <div className="editorial-about__edu-inst">
                  Mar Athanasius College of Engineering (MACE)
                </div>
                <div className="editorial-about__edu-grade">
                  <strong>CGPA: 8.2 / 10</strong> · Autonomous Institution · Kothamangalam, Kerala
                </div>
                <p className="editorial-about__edu-notes">
                  Coursework: Applied Machine Learning, Vector Databases, Data Structures & Algorithms, Cryptography, Statistical Inference, Natural Language Processing.
                </p>
              </div>
            </div>

            {/* Leadership Spotlight */}
            <div className="editorial-card editorial-about__leadership-card">
              <h4 className="editorial-about__subhead">Community & Technical Leadership</h4>

              <div className="editorial-about__lead-item">
                <div className="editorial-about__lead-item-top">
                  <span className="editorial-about__lead-role">Joint Secretary</span>
                  <span className="editorial-tag">2024 — PRESENT</span>
                </div>
                <div className="editorial-about__lead-org">IEEE Vehicular Technology Society (VTS) MACE</div>
                <p className="editorial-about__lead-desc">
                  Spearheading chapter symposiums, connected vehicle AI workshops, and cross-society developer hackathons.
                </p>
              </div>

              <div className="editorial-about__lead-item">
                <div className="editorial-about__lead-item-top">
                  <span className="editorial-about__lead-role">Web & Design Lead</span>
                  <span className="editorial-tag">2023 — PRESENT</span>
                </div>
                <div className="editorial-about__lead-org">MACE IoT Club</div>
                <p className="editorial-about__lead-desc">
                  Directing visual guidelines and leading frontend development for university IoT hackathons and flagship events.
                </p>
              </div>

              <div className="editorial-about__lead-item">
                <div className="editorial-about__lead-item-top">
                  <span className="editorial-about__lead-role">NSS Volunteer</span>
                  <span className="editorial-tag">2022 — PRESENT</span>
                </div>
                <div className="editorial-about__lead-org">National Service Scheme (MACE Unit)</div>
                <p className="editorial-about__lead-desc">
                  Active volunteer participating in community outreach, digital literacy programs for underprivileged students, and blood donation drives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

