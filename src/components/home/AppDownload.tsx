'use client'
import Image from 'next/image'

export default function AppDownload() {
  return (
    <section
      id="app"
      style={{
        background: '#fff',
        position: 'relative',
        overflow: 'hidden',
        padding: '150px 5vw',
      }}
      
    >
       <Image
            src="/images/app-bg.jpg"
            alt="RideFlow app on phone"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
      {/* Background subtle glow */}
  

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}
        className="md:grid-cols-2 grid-cols-1"
      >
        {/* Left: text */}
        <div>
          <span style={{
            display: 'inline-block',
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            color: '#2B8659',
            marginBottom: '1rem',
          }}>
            Get the App
          </span>

          <h2 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-1px',
            lineHeight: 1.1,
            color: 'black',
            marginBottom: '1.25rem',
          }}>
            Your ride,<br />
            one tap away.
          </h2>

          <p style={{
            fontSize: '1rem',
            color: '#222',
            lineHeight: 1.75,
            marginBottom: '2rem',
            maxWidth: '400px',
          }}>
            Real-time tracking, in-ride chat, saved locations, ride history,
            and SOS — all in one place. Free on Android and iOS.
          </p>

          {/* Feature pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: '0.6rem',
            marginBottom: '2.5rem',
          }}>
            {['Live GPS', 'SOS Button', 'Ride History', 'In-App Chat', 'Saved Places'].map((f) => (
              <span key={f} style={{
                background: 'rgba(29,185,84,0.08)',
                border: '1px solid rgba(29,185,84,0.2)',
                borderRadius: '50px',
                padding: '0.35rem 0.9rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#1DB954',
              }}>
                {f}
              </span>
            ))}
          </div>

          {/* App store badges */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' as const }}>
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
                  gap: '0.75rem',
                  background: '#2B8659',
                  border: '1px solid #444',
                  borderRadius: '12px',
                  padding: '0.85rem 1.4rem',
                  textDecoration: 'none',
                  color: '#fff',
                  minWidth: '160px',
                  transition: 'border-color 0.2s, transform 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1DB954'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#444'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{badge.icon}</span>
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#333' }}>{badge.sub}</span>
                  <span style={{
                    display: 'block',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                  }}>{badge.name}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  )
}