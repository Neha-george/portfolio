import { Trophy, Award, Medal, Star, ArrowUpRight } from 'lucide-react'
import './Achievements.css'

const HONORS = [
  {
    year: '2026',
    date: 'FEB 2026',
    award: 'Winner (1st Place)',
    awardType: 'amber',
    event: 'Tinkherhack 2026',
    org: 'TinkerHub Foundation',
    project: 'SKILLSYNC',
    icon: Trophy,
    highlight: 'All-India Women in Tech Hackathon',
    desc: 'Awarded 1st place among top teams nationwide for SKILLSYNC — building a multilingual voice-first digital identity platform with dynamic Trust Scoring for informal workers.',
  },
  {
    year: '2026',
    date: 'FEB 2026',
    award: 'Top 4 Finalist',
    awardType: 'cyan',
    event: 'Vajra Hackathon 2026',
    org: 'IEEE Computer Society Kerala Chapter',
    project: 'VIGILANT',
    icon: Medal,
    highlight: 'Flagship IEEE Technical Hackathon',
    desc: 'Secured Top 4 national ranking with VIGILANT — engineering a zero-hallucination real-time compliance call auditor for debt collections mapping to RBI circulars via ChromaDB.',
  },
  {
    year: '2025',
    date: 'AUG 2025',
    award: 'Best Innovation Award',
    awardType: 'emerald',
    event: 'Girlathon 2025',
    org: 'IEEE Women in Engineering (WIE)',
    project: 'SKILLSYNC Prototype',
    icon: Award,
    highlight: 'Social Impact & Inclusive Tech',
    desc: 'Honored for the most impactful innovation bridging the digital divide for 450M+ informal Indian workers through voice interaction and tamper-proof verification.',
  },
  {
    year: '2024-PRES',
    date: 'ACTIVE',
    award: 'Joint Secretary',
    awardType: 'indigo',
    event: 'IEEE Vehicular Technology Society',
    org: 'MACE Student Branch Chapter',
    project: 'Leadership & Technical Community',
    icon: Star,
    highlight: 'Executive Leadership Role',
    desc: 'Leading chapter operations, organizing national technical symposia, and conducting peer-led developer workshops on connected vehicle protocols and AI.',
  },
  {
    year: '2023-PRES',
    date: 'ACTIVE',
    award: 'Web & Design Lead',
    awardType: 'indigo',
    event: 'MACE IoT Club',
    org: 'Mar Athanasius College of Engineering',
    project: 'Creative & Technical Direction',
    icon: Star,
    highlight: 'Design & Frontend Governance',
    desc: 'Directing visual identity and building responsive landing pages for premier hackathons and IoT project exhibitions with 1,000+ attendees.',
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="editorial-honors">
      <div className="container">
        {/* Header */}
        <div className="editorial-honors__header">
          <div>
            <div className="section-meta-tag">[05 // HONORS & RECOGNITION]</div>
            <h2 className="section-title-large">Trophy Case & Leadership</h2>
          </div>
          <p className="section-lead">
            Recognized across all-India hackathons and IEEE leadership initiatives for engineering innovative, reliable, and socially impactful software.
          </p>
        </div>

        {/* Honors Ledger List */}
        <div className="editorial-honors__ledger">
          {HONORS.map((item, idx) => (
            <div key={idx} className="editorial-honors__row">
              {/* Year & Date */}
              <div className="editorial-honors__col-date">
                <span className="editorial-honors__year">{item.year}</span>
                <span className="editorial-honors__subdate">{item.date}</span>
              </div>

              {/* Award & Title */}
              <div className="editorial-honors__col-title">
                <div className="editorial-honors__award-badge-row">
                  <span className={`editorial-tag editorial-tag--${item.awardType}`}>
                    ✦ {item.award}
                  </span>
                  <span className="editorial-honors__project-tag">PROJECT: {item.project}</span>
                </div>
                <h3 className="editorial-honors__event-name">{item.event}</h3>
                <span className="editorial-honors__org-name">{item.org} · {item.highlight}</span>
              </div>

              {/* Description */}
              <div className="editorial-honors__col-desc">
                <p className="editorial-honors__desc-text">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
