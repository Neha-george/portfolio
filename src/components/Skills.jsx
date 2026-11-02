import { useState } from 'react'
import { Cpu, Terminal, Atom, Layout, Database, CheckCircle2 } from 'lucide-react'
import './Skills.css'

const DISCIPLINES = [
  {
    index: '01',
    id: 'ai',
    title: 'Applied AI & RAG Systems',
    icon: Cpu,
    lead: 'Architecting grounded, low-latency, and zero-hallucination agentic systems for enterprise workflows and voice interfaces.',
    skills: [
      { name: 'Google Gemini 1.5/2.0 Flash', level: 'Production', detail: 'Multimodal reasoning, audio token processing & function calling' },
      { name: 'RAG Architecture & Diarization', level: 'Advanced', detail: 'Hybrid dense/sparse retrieval, speaker diarization pipelines' },
      { name: 'ChromaDB Vector Database', level: 'Production', detail: 'Semantic similarity search, metadata filtering, chunking strategies' },
      { name: 'LangChain & Agent Workflows', level: 'Proficient', detail: 'Chains, memory persistence, tool routing & custom agents' },
      { name: 'Multilingual Speech-to-Text', level: 'Advanced', detail: 'Indic language audio transcription, dialect-adaptive parsing' },
      { name: 'Prompt & Guardrail Engineering', level: 'Production', detail: 'Strict output schemas, system constraints & hallucination checks' },
    ],
  },
  {
    index: '02',
    id: 'backend',
    title: 'Distributed Backend & APIs',
    icon: Terminal,
    lead: 'Engineering resilient, type-safe REST & WebSocket microservices with sub-second response times.',
    skills: [
      { name: 'FastAPI & ASGI Frameworks', level: 'Production', detail: 'Async endpoint pipelines, dependency injection, Pydantic schemas' },
      { name: 'Python Engineering', level: 'Advanced', detail: 'Object-oriented patterns, concurrency, performance profiling' },
      { name: 'WebSockets & Streaming', level: 'Proficient', detail: 'Bi-directional audio and text token streams for live audits' },
      { name: 'Flask & RESTful Architecture', level: 'Proficient', detail: 'Microservice endpoints, secure JWT authentication, rate limiting' },
      { name: 'PostgreSQL & Relational DBs', level: 'Proficient', detail: 'Complex queries, indexes, connection pools & ACID transactions' },
    ],
  },
  {
    index: '03',
    id: 'quantum',
    title: 'Quantum Computing & Cryptography',
    icon: Atom,
    lead: 'Simulating quantum mechanical protocols, attack interception dynamics, and cryptographic key distillation.',
    skills: [
      { name: 'BB84 Protocol Implementation', level: 'Advanced', detail: 'Photon polarization encoding, basis alignment & sifting' },
      { name: 'Eve Eavesdrop Intercept Modeling', level: 'Advanced', detail: 'Quantum measurement collapse, error injection analysis' },
      { name: 'QBER Mathematical Analysis', level: 'Advanced', detail: 'Error threshold calculations (>11% attack detection limit)' },
      { name: 'Privacy Amplification & Correction', level: 'Proficient', detail: 'Information reconciliation, parity hashing, shared secret keys' },
      { name: 'NumPy & Scientific Computing', level: 'Production', detail: 'Matrix operations, probability vectors, random state generators' },
    ],
  },
  {
    index: '04',
    id: 'frontend',
    title: 'Frontend & Interface Engineering',
    icon: Layout,
    lead: 'Crafting responsive, high-fidelity web experiences with micro-interactions and dark-mode ergonomics.',
    skills: [
      { name: 'React (Vite / Next.js Patterns)', level: 'Production', detail: 'Hooks, reactive state, virtual DOM optimization, modular UI' },
      { name: 'Modern CSS & Glassmorphism', level: 'Production', detail: 'Custom properties, fluid typography, backdrop filters, keyframes' },
      { name: 'JavaScript (ES6+) & TypeScript', level: 'Proficient', detail: 'Async/await, DOM APIs, typed interfaces, module bundling' },
      { name: 'UI/UX Design Systems', level: 'Advanced', detail: 'Typography hierarchy, accessible contrasts, component libraries' },
    ],
  },
  {
    index: '05',
    id: 'devops',
    title: 'Data Science, Cloud & Tooling',
    icon: Database,
    lead: 'Data modeling, version control workflows, containerization, and cloud deployment pipelines.',
    skills: [
      { name: 'Git & GitHub Workflows', level: 'Advanced', detail: 'Branching strategies, PR reviews, CI/CD actions, repo governance' },
      { name: 'Google Cloud Platform (GCP)', level: 'Proficient', detail: 'Vertex AI, Cloud Run, Cloud Functions & Storage buckets' },
      { name: 'Firebase Suite', level: 'Proficient', detail: 'Firestore, Authentication, Realtime DB, Cloud Messaging' },
      { name: 'Docker & Containerization', level: 'Proficient', detail: 'Multi-stage builds, container isolation, environment parity' },
      { name: 'Statistical Data Analysis', level: 'Advanced', detail: 'Pandas, hypothesis testing, EDA & feature engineering' },
    ],
  },
]

export default function Skills() {
  const [activeTab, setActiveTab] = useState('ai')

  const currentDiscipline = DISCIPLINES.find(d => d.id === activeTab) || DISCIPLINES[0]

  return (
    <section id="skills" className="editorial-skills">
      <div className="container">
        {/* Header */}
        <div className="editorial-skills__header">
          <div>
            <div className="section-meta-tag">[04 // TECHNICAL ARSENAL]</div>
            <h2 className="section-title-large">Capabilities & Disciplines</h2>
          </div>
          <p className="section-lead">
            Full-stack engineering capabilities spanning applied artificial intelligence, low-latency microservices, quantum cryptosystems, and high-performance interfaces.
          </p>
        </div>

        {/* Discipline Navigation Bar */}
        <div className="editorial-skills__tabs">
          {DISCIPLINES.map(d => (
            <button
              key={d.id}
              className={`editorial-skills__tab ${activeTab === d.id ? 'editorial-skills__tab--active' : ''}`}
              onClick={() => setActiveTab(d.id)}
            >
              <span className="editorial-skills__tab-idx">{d.index}</span>
              <span className="editorial-skills__tab-title">{d.title}</span>
            </button>
          ))}
        </div>

        {/* Discipline Content Panel */}
        <div className="editorial-skills__panel editorial-card">
          <div className="editorial-skills__panel-header">
            <div className="editorial-skills__panel-icon-wrap">
              <currentDiscipline.icon size={22} />
            </div>
            <div>
              <div className="editorial-skills__panel-meta">
                <span className="editorial-skills__panel-index">{currentDiscipline.index} // DISCIPLINE</span>
              </div>
              <h3 className="editorial-skills__panel-title">{currentDiscipline.title}</h3>
              <p className="editorial-skills__panel-lead">{currentDiscipline.lead}</p>
            </div>
          </div>

          {/* Skill Grid */}
          <div className="editorial-skills__grid">
            {currentDiscipline.skills.map((skill, i) => (
              <div key={skill.name} className="editorial-skills__card">
                <div className="editorial-skills__card-top">
                  <span className="editorial-skills__card-name">{skill.name}</span>
                  <span className="editorial-tag editorial-tag--accent">{skill.level}</span>
                </div>
                <p className="editorial-skills__card-detail">{skill.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
