import { Trophy, Brain, Globe, Code2 } from 'lucide-react'
import './Metrics.css'

const METRICS = [
  {
    icon: Trophy,
    value: '3×',
    label: 'Hackathon Podiums',
    sub: 'Vajra · Tinkherhack · Girlathon',
    color: 'amber',
  },
  {
    icon: Brain,
    value: '8.2',
    label: 'CGPA',
    sub: 'B.Tech CSE (Data Science) @ MACE',
    color: 'indigo',
  },
  {
    icon: Globe,
    value: '10+',
    label: 'Languages Supported',
    sub: 'AI diarization & voice identity',
    color: 'cyan',
  },
  {
    icon: Code2,
    value: '5+',
    label: 'Major AI Projects',
    sub: 'Compliance · Identity · Quantum',
    color: 'emerald',
  },
]

export default function Metrics() {
  return (
    <section className="metrics">
      <div className="container">
        <div className="metrics__grid">
          {METRICS.map((m, i) => (
            <div key={i} className={`metrics__card metrics__card--${m.color}`}>
              <div className={`metrics__icon metrics__icon--${m.color}`}>
                <m.icon size={22} />
              </div>
              <div>
                <div className="metrics__value">{m.value}</div>
                <div className="metrics__label">{m.label}</div>
                <div className="metrics__sub">{m.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

