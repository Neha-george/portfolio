import { GraduationCap, Users, Cpu, Heart } from 'lucide-react'
import './Leadership.css'

const TIMELINE = [
  {
    icon: GraduationCap,
    title: 'B.Tech CSE (Data Science)',
    org: 'Mar Athanasius College of Engineering',
    date: '2022 – 2026',
    detail: 'CGPA: 8.2 · Specialization in Data Science, AI/ML, and Algorithms. Final-year project: VIGILANT — AI Compliance Auditor.',
    color: 'indigo',
    type: 'Education',
  },
  {
    icon: Users,
    title: 'Joint Secretary',
    org: 'IEEE Vehicular Technology Society (VTS) — MACE Chapter',
    date: '2024 – Present',
    detail: 'Organizing technical events, workshops, and seminars on vehicle technology and connected AI systems. Coordinating cross-chapter collaborations.',
    color: 'cyan',
    type: 'Leadership',
  },
  {
    icon: Cpu,
    title: 'Web & Design Lead',
    org: 'MACE IoT Club',
    date: '2023 – Present',
    detail: 'Leading UI/UX design, web development, and digital presence for the IoT club. Built and maintained event landing pages and team portfolios.',
    color: 'emerald',
    type: 'Leadership',
  },
  {
    icon: Heart,
    title: 'NSS Volunteer',
    org: 'National Service Scheme — MACE Unit',
    date: '2022 – Present',
    detail: 'Community service initiatives including digital literacy workshops for rural schools and environmental awareness campaigns.',
    color: 'amber',
    type: 'Community',
  },
]

export default function Leadership() {
  return (
    <section id="leadership" className="leadership">
      <div className="container">
        <div className="leadership__header">
          <span className="section-label"><span>✦</span> Education & Leadership</span>
          <h2 className="section-title">Building & Serving Communities</h2>
          <p className="section-subtitle">
            Academic excellence paired with hands-on leadership in IEEE, IoT, and social initiatives.
          </p>
        </div>

        <div className="leadership__timeline">
          {TIMELINE.map((item, i) => (
            <div key={i} className={`leadership__item leadership__item--${item.color}`}>
              <div className="leadership__item-left">
                <div className={`leadership__dot leadership__dot--${item.color}`}>
                  <item.icon size={16} />
                </div>
                {i < TIMELINE.length - 1 && <div className="leadership__line" />}
              </div>
              <div className="leadership__content">
                <div className="leadership__meta">
                  <span className={`badge badge-${item.color === 'indigo' ? 'indigo' : item.color === 'cyan' ? 'cyan' : item.color === 'emerald' ? 'emerald' : 'amber'}`}>{item.type}</span>
                  <span className="leadership__date">{item.date}</span>
                </div>
                <h3 className="leadership__title">{item.title}</h3>
                <div className="leadership__org">{item.org}</div>
                <p className="leadership__detail">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

