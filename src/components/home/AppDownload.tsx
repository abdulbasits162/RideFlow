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
        padding: '100px 5vw',
      }}
    >
      {/* Background subtle glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(29,185,84,0.07) 0%, transparent 70%)',
        zIndex: 0,
      }} />

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
            color: '#555',
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
                  border: '1px solid #fff',
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
                  e.currentTarget.style.borderColor = '#fff'
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

        {/* Right: phone image */}
        <div style={{
          position: 'relative',
          height: '520px',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid #1a1a1a',
        }}>
          <Image
            src="/images/app-bg.jpg"
            alt="RideFlow app on phone"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Overlay gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%)',
          }} />

          {/* Floating stat card */}
          <div style={{
            position: 'absolute',
            left: '1.5rem',
            top: '2rem',
            background: 'rgba(10,10,10,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid #262626',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            minWidth: '180px',
          }}>
            <div style={{ fontSize: '0.7rem', color: '#555', marginBottom: '0.3rem', textTransform: 'uppercase' as const, letterSpacing: '1px' }}>
              Match Time
            </div>
            <div style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#1DB954',
              lineHeight: 1,
            }}>
              &lt;90s
            </div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.25rem' }}>
              Average driver match
            </div>
          </div>

          {/* Floating rating card */}
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            right: '1.5rem',
            background: 'rgba(10,10,10,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid #262626',
            borderRadius: '14px',
            padding: '0.85rem 1.1rem',
          }}>
            <div style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>⭐⭐⭐⭐⭐</div>
            <div style={{ fontSize: '0.72rem', color: '#777' }}>4.8 · 2,400+ rides</div>
          </div>
        </div>
      </div>
    </section>
  )
}