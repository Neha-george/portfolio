import { useState, useEffect } from 'react'
import { Terminal, ArrowUpRight, Menu, X, Clock } from 'lucide-react'
import './Navbar.css'

const NAV_LINKS = [
  { href: '#works', label: '01. Works' },
  { href: '#sandbox', label: '02. Sandbox Lab' },
  { href: '#skills', label: '03. Capabilities' },
  { href: '#achievements', label: '04. Honors' },
  { href: '#about', label: '05. About' },
  { href: '#contact', label: '06. Contact' },
]

export default function Navbar({ onOpenCmd }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const istOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      setTimeStr(new Intl.DateTimeFormat('en-GB', istOptions).format(now))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className={`editorial-nav ${scrolled ? 'editorial-nav--scrolled' : ''}`}>
      <div className="editorial-nav__inner container">
        {/* Brand identity */}
        <a href="#" className="editorial-nav__brand">
          <span className="editorial-nav__name">NEHA GEORGE</span>
          <span className="editorial-nav__role">AI ENGINEER</span>
          <span className="editorial-nav__status">
            <span className="live-status-dot" />
            <span className="editorial-nav__status-text">AVAILABLE OCT '26</span>
          </span>
        </a>

        {/* Navigation links */}
        <nav className="editorial-nav__links">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="editorial-nav__link">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="editorial-nav__actions">
          {/* Live IST clock */}
          <div className="editorial-nav__clock" title="Kochi, India Local Time (IST / UTC+5:30)">
            <Clock size={12} className="editorial-nav__clock-icon" />
            <span>{timeStr || '12:00:00'} IST</span>
          </div>

          {/* Command palette pill */}
          <button
            className="editorial-nav__cmd-btn"
            onClick={onOpenCmd}
            title="Open Command Palette (Ctrl+K or Cmd+K)"
          >
            <Terminal size={13} />
            <span className="editorial-nav__cmd-key">⌘K</span>
          </button>

          {/* Get in touch button */}
          <a href="#contact" className="btn-editorial btn-editorial-primary editorial-nav__contact-btn">
            <span>Get in Touch</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile hamburger */}
          <button
            className="editorial-nav__menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="editorial-nav__mobile-menu">
          <div className="editorial-nav__mobile-meta">
            <span>KOCHI, INDIA (UTC +5:30)</span>
            <span className="editorial-nav__mobile-clock">{timeStr} IST</span>
          </div>
          <div className="editorial-nav__mobile-links">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="editorial-nav__mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="editorial-nav__mobile-footer">
            <button
              className="btn-editorial btn-editorial-secondary"
              style={{ width: '100%', marginBottom: 8 }}
              onClick={() => { setMenuOpen(false); onOpenCmd() }}
            >
              <Terminal size={14} />
              <span>Command Palette (⌘K)</span>
            </button>
            <a
              href="mailto:nehageorge008@gmail.com"
              className="btn-editorial btn-editorial-primary"
              style={{ width: '100%' }}
            >
              <span>Email Neha George</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
