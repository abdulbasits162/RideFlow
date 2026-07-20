'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function FleetSection() {
  return (
    <section
      id="fleet"
      style={{
        background: '#F7F8F7',
        padding: 'clamp(60px, 10vw, 120px) 5vw',
      }}
    >
      <div
        className="fleet-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 6vw, 4rem)',
          alignItems: 'center',
        }}
      >
        {/* Left: text */}
        <div>
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(0.85rem, 1.6vw, 0.95rem)',
              fontWeight: 700,
              color: '#5A6B63',
              marginBottom: '0.75rem',
            }}
          >
            Join RideFlow with your fleet and earn more
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.8px',
              lineHeight: 1.15,
              color: '#0A0A0A',
              marginBottom: '1.25rem',
            }}
          >
            Grow your transport business.
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              color: '#666',
              lineHeight: 1.75,
              maxWidth: '480px',
              marginBottom: '2rem',
            }}
          >
            As a fleet owner and RideFlow partner, manage every vehicle from one simple dashboard — assign verified drivers, track earnings, and scale your business without the paperwork.
          </p>

          <Link
            href="/fleet"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#2B8659',
              color: '#fff',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
              padding: 'clamp(0.8rem, 2vw, 0.95rem) clamp(1.6rem, 3vw, 2.2rem)',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#256E4A')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#2B8659')}
          >
            Register your fleet
          </Link>
        </div>

        {/* Right: image */}
        <div
          className="fleet-image-wrap"
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(340px, 45vw, 480px)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/fleet-car.jpeg"
            alt="RideFlow fleet vehicle"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .fleet-grid {
            grid-template-columns: 1fr !important;
          }
          .fleet-image-wrap {
            order: -1;
          }
        }
      `}</style>
    </section>
  )
}






