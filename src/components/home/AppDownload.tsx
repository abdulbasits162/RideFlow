'use client'
import Image from 'next/image'

export default function AppDownload() {
  return (
    <section id="app" style={{
      padding: '190px 1.25rem',
      background: '#C7E3BA',
      position: 'relative',
      overflow: 'hidden',

      textAlign: 'center' as const,
    }}>
      <div
        className="absolute inset-0 z-0"
        style={{ borderRadius: '30px', overflow: 'hidden',margin:'100px 50px 100px 682px' }}
      >
        <Image
          src="/images/downapp.jpeg"
          alt="RideFlow app"
          fill
          priority
          style={{
            objectPosition: 'center',
            // padding: '100px 50px 50px 690px',
            // borderRadius: '20pc',
          }}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '560px', margin: '0 auto', marginLeft: '80px' }}>

        <span style={{
          display: 'inline-block',
          fontSize: '1rem',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase' as const,
          color: 'rgba(0,0,0,0.5)',
          marginBottom: '0.75rem',
        }}>
          Get the App
        </span>
        <h2 style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 'clamp(1.7rem, 4vw, 2.8rem)',
          fontWeight: 800,
          letterSpacing: '-0.8px',
          marginBottom: '0.75rem',
          color: '#000',
        }}>
          Everything is better in the app.
        </h2>
        <p style={{ fontSize: '1.3rem', color: 'rgba(0,0,0,0.55)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          Real-time tracking, in-ride chat, saved locations, ride history, and SOS — all in one place.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' as const }}>
          {[
            { icon: '🤖', sub: 'Get it on', name: 'Google Play' },
            { icon: '🍎', sub: 'Download on the', name: 'App Store' },
          ].map((badge) => (
            <a key={badge.name} href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: '#000',
              borderRadius: '12px',
              padding: '0.9rem 1.5rem',
              textDecoration: 'none',
              color: '#fff',
              minWidth: '165px',
              transition: 'opacity 0.2s',

            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <span style={{ fontSize: '1.6rem' }}>{badge.icon}</span>
              <div style={{ textAlign: 'left' as const }}>
                <span style={{ display: 'block', fontSize: '0.68rem', color: '#888' }}>{badge.sub}</span>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                }}>{badge.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}