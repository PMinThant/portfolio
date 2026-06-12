import { useState, useEffect } from 'react'

// ── Data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  { category: 'Data & SQL', items: ['SQL', 'Metabase', 'Google Sheets', 'KNIME'] },
  { category: 'Visualisation', items: ['Tableau', 'PowerBI', 'Looker Studio', 'Excel'] },
  { category: 'Python', items: ['NumPy', 'Pandas', 'Matplotlib'] },
  { category: 'Engineering', items: ['PLC', 'Arduino', 'Raspberry Pi', 'AGV / Robotics'] },
]

const PROJECTS = [
  {
    name: 'Roles in Analytics',
    desc: 'Interactive viz mapping the analytics career landscape — comparing responsibilities, skills, and paths across analyst, scientist, and engineer roles. Over 6,900 views on Tableau Public.',
    tags: ['Tableau', 'Career Analytics', 'Data Storytelling'],
    link: 'https://public.tableau.com/app/profile/phyo.min.thant/viz/RolesinAnalytics_17656971884390/RolesinAnalytics',
    embed: 'https://public.tableau.com/views/RolesinAnalytics_17656971884390/RolesinAnalytics?:embed=y&:showVizHome=no&:toolbar=no',
    type: 'tableau',
  },
  {
    name: 'Maven Roasters Dashboard',
    desc: 'Advanced Tableau dashboard analysing coffee chain sales performance using LOD expressions, calculated fields, and dynamic filters to surface revenue trends and top products.',
    tags: ['Tableau', 'Advanced Analytics', 'LOD Expressions'],
    link: 'https://public.tableau.com/app/profile/phyo.min.thant/viz/MavenRoastersDashboard-TableauAdvancedPractice/MavenRoasters',
    embed: 'https://public.tableau.com/views/MavenRoastersDashboard-TableauAdvancedPractice/MavenRoasters?:embed=y&:showVizHome=no&:toolbar=no',
    type: 'tableau',
  },
  {
    name: 'Washington State Dept of Energy',
    desc: 'Geospatial dashboard tracking BEV and PHEV adoption across Washington State, visualising regional EV distribution and growth trends to support energy infrastructure planning.',
    tags: ['Tableau', 'Geospatial', 'Energy', 'EV Analytics'],
    link: 'https://public.tableau.com/app/profile/phyo.min.thant/viz/WashingtonStateDepartmentofEnergy_17340429458390/WashingtonBEVsPHEVS',
    embed: 'https://public.tableau.com/views/WashingtonStateDepartmentofEnergy_17340429458390/WashingtonBEVsPHEVS?:embed=y&:showVizHome=no&:toolbar=no',
    type: 'tableau',
  },
  {
    name: 'Global CO₂ Emission',
    desc: 'World-level analysis of CO₂ emission trends across countries and industries, combining time-series and geographic views to highlight biggest emitters and per-capita comparisons.',
    tags: ['Tableau', 'Environmental Analytics', 'Time Series'],
    link: 'https://public.tableau.com/app/profile/phyo.min.thant/viz/GlobalCO2Emission_17632518166410/GlobalCO2Emission',
    embed: 'https://public.tableau.com/views/GlobalCO2Emission_17632518166410/GlobalCO2Emission?:embed=y&:showVizHome=no&:toolbar=no',
    type: 'tableau',
  },
  {
    name: 'Vroom — Rides without the wait',
    desc: 'A global ride-hailing web app prototype built for travelers and locals. No local phone number required — just email and a name. Supports both rider and driver modes from a single account, designed to work across borders.',
    tags: ['React', 'Lovable', 'UI/UX', 'Prototype', 'Full-Stack'],
    link: 'https://global-ride-now.lovable.app',
    type: 'webapp',
    emoji: '🚗',
  },
  {
    name: 'Apex — Personal Finance',
    desc: 'A personal finance web app to track income and expenses, set savings goals, and visualise monthly progress — all in a clean, focused dashboard. Built as a full prototype with authentication.',
    tags: ['React', 'Lovable', 'Finance', 'Dashboard', 'Prototype'],
    link: 'https://my-coin-buddy-75.lovable.app',
    type: 'webapp',
    emoji: '💰',
  },
  {
    name: 'Sleep & Health Lifestyle Analysis',
    desc: 'Explores a health and lifestyle dataset to uncover patterns in sleep quality. Identifies key trends, outliers, and relationships between sleep duration, physical activity, stress levels, and overall health indicators.',
    tags: ['Google Sheets', 'Google Slides', 'Descriptive Statistics'],
    link: 'https://github.com/PMinThant/statistics/tree/main/01-health-sleep-descriptive-stats',
    type: 'github',
    emoji: '🔬',
  },
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
  },
  {
    degree: 'BE, Mechatronic Engineering',
    school: 'Technological University (Hmawbi)',
    period: '2015 – 2023',
  },
]

const NAV_SECTIONS = ['about', 'skills', 'featured', 'projects', 'experience', 'education', 'contact']

// ── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
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
  const tableauProjects = PROJECTS.filter(p => p.type === 'tableau')
  const otherProjects = PROJECTS.filter(p => p.type !== 'tableau')

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif", background: '#fff', color: '#1d1d1f' }}>

      {/* ── Nav ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.72)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
        transition: 'all 0.3s',
        padding: '0 2rem', height: 52,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.02em' }}>
          Phyo Min Thant
        </span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {NAV_SECTIONS.map(sec => (
            <button key={sec} onClick={() => scrollTo(sec)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13, fontFamily: 'inherit',
              color: activeSection === sec ? '#0071e3' : '#6e6e73',
              fontWeight: activeSection === sec ? 500 : 400,
              textTransform: 'capitalize', transition: 'color .2s', padding: 0,
            }}>
              {sec}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="hero" style={{
        minHeight: '92vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '4rem 2rem',
        background: 'linear-gradient(180deg, #fbfbfd 0%, #ffffff 100%)',
      }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: '#6e6e73', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 20 }}>
          Data Scientist &amp; Analyst
        </p>
        <h1 style={{
          fontSize: 'clamp(3rem, 9vw, 6.5rem)', fontWeight: 700,
          letterSpacing: '-0.04em', lineHeight: 1.05,
          color: '#1d1d1f', marginBottom: 28, maxWidth: 900,
        }}>
          Turning data into decisions.
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#6e6e73', maxWidth: 560, lineHeight: 1.75, marginBottom: 48 }}>
          MSc. Business Analytics graduate with hands-on experience in dashboards, robotics, and business intelligence across Malaysia, Thailand, and Myanmar.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => scrollTo('projects')} style={{
            padding: '14px 30px', background: '#0071e3', color: '#fff',
            border: 'none', borderRadius: 980, fontSize: 15, fontWeight: 500,
            cursor: 'pointer', fontFamily: 'inherit', transition: 'background .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#0077ed'}
            onMouseLeave={e => e.currentTarget.style.background = '#0071e3'}
          >
            View Projects
          </button>
          <button onClick={() => scrollTo('contact')} style={{
            padding: '14px 30px', background: 'rgba(0,0,0,0.06)', color: '#1d1d1f',
            border: 'none', borderRadius: 980, fontSize: 15, fontWeight: 500,
            cursor: 'pointer', fontFamily: 'inherit', transition: 'background .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
          >
            Get in Touch
          </button>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: '6rem 2rem', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#6e6e73', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>About</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1d1d1f', lineHeight: 1.2, marginBottom: 28 }}>
            Engineer at heart.<br />Analyst by practice.
          </h2>
          <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.8, marginBottom: 18 }}>
            I'm a data scientist with a multidisciplinary background spanning mechatronic engineering, robotics software, and business intelligence. From programming autonomous robots in Thailand to building KPI dashboards for Ninja Van in Myanmar, I bring both technical depth and business context to every problem.
          </p>
          <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.8 }}>
            Currently based in Kuala Lumpur working at Accenture, and recently completed an MSc. in Business Analytics & Digital Transformation at the Asian Institute of Technology.
          </p>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#6e6e73', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Skills</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1d1d1f' }}>Tech &amp; tools</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {SKILLS.map(({ category, items }) => (
              <div key={category} style={{
                background: '#f5f5f7', borderRadius: 20, padding: '1.75rem',
              }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#6e6e73', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>{category}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {items.map(item => (
                    <span key={item} style={{
                      fontSize: 13, fontWeight: 500, padding: '6px 14px',
                      borderRadius: 980, background: '#fff',
                      color: '#1d1d1f', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured ── */}
      <section id="featured" style={{ padding: '6rem 2rem', background: '#000' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#6e6e73', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Featured</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f5f5f7' }}>In action</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'center' }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', background: '#1c1c1e', aspectRatio: '16/9' }}>
              <iframe
                width="100%" height="100%"
                src="https://www.youtube.com/embed/DIdE7EMJeUc"
                title="AMR Cycle Test"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none', display: 'block' }}
              />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#6e6e73', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Robotics</p>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f5f5f7', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 16 }}>
                Autonomous Mobile Robot — Cycle Test
              </h3>
              <p style={{ fontSize: 15, color: '#98989d', lineHeight: 1.8, marginBottom: 24 }}>
                Test recording of an AMR completing two full movement cycles. Captured at ATS & P Engineering to review motor response, PID control behaviour, and navigation accuracy before deployment.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                {['AMR', 'Robotics', 'PID Control', 'Python', 'Embedded Systems'].map(t => (
                  <span key={t} style={{ fontSize: 12, fontWeight: 500, padding: '5px 12px', borderRadius: 980, background: '#2c2c2e', color: '#98989d' }}>{t}</span>
                ))}
              </div>
              <a href="https://youtu.be/DIdE7EMJeUc" target="_blank" rel="noreferrer"
                style={{ fontSize: 15, color: '#0071e3', textDecoration: 'none', fontWeight: 500 }}>
                Watch on YouTube ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" style={{ padding: '6rem 2rem', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#6e6e73', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Projects</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1d1d1f' }}>Selected work</h2>
          </div>

          {/* Tableau Dashboards - 2 Column Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28, marginBottom: 52 }}>
            {tableauProjects.map(({ name, desc, tags, link, embed }) => (
              <div key={name} style={{
                background: '#fff', borderRadius: 20,
                overflow: 'hidden', boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.3s, transform 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {/* Dashboard Embed */}
                <div style={{ background: '#f5f5f7', borderBottom: '1px solid #e5e5ea' }}>
                  <iframe
                    src={embed}
                    width="100%"
                    height="480"
                    style={{ border: 'none', display: 'block' }}
                    title={name}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1d1d1f', lineHeight: 1.3 }}>{name}</h3>
                    <a
                      href={link} target="_blank" rel="noreferrer"
                      style={{
                        fontSize: 12, color: '#0071e3', textDecoration: 'none',
                        fontWeight: 500, whiteSpace: 'nowrap', marginLeft: 12, flexShrink: 0,
                      }}
                    >
                      Open ↗
                    </a>
                  </div>
                  <p style={{ fontSize: 13, color: '#6e6e73', lineHeight: 1.7, marginBottom: 14 }}>{desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {tags.map(t => (
                      <span key={t} style={{
                        fontSize: 11, fontWeight: 500,
                        padding: '4px 10px', borderRadius: 980,
                        background: '#f5f5f7', color: '#1d1d1f',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects */}
          {otherProjects.map(({ name, desc, tags, link, emoji, type }) => (
            <div key={name} style={{
              background: '#fff', borderRadius: 20, padding: '2rem',
              boxShadow: '0 2px 20px rgba(0,0,0,0.06)', marginBottom: 20,
              display: 'grid', gridTemplateColumns: '160px 1fr', gap: '2rem', alignItems: 'start',
              transition: 'box-shadow 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{
                height: 160, borderRadius: 16,
                background: type === 'webapp'
                  ? 'linear-gradient(135deg, #0071e3 0%, #34aadc 100%)'
                  : 'linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56,
              }}>
                {emoji}
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1d1d1f' }}>{name}</h3>
                  <a href={link} target="_blank" rel="noreferrer"
                    style={{ fontSize: 12, color: '#0071e3', textDecoration: 'none', fontWeight: 500 }}>
                    {type === 'webapp' ? 'Live App ↗' : 'View ↗'}
                  </a>
                </div>
                <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.75, marginBottom: 16 }}>{desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {tags.map(t => (
                    <span key={t} style={{
                      fontSize: 11, fontWeight: 500, padding: '4px 10px',
                      borderRadius: 980, background: '#f5f5f7', color: '#1d1d1f',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#6e6e73', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Experience</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1d1d1f' }}>Work history</h2>
          </div>
          {EXPERIENCE.map(({ role, company, period, bullets, tags }) => (
            <div key={role} style={{
              display: 'grid', gridTemplateColumns: '2px 1fr', gap: '0 1.5rem', marginBottom: '2.5rem',
            }}>
              <div style={{ background: '#e5e5ea', borderRadius: 2 }} />
              <div>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#6e6e73', marginBottom: 6, letterSpacing: '0.02em' }}>{period}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1d1d1f', marginBottom: 2 }}>{role}</p>
                <p style={{ fontSize: 14, color: '#6e6e73', marginBottom: 14 }}>{company}</p>
                <ul style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                  {bullets.map(b => (
                    <li key={b} style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.7 }}>{b}</li>
                  ))}
                </ul>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {tags.map(t => (
                    <span key={t} style={{
                      fontSize: 11, fontWeight: 500, padding: '4px 10px',
                      borderRadius: 980, background: '#f5f5f7', color: '#1d1d1f',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" style={{ padding: '6rem 2rem', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#6e6e73', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Education</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1d1d1f' }}>Academic background</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {EDUCATION.map(({ degree, school, period }) => (
              <div key={degree} style={{ background: '#fff', borderRadius: 20, padding: '2rem', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0071e3', marginBottom: 12 }}>{period}</p>
                <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1d1d1f', lineHeight: 1.4, marginBottom: 6 }}>{degree}</p>
                <p style={{ fontSize: 14, color: '#6e6e73' }}>{school}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ padding: '8rem 2rem', background: '#000', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#6e6e73', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Contact</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f5f5f7', lineHeight: 1.15, marginBottom: 20 }}>
            Let's build something together.
          </h2>
          <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.75, marginBottom: 48 }}>
            Open to data science, analytics, and BI roles. I read every message.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Email', value: 'phyominthant840@gmail.com', href: 'mailto:phyominthant840@gmail.com' },
              { label: 'LinkedIn', value: 'linkedin.com/in/phyoeminthant', href: 'https://www.linkedin.com/in/phyoeminthant/' },
              { label: 'Phone', value: '0111-254-8750', href: 'tel:+601112548750' },
            ].map(({ label, value, href }) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '1.1rem 1.5rem', background: '#1c1c1e', borderRadius: 14,
                  textDecoration: 'none', transition: 'background .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#2c2c2e'}
                onMouseLeave={e => e.currentTarget.style.background = '#1c1c1e'}
              >
                <span style={{ fontSize: 12, fontWeight: 600, color: '#6e6e73', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
                <span style={{ fontSize: 14, color: '#f5f5f7' }}>{value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#000', borderTop: '1px solid #1c1c1e', padding: '1.5rem 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#3a3a3c', fontWeight: 500 }}>© 2026 Phyo Min Thant — Kuala Lumpur, MY</p>
      </footer>
    </div>
  )
}
