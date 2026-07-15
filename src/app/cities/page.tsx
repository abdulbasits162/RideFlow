"use client"
import Link from 'next/link'
import { MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react'

const cities = [
  {
    name: 'Rawalpindi',
    status: 'live' as const,
    label: 'Live Now',
    province: 'Punjab',
    population: '2.1M+',
    coverage: 'Full city coverage',
    zones: ['Saddar', 'Murree Road', 'Chaklala', 'Bahria Town', 'DHA', 'Westridge'],
    highlight: 'Launch city — highest driver density',
  },
  {
    name: 'Islamabad',
    status: 'live' as const,
    label: 'Live Now',
    province: 'Federal Capital',
    population: '1.1M+',
    coverage: 'Full city coverage',
    zones: ['F-6', 'F-7', 'F-8', 'F-10', 'G-9', 'Blue Area', 'E-7', 'I-8'],
    highlight: 'Launch city — airport transfers available',
  },
  {
    name: 'Lahore',
    status: 'soon' as const,
    label: 'Month 7',
    province: 'Punjab',
    population: '13M+',
    coverage: 'Phase 1 — core zones',
    zones: ['Gulberg', 'DHA', 'Model Town', 'Johar Town', 'Bahria Town'],
    highlight: 'Largest expansion — Q3 2026',
  },
  {
    name: 'Faisalabad',
    status: 'soon' as const,
    label: 'Month 9',
    province: 'Punjab',
    population: '3.6M+',
    coverage: 'Phase 1 — core zones',
    zones: ['D Ground', 'Peoples Colony', 'Madina Town', 'Jinnah Colony'],
    highlight: 'Industrial corridor focus',
  },
  {
    name: 'Gujranwala',
    status: 'planned' as const,
    label: 'Year 2',
    province: 'Punjab',
    population: '2.3M+',
    coverage: 'Full rollout planned',
    zones: ['Civil Lines', 'Satellite Town', 'Trust Colony'],
    highlight: 'Year 2 expansion',
  },
  {
    name: 'Multan',
    status: 'planned' as const,
    label: 'Year 2',
    province: 'Punjab',
    population: '1.9M+',
    coverage: 'Full rollout planned',
    zones: ['Gulgasht', 'Shah Rukn-e-Alam', 'New Multan'],
    highlight: 'South Punjab launch',
  },
]

const statusConfig = {
  live: {
    color: '#2B8659',
    bg: 'rgba(43,134,89,0.08)',
    border: 'rgba(43,134,89,0.25)',
    dot: '#2B8659',
    label: 'Live',
  },
  soon: {
    color: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
    border: 'rgba(217,119,6,0.2)',
    dot: '#d97706',
    label: 'Coming Soon',
  },
  planned: {
    color: '#888',
    bg: 'rgba(0,0,0,0.03)',
    border: '#EFEFEF',
    dot: '#ccc',
    label: 'Planned',
  },
}

export default function CitiesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>

      {/* Header */}
      <div style={{
        
        background: '#444',
        padding: '110px 9vw 70px',
      }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#eee',
          textDecoration: 'none',
          fontSize: '1.2rem',
          marginBottom: '2rem',
        }}>
          ← Back to Home
        </Link>

        <div style={{ maxWidth: '700px' }}>
          <span style={{
            fontSize: '1.3rem',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            color: '#2B8659',
            display: 'block',
            marginBottom: '1rem',
          }}>
            Coverage
          </span>
          <h1 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-1px',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            Where RideFlow operates.
          </h1>
          <p style={{ color: '#eee', fontSize: '1rem', lineHeight: 1.75, maxWidth: '520px' }}>
            We started in the twin cities of Rawalpindi and Islamabad and are expanding across Pakistan city by city — with full coverage, verified drivers, and local support in every market.
          </p>
        </div>

       
      </div>

      {/* Cities grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 1.5rem 6rem',
      }}>

        {/* Live cities */}
        <div style={{ marginBottom: '3.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#0A0A0A',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}>
            <span style={{
              width: '10px', height: '10px',
              borderRadius: '50%',
              background: '#2B8659',
              display: 'inline-block',
            }} />
            Live Now
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem',
          }}
            className="cities-live-grid"
          >
            {cities.filter(c => c.status === 'live').map((city) => {
              const config = statusConfig[city.status]
              return (
                <div
                  key={city.name}
                  style={{
                    background: '#fff',
                    border: `1.5px solid ${config.border}`,
                    borderRadius: '20px',
                    padding: '2rem',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(43,134,89,0.1)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Top row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem',
                  }}>
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: '#0A0A0A',
                        marginBottom: '0.2rem',
                      }}>
                        {city.name}
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: '#888' }}>
                        {city.province} · {city.population} people
                      </p>
                    </div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: config.bg,
                      border: `1px solid ${config.border}`,
                      borderRadius: '50px',
                      padding: '0.3rem 0.85rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: config.color,
                    }}>
                      <span style={{
                        width: '6px', height: '6px',
                        borderRadius: '50%',
                        background: config.dot,
                        animation: 'pulse 2s infinite',
                        display: 'inline-block',
                      }} />
                      {city.label}
                    </span>
                  </div>

                  {/* Coverage */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1.25rem',
                  }}>
                    <MapPin size={14} color="#2B8659" />
                    <span style={{ fontSize: '0.85rem', color: '#555' }}>{city.coverage}</span>
                  </div>

                  {/* Zones */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap' as const,
                    gap: '0.4rem',
                    marginBottom: '1.5rem',
                  }}>
                    {city.zones.map((zone) => (
                      <span key={zone} style={{
                        background: '#F5F5F5',
                        borderRadius: '6px',
                        padding: '0.25rem 0.65rem',
                        fontSize: '0.75rem',
                        color: '#555',
                        fontWeight: 500,
                      }}>
                        {zone}
                      </span>
                    ))}
                  </div>

                  {/* Highlight */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    background: config.bg,
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    color: config.color,
                    fontWeight: 600,
                    marginBottom: '1.5rem',
                  }}>
                    <CheckCircle size={14} />
                    {city.highlight}
                  </div>

                  {/* CTA */}
                  <Link href="#book" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#444',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    padding: '0.7rem 1.4rem',
                    borderRadius: '50px',
                    textDecoration: 'none',
                  }}>
                    Book in {city.name} <ArrowRight size={14} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* Coming soon */}
        <div style={{ marginBottom: '3.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#0A0A0A',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}>
            <Clock size={16} color="#d97706" />
            Coming Soon
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}
            className="cities-soon-grid"
          >
            {cities.filter(c => c.status === 'soon' || c.status === 'planned').map((city) => {
              const config = statusConfig[city.status]
              return (
                <div
                  key={city.name}
                  style={{
                    background: '#FAFAFA',
                    border: `1px solid ${config.border}`,
                    borderRadius: '16px',
                    padding: '1.5rem',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}>
                    <h3 style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#0A0A0A',
                    }}>
                      {city.name}
                    </h3>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: config.bg,
                      border: `1px solid ${config.border}`,
                      borderRadius: '50px',
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: config.color,
                    }}>
                      ⏳ {city.label}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1rem' }}>
                    {city.province} · {city.population} people
                  </p>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap' as const,
                    gap: '0.35rem',
                  }}>
                    {city.zones.map((zone) => (
                      <span key={zone} style={{
                        background: '#EFEFEF',
                        borderRadius: '6px',
                        padding: '0.2rem 0.55rem',
                        fontSize: '0.72rem',
                        color: '#777',
                      }}>
                        {zone}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Suggest a city CTA */}
        <div style={{
          background: '#444',
          borderRadius: '20px',
          padding: '3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap' as const,
          gap: '1.5rem',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '0.5rem',
            }}>
              Don&apos;t see your city?
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#999', maxWidth: '400px' }}>
              We&apos;re expanding fast. Tell us where you need RideFlow and we&apos;ll prioritise it in our roadmap.
            </p>
          </div>
          <a
            href="mailto:cities@rideflow.pk"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#2B8659',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.92rem',
              padding: '0.9rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
              whiteSpace: 'nowrap' as const,
            }}
          >
            Suggest a City <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
        @media (max-width: 768px) {
          .cities-live-grid {
            grid-template-columns: 1fr !important;
          }
          .cities-soon-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .cities-soon-grid {
            grid-template-columns: 1fr !important;
          }
        }
        `}</style>
        </div>
  )
}