'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden"
      style={{ padding: '120px 5vw 80px' }}
    >
      {/* Green glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 80% 40%, rgba(29,185,84,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(29,185,84,0.06) 0%, transparent 50%)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(#262626 1px, transparent 1px), linear-gradient(90deg, #262626 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.3,
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ maxWidth: '680px' }}>
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2"
          style={{
            background: 'rgba(29,185,84,0.12)',
            border: '1px solid rgba(29,185,84,0.3)',
            borderRadius: '50px',
            padding: '0.35rem 1rem',
            marginBottom: '1.5rem',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              background: '#1DB954',
              borderRadius: '50%',
              animation: 'pulse 2s infinite',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#1DB954',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            Now live — Rawalpindi & Islamabad
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-1.5px',
            marginBottom: '1.4rem',
          }}
        >
          Pakistan&apos;s<br />
          ride-hailing,<br />
          <span style={{ color: '#1DB954' }}>done right.</span>
        </h1>

        <p
          style={{
            fontSize: '1.15rem',
            color: '#B0B0B0',
            maxWidth: '520px',
            marginBottom: '2.5rem',
            lineHeight: 1.7,
          }}
        >
          Verified drivers. Local payments. Transparent fares.
          Built in Pakistan, for Pakistan — starting in Rawalpindi and Islamabad.
        </p>

        <div className="flex flex-wrap" style={{ gap: '1rem' }}>
          <Link
            href="/book"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#1DB954',
              color: '#000',
              fontWeight: 700,
              fontSize: '0.95rem',
              padding: '0.85rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
           📍 Book a Ride
          </Link>
          <Link
            href="/driver"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.95rem',
              padding: '0.85rem 2rem',
              borderRadius: '50px',
              border: '1px solid #262626',
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
          >

          🚗 Drive with RideFlow
          </Link>
        </div>
        
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </section>
  )
}