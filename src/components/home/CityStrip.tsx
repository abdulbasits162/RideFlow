const cities = [
  { name: 'Rawalpindi', status: 'live', label: 'Live now' },
  { name: 'Islamabad', status: 'live', label: 'Live now' },
  { name: 'Lahore', status: 'soon', label: 'Month 7' },
  { name: 'Faisalabad', status: 'soon', label: 'Month 9' },
  { name: 'Gujranwala', status: 'soon', label: 'Year 2' },
]

export default function CityStrip() {
  return (
    <section id="cities" style={{
      padding: '130px 1.25rem',
      background: '#0A0A0A',
      borderTop: '1px solid #1a1a1a',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <span style={{
          display: 'inline-block',
          fontSize: '1.5rem',
          fontWeight: 800,
          letterSpacing: '2px',
          textTransform: 'uppercase' as const,
          color: '#2B8659',
          marginBottom: '0.75rem',
        }}>
          Coverage
        </span>
        <h2 style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          letterSpacing: '-0.8px',
          marginBottom: '0.75rem',
          color: '#fff',
        }}>
          Where we operate.
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#999 ', maxWidth: '480px', marginBottom: '3rem', lineHeight: 1.7 }}>
          Starting in the twin cities of Rawalpindi and Islamabad, then expanding across Pakistan.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
        }}
          className="sm:grid-cols-3 md:grid-cols-5"
        >
          {cities.map((c) => (
            <div key={c.name} style={{
              background: c.status === 'live' ? '#2B8659' : '#141414',
              border: `1px solid ${c.status === 'live' ? '#2B8659' : '#222'}`,
              borderRadius: '12px',
              padding: '1.5rem 1rem',   
              textAlign: 'center' as const,
            }}>
              <div style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '1.2rem',
                fontWeight: 700,
                marginBottom: '0.35rem',
                color: c.status === 'live' ? '#000' : '#fff',
              }}>
                {c.name}
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: c.status === 'live' ? 'rgba(0,0,0,0.6)' : '#555',
              }}>
                {c.status === 'live' ? '🟢' : '⏳'} {c.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 