'use client'

export default function AppDownload() {
  return (
    <section
      id="app"
      style={{ padding: '90px 5vw', textAlign: 'center' as const }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
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
          Get the App
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.8px',
            marginBottom: '1rem',
          }}
        >
          Everything is better in the app.
        </h2>
        <p style={{ fontSize: '1rem', color: '#888', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          Real-time tracking, in-ride chat, saved locations, ride history, and SOS — all in one place. Free on Android and iOS.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' as const }}>
          {[
            { icon: '🤖', sub: 'Get it on', name: 'Google Play' },
            { icon: '🍎', sub: 'Download on the', name: 'App Store' },
          ].map((badge) => (
            <a
              key={badge.name}
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                background: '#181818',
                border: '1px solid #262626',
                borderRadius: '12px',
                padding: '0.9rem 1.6rem',
                textDecoration: 'none',
                color: '#fff',
                minWidth: '180px',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1DB954')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#262626')}
            >
              <span style={{ fontSize: '1.8rem' }}>{badge.icon}</span>
              <div style={{ textAlign: 'left' as const }}>
                <span style={{ display: 'block', fontSize: '0.7rem', color: '#888' }}>{badge.sub}</span>
                <span style={{ display: 'block', fontFamily: 'var(--font-syne), sans-serif', fontSize: '1rem', fontWeight: 700 }}>{badge.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}