import { useState } from 'react'
import VIGILANTDemo from './VIGILANTDemo'
import SKILLSYNCDemo from './SKILLSYNCDemo'
import BB84Demo from './BB84Demo'
import { Shield, Mic, Atom, Sparkles, Terminal, ArrowUpRight } from 'lucide-react'
import './SandboxStudio.css'

const SANDBOX_TABS = [
  {
    id: 'vigilant',
    label: 'VIGILANT Auditor',
    tag: 'RAG Compliance AI',
    icon: Shield,
    badge: 'Vajra Top 4',
    badgeType: 'cyan',
    desc: 'Simulate a live debt recovery call, stream diarized transcript, and watch real-time ChromaDB RAG verification map violations to RBI circulars with zero hallucination.',
    component: VIGILANTDemo,
  },
  {
    id: 'skillsync',
    label: 'SKILLSYNC Engine',
    tag: 'Voice & Trust Score',
    icon: Mic,
    badge: 'Tinkherhack 1st',
    badgeType: 'amber',
    desc: 'Test the multilingual voice-first agent dialer across 6 Indian languages and adjust dynamic parameters to calculate portable worker Trust Scores.',
    component: SKILLSYNCDemo,
  },
  {
    id: 'bb84',
    label: 'BB84 Quantum QKD',
    tag: 'Quantum Cryptography',
    icon: Atom,
    badge: 'Eve Intercept Test',
    badgeType: 'emerald',
    desc: 'Simulate single-photon quantum key exchange. Toggle Eve (Eavesdropper) to observe real-time Quantum Bit Error Rate (QBER) spikes that abort compromised keys.',
    component: BB84Demo,
  },
]

export default function SandboxStudio({ activeTab, onTabChange }) {
  const [internalTab, setInternalTab] = useState('vigilant')
  const currentTab = activeTab || internalTab
  const setTab = onTabChange || setInternalTab

  const activeSandbox = SANDBOX_TABS.find(t => t.id === currentTab) || SANDBOX_TABS[0]
  const ActiveComponent = activeSandbox.component

  return (
    <section id="sandbox" className="editorial-sandbox">
      <div className="container">
        {/* Header */}
        <div className="editorial-sandbox__header">
          <div>
            <div className="section-meta-tag">[03 // INTERACTIVE LAB & SIMULATOR]</div>
            <h2 className="section-title-large">Interactive Sandbox Studio</h2>
          </div>
          <p className="section-lead">
            Hands-on sandboxes demonstrating core engineering algorithms: RAG clause verification, multilingual voice agents, and quantum photon sifting.
          </p>
        </div>

        {/* Studio Shell */}
        <div className="editorial-sandbox__shell">
          {/* Studio Navigation Tabs */}
          <div className="editorial-sandbox__tabs">
            {SANDBOX_TABS.map(tab => (
              <button
                key={tab.id}
                className={`editorial-sandbox__tab ${currentTab === tab.id ? 'editorial-sandbox__tab--active' : ''}`}
                onClick={() => setTab(tab.id)}
              >
                <div className="editorial-sandbox__tab-icon-wrap">
                  <tab.icon size={16} />
                </div>
                <div className="editorial-sandbox__tab-text">
                  <span className="editorial-sandbox__tab-title">{tab.label}</span>
                  <span className="editorial-sandbox__tab-tag">{tab.tag}</span>
                </div>
                {tab.badge && (
                  <span className={`editorial-tag editorial-tag--${tab.badgeType} editorial-sandbox__tab-badge`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Active Sandbox Context Header */}
          <div className="editorial-sandbox__context-bar">
            <div className="editorial-sandbox__context-info">
              <span className="live-status-dot" />
              <span className="editorial-sandbox__context-label">
                ACTIVE LAB: <strong style={{ color: '#FFFFFF' }}>{activeSandbox.label}</strong>
              </span>
              <span className="editorial-sandbox__context-desc">{activeSandbox.desc}</span>
            </div>
            <div className="editorial-sandbox__context-actions">
              <span className="editorial-tag editorial-tag--accent">
                <Terminal size={11} style={{ marginRight: 4 }} />
                Client-Side Sandbox
              </span>
            </div>
          </div>

          {/* Simulation Viewport */}
          <div className="editorial-sandbox__viewport">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </section>
  )
}

