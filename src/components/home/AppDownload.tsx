'use client'
import Image from 'next/image'

export default function AppDownload() {
  return (
    <section id="app" style={{
      padding: 'clamp(70px, 15vw, 190px) 1.25rem',
      background: '#1DB954',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center' as const,
    }}>
      <div
        className="absolute inset-0 z-0 app-bg-image"
        style={{
          borderRadius: '30px',
          overflow: 'hidden',
          margin: 'clamp(30px, 8vw, 100px) clamp(20px, 4vw, 50px) clamp(30px, 8vw, 100px) clamp(20px, 47vw, 682px)',
        }}
      >
        <Image
          src="/images/downapp.jpeg"
          alt="RideFlow app"
          fill
          priority
          style={{
            objectPosition: 'center',
          }}
        />
      </div>

      <div
        className="app-content"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '560px',
          margin: '0 auto',
          marginLeft: 'clamp(0px, 6vw, 80px)',
        }}
      >
        <span style={{
          display: 'inline-block',
          fontSize: 'clamp(0.78rem, 1.8vw, 1rem)',
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
          fontSize: 'clamp(1.5rem, 5vw, 2.8rem)',
          fontWeight: 800,
          letterSpacing: '-0.8px',
          marginBottom: '0.75rem',
          color: '#000',
        }}>
          Everything is better in the app.
        </h2>
        <p style={{ fontSize: 'clamp(0.88rem, 2.2vw, 1.3rem)', color: 'rgba(0,0,0,0.55)', marginBottom: 'clamp(1.6rem, 4vw, 2.5rem)', lineHeight: 1.7 }}>
          Real-time tracking, in-ride chat, saved locations, ride history, and SOS — all in one place.
        </p>

        <div style={{ display: 'flex', gap: 'clamp(0.6rem, 2vw, 1rem)', justifyContent: 'center', flexWrap: 'wrap' as const }}>
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
              padding: 'clamp(0.7rem, 2vw, 0.9rem) clamp(1rem, 3vw, 1.5rem)',
              textDecoration: 'none',
              color: '#fff',
              minWidth: 'clamp(135px, 32vw, 165px)',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <span style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)' }}>{badge.icon}</span>
              <div style={{ textAlign: 'left' as const }}>
                <span style={{ display: 'block', fontSize: '0.68rem', color: '#888' }}>{badge.sub}</span>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  fontWeight: 700,
                }}>{badge.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Tablet: shrink image area, keep it visible but smaller */
        @media (max-width: 1100px) {
          .app-bg-image {
            margin: clamp(25px, 6vw, 60px) clamp(15px, 3vw, 30px) clamp(25px, 6vw, 60px) 55% !important;
          }
        }

        /* Mobile: hide decorative image entirely, center content */
        @media (max-width: 768px) {
          .app-bg-image {
            display: none;
          }
          .app-content {
            margin-left: auto !important;
            max-width: 100% !important;
            padding: 0 0.5rem;
          }
        }
      `}</style>
    </section>
  )
}