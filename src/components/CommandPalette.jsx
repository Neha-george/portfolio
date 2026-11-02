import { useState, useEffect, useRef } from 'react'
import { Search, Mail, GitBranch, Link as LinkIcon, Shield, Mic, Atom, Trophy, User, Cpu, Sparkles, Phone, ChevronRight } from 'lucide-react'
import './CommandPalette.css'

const COMMAND_GROUPS = [
  {
    group: 'Navigation & Sections',
    items: [
      { id: 'nav-works', icon: Cpu, label: '01 // Selected Works', badge: 'Projects & Systems', action: () => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' }) },
      { id: 'nav-sandbox', icon: Sparkles, label: '02 // Interactive Sandbox Studio', badge: 'Live Simulators', action: () => document.querySelector('#sandbox')?.scrollIntoView({ behavior: 'smooth' }) },
      { id: 'nav-skills', icon: Cpu, label: '03 // Technical Capabilities', badge: 'Stack & Disciplines', action: () => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }) },
      { id: 'nav-honors', icon: Trophy, label: '04 // Honors & Trophy Case', badge: 'Podiums & Awards', action: () => document.querySelector('#achievements')?.scrollIntoView({ behavior: 'smooth' }) },
      { id: 'nav-about', icon: User, label: '05 // About & Background', badge: 'Philosophy & MACE', action: () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) },
      { id: 'nav-contact', icon: Mail, label: '06 // Direct Contact & Dock', badge: 'Get in Touch', action: () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) },
    ],
  },
  {
    group: 'Live Simulators',
    items: [
      { id: 'sim-vigilant', icon: Shield, label: 'Launch VIGILANT Auditor', badge: 'RBI Compliance RAG', action: (ctx) => { ctx.selectTab?.('vigilant'); document.querySelector('#sandbox')?.scrollIntoView({ behavior: 'smooth' }) } },
      { id: 'sim-skillsync', icon: Mic, label: 'Launch SKILLSYNC Voice Agent', badge: 'Trust Score Engine', action: (ctx) => { ctx.selectTab?.('skillsync'); document.querySelector('#sandbox')?.scrollIntoView({ behavior: 'smooth' }) } },
      { id: 'sim-bb84', icon: Atom, label: 'Launch BB84 Quantum Simulator', badge: 'Eve Intercept Test', action: (ctx) => { ctx.selectTab?.('bb84'); document.querySelector('#sandbox')?.scrollIntoView({ behavior: 'smooth' }) } },
    ],
  },
  {
    group: 'Quick Actions & Channels',
    items: [
      {
        id: 'act-email',
        icon: Mail,
        label: 'Copy Email Address',
        badge: 'nehageorge008@gmail.com',
        action: () => {
          navigator.clipboard.writeText('nehageorge008@gmail.com')
          return 'Email copied to clipboard (nehageorge008@gmail.com)'
        },
      },
      {
        id: 'act-phone',
        icon: Phone,
        label: 'Copy Phone Number',
        badge: '+91 9961255066',
        action: () => {
          navigator.clipboard.writeText('+91 9961255066')
          return 'Phone number copied to clipboard (+91 9961255066)'
        },
      },
      {
        id: 'act-github',
        icon: GitBranch,
        label: 'Open GitHub Profile',
        badge: 'github.com/Neha-george',
        action: () => {
          window.open('https://github.com/Neha-george', '_blank')
        },
      },
      {
        id: 'act-linkedin',
        icon: LinkIcon,
        label: 'Open LinkedIn Profile',
        badge: 'linkedin.com/in/neha-george26',
        action: () => {
          window.open('https://www.linkedin.com/in/neha-george26/', '_blank')
        },
      },
    ],
  },
]

export default function CommandPalette({ isOpen, onClose, onSelectTab }) {
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [toastMessage, setToastMessage] = useState(null)
  const inputRef = useRef(null)

  const allItems = COMMAND_GROUPS.flatMap(g => g.items)
  const filtered = query.trim()
    ? allItems.filter(i =>
        i.label.toLowerCase().includes(query.toLowerCase()) ||
        i.badge?.toLowerCase().includes(query.toLowerCase())
      )
    : allItems

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60)
      setQuery('')
      setSelectedIdx(0)
    }
  }, [isOpen])

  const executeItem = (item) => {
    const feedback = item.action?.({ selectTab: onSelectTab })
    if (feedback) {
      setToastMessage(feedback)
      setTimeout(() => setToastMessage(null), 3000)
    }
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx(idx => (idx + 1) % filtered.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx(idx => (idx - 1 + filtered.length) % filtered.length)
    } else if (e.key === 'Enter' && filtered[selectedIdx]) {
      e.preventDefault()
      executeItem(filtered[selectedIdx])
    }
  }

  if (!isOpen && !toastMessage) return null

  return (
    <>
      {toastMessage && (
        <div className="editorial-cmd__toast">
          <span>{toastMessage}</span>
        </div>
      )}

      {isOpen && (
        <div className="editorial-cmd__overlay" onClick={onClose}>
          <div className="editorial-cmd__palette editorial-card" onClick={e => e.stopPropagation()}>
            {/* Search Header */}
            <div className="editorial-cmd__search-bar">
              <Search size={16} className="editorial-cmd__search-icon" />
              <input
                ref={inputRef}
                className="editorial-cmd__input"
                placeholder="Search commands, live simulators, social links..."
                value={query}
                onChange={e => { setQuery(e.target.value); setSelectedIdx(0) }}
                onKeyDown={handleKeyDown}
              />
              <kbd className="editorial-cmd__kbd-esc" onClick={onClose}>ESC</kbd>
            </div>

            {/* Command Results List */}
            <div className="editorial-cmd__list">
              {filtered.length === 0 ? (
                <div className="editorial-cmd__empty">
                  No matching commands or actions found for "{query}"
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIdx
                  return (
                    <button
                      key={item.id}
                      className={`editorial-cmd__item ${isSelected ? 'editorial-cmd__item--selected' : ''}`}
                      onClick={() => executeItem(item)}
                      onMouseEnter={() => setSelectedIdx(index)}
                    >
                      <div className="editorial-cmd__item-icon">
                        <item.icon size={15} />
                      </div>
                      <span className="editorial-cmd__item-label">{item.label}</span>
                      {item.badge && (
                        <span className="editorial-tag editorial-cmd__item-badge">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight size={13} className="editorial-cmd__item-arrow" />
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer */}
            <div className="editorial-cmd__footer">
              <div className="editorial-cmd__footer-hint">
                <kbd>↑↓</kbd> <span>Navigate</span>
              </div>
              <div className="editorial-cmd__footer-hint">
                <kbd>↵</kbd> <span>Execute</span>
              </div>
              <div className="editorial-cmd__footer-hint">
                <kbd>ESC</kbd> <span>Close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
