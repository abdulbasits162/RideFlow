'use client'

const cities = [
  { name: 'Rawalpindi', status: 'live', label: 'Live now' },
  { name: 'Islamabad', status: 'live', label: 'Live now' },
  { name: 'Lahore', status: 'soon', label: 'Month 7' },
  { name: 'Faisalabad', status: 'soon', label: 'Month 9' },
  { name: 'Gujranwala', status: 'soon', label: 'Year 2' },
]

export default function CityStrip() {
  return (
    <section
      id="cities"
      style={{
        padding: 'clamp(80px, 14vw, 180px) 5vw',
        background: '#FFFFFF',
        borderTop: '1px solid #EAEAEA',
        borderBottom: '1px solid #EAEAEA',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            color: '#1DB954',
            marginBottom: '0.75rem',
          }}
        >
          Coverage
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(1.6rem, 5vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.8px',
            marginBottom: '1rem',
            color: '#0A0A0A',
          }}
        >
          Where we operate.
        </h2>
        <p style={{ fontSize: 'clamp(0.85rem, 2vw, 1.15rem)', color: '#666', maxWidth: '520px', marginBottom: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.7 }}>
          Starting in the twin cities of Rawalpindi and Islamabad, then expanding across Pakistan.
        </p>

        <div
          className="city-strip-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(0.6rem, 2vw, 1rem)',
          }}
        >
          {cities.map((c) => (
            <div
              key={c.name}
              style={{
                background: c.status === 'live' ? 'rgba(29,185,84,0.06)' : '#F7F7F7',
                border: `1px solid ${c.status === 'live' ? '#1DB954' : '#E5E5E5'}`,
                borderRadius: '14px',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                textAlign: 'center' as const,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)',
                  fontWeight: 700,
                  marginBottom: '0.4rem',
                  color: '#0A0A0A',
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontSize: 'clamp(0.75rem, 1.6vw, 0.9rem)',
                  fontWeight: 600,
                  color: c.status === 'live' ? '#1DB954' : '#888',
                }}
              >
                {c.status === 'live' ? '🟢' : '⏳'} {c.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .city-strip-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .city-strip-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}