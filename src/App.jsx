import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import SandboxStudio from './components/SandboxStudio'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import About from './components/About'
import Contact from './components/Contact'
import CommandPalette from './components/CommandPalette'
import ParticleCanvas from './components/ParticleCanvas'

function App() {
  const [cmdOpen, setCmdOpen] = useState(false)
  const [sandboxTab, setSandboxTab] = useState('vigilant')

  // Global Ctrl+K / Cmd+K keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setCmdOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <div className="grid-overlay" />
      <ParticleCanvas />
      
      {/* Floating Minimalist Navigation */}
      <Navbar onOpenCmd={() => setCmdOpen(true)} />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onSelectTab={(tabId) => setSandboxTab(tabId)}
      />

      <main>
        {/* Hero Section */}
        <Hero onOpenCmd={() => setCmdOpen(true)} />

        {/* 01. Selected Works */}
        <Projects onSelectSandboxTab={(tabId) => setSandboxTab(tabId)} />

        {/* 02. Interactive Sandbox Studio (Live Simulators) */}
        <SandboxStudio
          activeTab={sandboxTab}
          onTabChange={(tabId) => setSandboxTab(tabId)}
        />

        {/* 03. Capabilities & Disciplines */}
        <Skills />

        {/* 04. Honors & Trophy Case */}
        <Achievements />

        {/* 05. About, Rigor & Roots */}
        <About />

        {/* 06. Direct Contact Dock & Colophon */}
        <Contact />
      </main>
    </>
  )
}

export default App
