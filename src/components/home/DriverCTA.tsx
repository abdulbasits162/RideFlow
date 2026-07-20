'use client'

import Link from 'next/link'

const perks = [
  { title: 'Weekly Payouts' },
  { title: 'lowest commission' },
  { title: 'Full Earnings Transparency' },
  { title: 'You Set Your Hours' },
]

export default function DriverCTA() {
  return (
    <section
      id="driver"
      style={{
        padding: 'clamp(70px, 12vw, 140px) 5vw',
        background: '#fff',
        // borderTop: '1px solid #262626',
        // borderBottom: '1px solid #262626',
      }}
    >
      <div
        className="driver-cta-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 6vw, 4rem)',
          alignItems: 'center',
        }}
      >
        {/* Left */}
        <div>
          <span
            style={{
              display: 'inline-block',
              fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
              fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
              color: '#2B8659',
              marginBottom: '0.75rem',
            }}
          >
            For Drivers
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(1.4rem, 4.2vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.8px',
              marginBottom: '1rem',
              color:'black'
            }}
          >
            The most driver-friendly platform in Pakistan.
          </h2>
          {/* <p style={{ fontSize: 'clamp(0.85rem, 2vw, 1.15rem)', color: '#888', maxWidth: '520px', marginBottom: '2rem', lineHeight: 1.7 }}>
            RideFlow charges the lowest commission in the market — meaning more in your pocket every single ride.
          </p> */}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 2vw, 1rem)', marginBottom: '2rem' }}>
            {perks.map((p) => (
              <div key={p.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(0.7rem, 2vw, 1rem)',color:'#444' }}>
                <div
                  style={{
                    width: 'clamp(26px, 4vw, 34px)',
                    height: 'clamp(26px, 4vw, 34px)',
                    borderRadius: '50%',
                    background: 'rgba(29,185,84,0.12)',
                    border: '1px solid rgba(29,185,84,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                    fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                    color: '#2B8659',
                  }}
                >
                  ✓
                </div>
                <div>
                  <h5 style={{ fontSize: 'clamp(1rem, 2.6vw, 1.5rem)', fontWeight: 600, marginBottom: '0.15rem' }}>{p.title}</h5>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/driver/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#2B8659',
              color: '#fff',
              fontWeight: 700,
              fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)',
              padding: 'clamp(0.65rem, 2vw, 0.85rem) clamp(1.4rem, 4vw, 2rem)',
              borderRadius: '10px',
              textDecoration: 'none',
            }}
          >
            Register as a Driver →
          </Link>
        </div>

        {/* Right: earnings card */}
        <div
          className="earnings-card"
          style={{
            background: '#444',
            border: '1px solid #262626',
            borderRadius: '14px',
            padding: 'clamp(1.25rem, 4vw, 2rem)',
            height: 'clamp(420px, 55vw, 570px)',
            width: '100%',
            maxWidth: '500px',
            justifySelf: 'center',
          }}
        >
          <h4
            style={{
              fontSize: 'clamp(0.95rem, 2.2vw, 1.3rem)',
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '1px',
              color: '#fff  ',
              marginBottom: '1.5rem',
            }}
          >
            Sample Weekly Earnings
          </h4>
          <br />
          {[
            { label: 'Total Fare Collected', val: 'PKR 28,500', color: '#fff' },
            { label: 'Platform Commission (17%)', val: '− PKR 4,845', color: '#e05' },
            { label: 'Surge Bonus Earned', val: '+ PKR 1,200', color: '#2B8659' },
            { label: 'Your Net Earnings', val: 'PKR 24,855', color: '#2B8659', large: true },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.8rem 0',
                borderBottom: row.large ? 'none' : '1px solid #333',
                gap: '0.75rem',
                color:'#111'
              }}
            >

              <span style={{ fontSize: 'clamp(0.8rem, 2vw, 1.1rem)', color: '#eee' }}>{row.label} </span>
              <span
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontWeight: 700,
                  fontSize: row.large ? 'clamp(1.1rem, 2.8vw, 1.6rem)' : 'clamp(0.9rem, 2.2vw, 1.25rem)',
                  color: row.color,
                  whiteSpace: 'nowrap',
                }}
              >
                {row.val}
              </span>
            </div>
          ))}
<br /><br />
          <div
            style={{
              marginTop: '2.2rem',
              padding: '0.8rem',
              background: 'rgba(29,185,84,0.08)',
              borderRadius: '8px',
              fontSize: 'clamp(0.72rem, 1.6vw, 0.8rem)',
              color: '#eee',
              lineHeight: 1.5,
            }}
          >
            Based on ~35 rides/week at average fare PKR 815. Actual earnings vary.
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .driver-cta-grid {
            grid-template-columns: 1fr !important;
          }
          .earnings-card {
            height: auto !important;
          }
        }
      `}</style>
    </section>
  )
}