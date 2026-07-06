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
        padding: '180px 5vw',
        background: '#FFFFFF',
        borderTop: '1px solid #EAEAEA',
        borderBottom: '1px solid #EAEAEA',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: '1rem',
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
            fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.8px',
            marginBottom: '1rem',
            color: '#0A0A0A',
          }}
        >
          Where we operate.
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#666', maxWidth: '520px', marginBottom: '3rem', lineHeight: 1.7 }}>
          Starting in the twin cities of Rawalpindi and Islamabad, then expanding across Pakistan.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
        >
          {cities.map((c) => (
            <div
              key={c.name}
              style={{
                background: c.status === 'live' ? 'rgba(29,185,84,0.06)' : '#F7F7F7',
                border: `1px solid ${c.status === 'live' ? '#1DB954' : '#E5E5E5'}`,
                borderRadius: '14px',
                padding: '1.5rem',
                textAlign: 'center' as const,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  marginBottom: '0.4rem',
                  color: '#0A0A0A',
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
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
    </section>
  )
}