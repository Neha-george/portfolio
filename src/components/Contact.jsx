import { useState, useEffect } from 'react'
import { Mail, Phone, GitBranch, Link as LinkIcon, Copy, Check, Send, ArrowUpRight, Clock, Sparkles } from 'lucide-react'
import './Contact.css'

const CONTACT_ITEMS = [
  {
    id: 'email',
    label: 'Direct Email',
    value: 'nehageorge008@gmail.com',
    href: 'mailto:nehageorge008@gmail.com',
    copyable: true,
    tag: 'Primary Channel',
    icon: Mail,
  },
  {
    id: 'phone',
    label: 'Direct Phone / WhatsApp',
    value: '+91 9961255066',
    href: 'tel:+919961255066',
    copyable: true,
    tag: 'Calls & Text',
    icon: Phone,
  },
  {
    id: 'github',
    label: 'GitHub Codebase',
    value: 'github.com/Neha-george',
    href: 'https://github.com/Neha-george',
    copyable: false,
    tag: 'Open Source',
    icon: GitBranch,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn Profile',
    value: 'linkedin.com/in/neha-george26',
    href: 'https://www.linkedin.com/in/neha-george26/',
    copyable: false,
    tag: 'Professional',
    icon: LinkIcon,
  },
]

export default function Contact() {
  const [copiedId, setCopiedId] = useState(null)
  const [timeStr, setTimeStr] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Full-Time AI Engineering Opportunity', message: '' })
  const [sent, setSent] = useState(false)

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const istOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      setTimeStr(new Intl.DateTimeFormat('en-US', istOptions).format(now))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCopy = (value, id) => {
    navigator.clipboard.writeText(value)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`)
    const body = encodeURIComponent(`Hi Neha,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`)
    window.open(`mailto:nehageorge008@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contact" className="editorial-contact">
      <div className="container">
        {/* Massive Editorial CTA Headline */}
        <div className="editorial-contact__banner">
          <div className="section-meta-tag">[07 // GET IN TOUCH]</div>
          <h2 className="editorial-contact__big-title">
            LET'S ARCHITECT
            <br />
            <span className="editorial-contact__big-title--gradient">
              SOMETHING EXTRAORDINARY.
            </span>
          </h2>
          <p className="editorial-contact__banner-desc">
            Currently interviewing for Full-Time AI/ML Engineering & RAG Systems roles starting October 2026. Open to remote teams worldwide or hybrid roles in India.
          </p>
        </div>

        {/* Dual Grid: Direct Contact Dock + Message Composer */}
        <div className="editorial-contact__grid">
          {/* Left: Quick Connect Ledger */}
          <div className="editorial-contact__dock-col">
            <div className="editorial-contact__location-card editorial-card">
              <div className="editorial-contact__loc-header">
                <span className="live-status-dot" />
                <span className="editorial-contact__loc-title">LOCATION & LOCAL TIME</span>
              </div>
              <div className="editorial-contact__loc-city">Kochi, Kerala, India</div>
              <div className="editorial-contact__loc-clock">
                <Clock size={14} className="editorial-contact__clock-icon" />
                <span>{timeStr || '12:00:00 PM'} IST (UTC +5:30)</span>
              </div>
              <p className="editorial-contact__loc-status">
                Usually responds within 2-4 hours during business days.
              </p>
            </div>

            {/* Contact Items */}
            <div className="editorial-contact__items-list">
              {CONTACT_ITEMS.map((item) => (
                <div key={item.id} className="editorial-contact__item editorial-card">
                  <div className="editorial-contact__item-icon-wrap">
                    <item.icon size={18} />
                  </div>
                  <div className="editorial-contact__item-info">
                    <div className="editorial-contact__item-top">
                      <span className="editorial-contact__item-label">{item.label}</span>
                      <span className="editorial-tag">{item.tag}</span>
                    </div>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="editorial-contact__item-val"
                    >
                      {item.value}
                    </a>
                  </div>

                  {item.copyable && (
                    <button
                      className="editorial-contact__copy-btn"
                      onClick={() => handleCopy(item.value, item.id)}
                      title={`Copy ${item.label}`}
                    >
                      {copiedId === item.id ? (
                        <span className="editorial-contact__copied-badge">
                          <Check size={12} /> Copied!
                        </span>
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Direct Composer Form */}
          <div className="editorial-contact__form-col">
            <form className="editorial-contact__form editorial-card" onSubmit={handleSubmit}>
              <div className="editorial-contact__form-header">
                <h3 className="editorial-contact__form-title">Send a Direct Note</h3>
                <span className="editorial-contact__form-sub">Opens straight into your default email client</span>
              </div>

              <div className="editorial-contact__form-row">
                <div className="editorial-contact__field">
                  <label className="editorial-contact__label">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Sharma"
                    className="editorial-contact__input"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="editorial-contact__field">
                  <label className="editorial-contact__label">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. maya@company.com"
                    className="editorial-contact__input"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="editorial-contact__field">
                <label className="editorial-contact__label">Inquiry Subject</label>
                <select
                  className="editorial-contact__input"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="Full-Time AI Engineering Opportunity">Full-Time AI Engineering Opportunity</option>
                  <option value="Research or Technical Collaboration">Research or Technical Collaboration</option>
                  <option value="Hackathon or Project Discussion">Hackathon or Project Discussion</option>
                  <option value="General Conversation & Networking">General Conversation & Networking</option>
                </select>
              </div>

              <div className="editorial-contact__field">
                <label className="editorial-contact__label">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Hi Neha, I came across your VIGILANT RAG compliance auditor and SKILLSYNC voice system, and would love to connect regarding..."
                  className="editorial-contact__input editorial-contact__textarea"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className={`btn-editorial ${sent ? 'btn-editorial-accent' : 'btn-editorial-primary'} editorial-contact__submit-btn`}
              >
                {sent ? (
                  <>
                    <Check size={16} />
                    <span>Email Client Triggered!</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message to Neha</span>
                    <ArrowUpRight size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Editorial Colophon & Footer */}
        <footer className="editorial-colophon">
          <div className="editorial-colophon__top">
            <div className="editorial-colophon__brand">
              <span className="editorial-colophon__logo">NEHA GEORGE</span>
              <span className="editorial-colophon__lead">
                AI Systems & RAG Architect · Final-Year CSE @ MACE
              </span>
            </div>
            <div className="editorial-colophon__nav">
              <a href="#works">Works</a>
              <a href="#sandbox">Sandbox Lab</a>
              <a href="#skills">Capabilities</a>
              <a href="#achievements">Honors</a>
              <a href="#about">About</a>
              <a href="https://github.com/Neha-george" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/neha-george26/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>

          <div className="editorial-colophon__bottom">
            <div className="editorial-colophon__copy">
              © {new Date().getFullYear()} Neha George. Designed & engineered with React, Vite & pure CSS.
            </div>
            <div className="editorial-colophon__colophon">
              TYPEFACES: SPACE GROTESK & JETBRAINS MONO · ZERO EXTERNAL UI FRAMEWORKS
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
