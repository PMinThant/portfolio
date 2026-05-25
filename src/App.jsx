import { useState, useEffect } from 'react'

// ── Data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  { category: 'Data & SQL', items: ['SQL', 'Metabase', 'Google Sheets', 'KNIME'] },
  { category: 'Visualisation', items: ['Tableau', 'PowerBI', 'Looker Studio', 'Excel'] },
  { category: 'Python', items: ['NumPy', 'Pandas', 'Matplotlib'] },
  { category: 'Engineering', items: ['PLC', 'Arduino', 'Raspberry Pi', 'AGV / Robotics'] },
]

const EXPERIENCE = [
  {
    role: 'Trust and Safety Associate',
    company: 'Accenture — Malaysia',
    period: 'Jun 2024 – Present',
    bullets: [
      'Review, classify and remove content per client guidelines using specialised tools.',
      'Stay current on evolving client policies and platform guidelines.',
      'Investigate and escalate complex content issues to the broader T&S team.',
    ],
    tags: ['Content Moderation', 'Policy', 'Investigation'],
  },
  {
    role: 'Software Engineer',
    company: 'ATS & P Engineering Co., Ltd — Thailand',
    period: 'Jun 2023 – May 2024',
    bullets: [
      'Implemented software for Automated Guided Vehicles and Autonomous Mobile Robots.',
      'Verified PLC, Raspberry Pi, and Arduino wiring with assembly teams pre-deployment.',
      'Tuned PID controllers and integrated magnetic field sensors for AGV navigation.',
    ],
    tags: ['AGV', 'Python', 'PLC', 'Arduino', 'Robotics'],
  },
  {
    role: 'Volunteer Executive',
    company: 'Yangon Data Science Community — Myanmar',
    period: 'Dec 2020 – Jun 2023',
    bullets: [
      'Built a service catalogue with GSite & Stripe for recurring community charges.',
      'Boosted bike shop performance by 50% via KPI dashboards in Excel, KNIME, and PowerBI.',
      'Created a Supermarket Dashboard yielding a 25% improvement in strategic decision-making.',
    ],
    tags: ['PowerBI', 'KNIME', 'Excel', 'Dashboards'],
  },
  {
    role: 'Senior Executive, Info Systems',
    company: 'Phee Groups of Companies — Myanmar',
    period: 'Nov 2022 – May 2023',
    bullets: [
      'Maintained 99% data integrity through systematic audits in Excel, Gsheet, and KNIME.',
      'Managed project administration including timelines, documentation, and status reporting.',
      'Facilitated system training and issue resolution across cross-functional teams.',
    ],
    tags: ['Excel', 'KNIME', 'Data Integrity', 'Reporting'],
  },
  {
    role: 'Business Analyst',
    company: 'Ninja Van — Myanmar',
    period: 'Nov 2021 – Nov 2022',
    bullets: [
      'Built and maintained KPI dashboards for all departments via Looker Studio and Gsheet.',
      'Analysed shipping data in Metabase and PowerBI, helping hit 20% monthly growth targets.',
      'Optimised manpower distribution by 70% through reservation behaviour analysis.',
    ],
    tags: ['Looker Studio', 'Metabase', 'PowerBI', 'KPI'],
  },
]

const EDUCATION = [
  {
    degree: 'MSc. Business Analytics & Digital Transformation',
    school: 'Asian Institute of Technology',
    period: '2024 – 2025',
    accent: '#0d9488',
  },
  {
    degree: 'BE, Mechatronic Engineering',
    school: 'Technological University (Hmawbi)',
    period: '2015 – 2023',
    accent: '#94a3b8',
  },
]

const CONTACT = [
  { label: 'Email', value: 'phyominthant840@gmail.com', href: 'mailto:phyominthant840@gmail.com' },
  { label: 'Phone', value: '0111-254-8750', href: 'tel:+601112548750' },
  { label: 'LinkedIn', value: 'View profile', href: 'linkedin.com/in/phyoeminthant' }, // replace # with your LinkedIn URL
]

const NAV_SECTIONS = ['about', 'skills', 'experience', 'education', 'contact']

// ── Styles (inline) ──────────────────────────────────────────────────────────

const s = {
  teal: '#0d9488',
  black: '#0a0a0a',
  gray: '#555',
  lightGray: '#888',
  border: '#e5e5e5',
  bg: '#fafaf9',
  bgAlt: '#f5f5f4',
}

// ── Sub-components ───────────────────────────────────────────────────────────

function Tag({ children, teal }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      padding: '3px 10px',
      borderRadius: 4,
      border: teal ? '1px solid #99f6e4' : `1px solid ${s.border}`,
      background: teal ? '#f0fdfa' : s.bgAlt,
      color: teal ? s.teal : '#444',
    }}>
      {children}
    </span>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      color: s.teal,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      marginBottom: 12,
    }}>
      {children}
    </p>
  )
}

function SectionHeading({ children }) {
  return (
    <h2 className="fd" style={{ fontSize: '1.9rem', fontWeight: 400, color: s.black, lineHeight: 1.2, marginBottom: 0 }}>
      {children}
    </h2>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const all = ['hero', ...NAV_SECTIONS]
      for (const id of all) {
        const el = document.getElementById(id)
        if (el) {
          const { top, bottom } = el.getBoundingClientRect()
          if (top <= 80 && bottom > 80) { setActiveSection(id); break }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div>
      {/* ── Nav ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(250,250,249,0.96)',
        borderBottom: `1px solid ${s.border}`,
        padding: '0 2rem', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span className="fm" style={{ fontSize: 13, fontWeight: 500, color: s.teal }}>phyo.dev</span>
        <div style={{ display: 'flex', gap: '1.4rem' }}>
          {NAV_SECTIONS.map((sec) => (
            <button
              key={sec}
              onClick={() => scrollTo(sec)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 13, fontFamily: "'Inter', sans-serif",
                color: activeSection === sec ? s.teal : s.lightGray,
                fontWeight: activeSection === sec ? 500 : 400,
                textTransform: 'capitalize', transition: 'color .2s',
              }}
            >
              {sec}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="hero" style={{ minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '0 2rem', maxWidth: 1100, margin: '0 auto' }}>
        <div>
          <p className="fm" style={{ fontSize: 11, color: s.teal, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            // data scientist & analyst
          </p>
          <h1 className="fd" style={{ fontSize: 'clamp(2.8rem, 9vw, 5.2rem)', fontWeight: 400, lineHeight: 1.05, color: s.black, marginBottom: 24 }}>
            Phyo Min Thant
          </h1>
          <p style={{ fontSize: '1.05rem', color: s.gray, maxWidth: 540, lineHeight: 1.85, marginBottom: 36 }}>
            Bridging data, engineering, and business strategy to drive measurable impact.
            MSc. Business Analytics graduate with hands-on experience across Myanmar, Thailand, and Malaysia.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => scrollTo('experience')}
              style={{ padding: '12px 28px', background: s.black, color: s.bg, border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
            >
              My Experience
            </button>
            <button
              onClick={() => scrollTo('contact')}
              style={{ padding: '12px 28px', background: 'transparent', color: s.black, border: `1.5px solid ${s.black}`, borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: '4.5rem 2rem', borderTop: `1px solid ${s.border}`, maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel>01 / About</SectionLabel>
        <SectionHeading>A bit about me</SectionHeading>
        <div style={{ marginTop: 24 }}>
          <p style={{ fontSize: 15, color: s.gray, lineHeight: 1.85, maxWidth: 640, marginBottom: 16 }}>
            I'm a data scientist and analyst with a multidisciplinary background spanning mechatronic engineering,
            robotics software, and business intelligence. I've built KPI dashboards from scratch, analysed shipping
            data to hit growth targets, and even programmed autonomous robots.
          </p>
          <p style={{ fontSize: 15, color: s.gray, lineHeight: 1.85, maxWidth: 640 }}>
            Currently based in Kuala Lumpur, I work at Accenture's Trust & Safety team while applying my MSc.
            in Business Analytics & Digital Transformation from the Asian Institute of Technology. I'm passionate
            about turning messy data into clear decisions.
          </p>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" style={{ padding: '4.5rem 2rem', background: s.bgAlt, borderTop: `1px solid ${s.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel>02 / Skills</SectionLabel>
          <SectionHeading>Tech &amp; tools</SectionHeading>
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 18 }}>
            {SKILLS.map(({ category, items }) => (
              <div key={category} style={{ background: '#fff', border: `1px solid ${s.border}`, borderRadius: 12, padding: '1.25rem' }}>
                <p className="fm" style={{ fontSize: 11, color: s.teal, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 14 }}>{category}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {items.map((item) => <Tag key={item}>{item}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" style={{ padding: '4.5rem 2rem', borderTop: `1px solid ${s.border}`, maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel>03 / Experience</SectionLabel>
        <SectionHeading>Work history</SectionHeading>
        <div style={{ marginTop: 40 }}>
          {EXPERIENCE.map(({ role, company, period, bullets, tags }) => (
            <div key={role} style={{ display: 'grid', gridTemplateColumns: '3px 1fr', gap: '0 1.25rem', marginBottom: '2.5rem' }}>
              <div style={{ background: s.teal, borderRadius: 2 }} />
              <div>
                <p className="fm" style={{ fontSize: 11, color: '#aaa', marginBottom: 6 }}>{period}</p>
                <p className="fd" style={{ fontSize: '1.15rem', fontWeight: 400, color: s.black, marginBottom: 2 }}>{role}</p>
                <p style={{ fontSize: 13, color: s.lightGray, marginBottom: 14 }}>{company}</p>
                <ul style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                  {bullets.map((b) => (
                    <li key={b} style={{ fontSize: 13, color: s.gray, lineHeight: 1.75 }}>{b}</li>
                  ))}
                </ul>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {tags.map((t) => <Tag key={t} teal>{t}</Tag>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" style={{ padding: '4.5rem 2rem', background: s.bgAlt, borderTop: `1px solid ${s.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel>04 / Education</SectionLabel>
          <SectionHeading>Academic background</SectionHeading>
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {EDUCATION.map(({ degree, school, period, accent }) => (
              <div key={degree} style={{
                background: '#fff',
                border: `1px solid ${s.border}`,
                borderLeft: `3px solid ${accent}`,
                borderRadius: '0 12px 12px 0',
                padding: '1.25rem',
              }}>
                <p className="fm" style={{ fontSize: 11, color: accent, marginBottom: 8 }}>{period}</p>
                <p className="fd" style={{ fontSize: '1.05rem', fontWeight: 400, color: s.black, marginBottom: 4 }}>{degree}</p>
                <p style={{ fontSize: 13, color: s.lightGray }}>{school}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ padding: '5rem 2rem', background: s.black, color: s.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel>05 / Contact</SectionLabel>
          <h2 className="fd" style={{ fontSize: '1.9rem', fontWeight: 400, lineHeight: 1.2, marginBottom: 14 }}>Let's connect</h2>
          <p style={{ fontSize: 14, color: '#888', lineHeight: 1.8, marginBottom: 36, maxWidth: 460 }}>
            Open to data science, analytics, and BI roles. I read every message.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 460 }}>
            {CONTACT.map(({ label, value, href }) => (
              <a key={label} href={href} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '.9rem 1.1rem',
                border: '1px solid #2d2d2d',
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'border-color .2s, background .2s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.teal; e.currentTarget.style.background = '#111' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2d2d2d'; e.currentTarget.style.background = 'transparent' }}
              >
                <span className="fm" style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: '.1em' }}>{label}</span>
                <span style={{ fontSize: 13, color: '#aaa' }}>{value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: s.black, borderTop: '1px solid #1a1a1a', padding: '1.25rem 2rem', textAlign: 'center' }}>
        <p className="fm" style={{ fontSize: 11, color: '#444' }}>© 2026 Phyo Min Thant — Kuala Lumpur, MY</p>
      </footer>
    </div>
  )
}
