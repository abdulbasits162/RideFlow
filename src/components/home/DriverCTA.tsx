import Link from 'next/link'

const perks = [
  { title: 'Weekly Payouts', desc: 'Your earnings land in your wallet every week. No delays, no queues.' },
  { title: 'Full Earnings Transparency', desc: 'See every deduction itemised — fare, commission, promotions. Zero hidden cuts.' },
  { title: 'You Set Your Hours', desc: 'Go online when you want, go offline when you don\'t. No minimum hours.' },
]

export default function DriverCTA() {
  return (
    <section
      id="driver"
      style={{
        padding: '140px 5vw',
        background: '#111111',
        borderTop: '1px solid #262626',
        borderBottom: '1px solid #262626',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        {/* Left */}
        <div>
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
            For Drivers
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.8px',
              marginBottom: '1rem',
            }}
          >
            The most driver-friendly platform in Pakistan.
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#888', maxWidth: '520px', marginBottom: '2rem', lineHeight: 1.7 }}>
            RideFlow charges the lowest commission in the market — meaning more in your pocket every single ride.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {perks.map((p) => (
              <div key={p.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'rgba(29,185,84,0.12)',
                    border: '1px solid rgba(29,185,84,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                    fontSize: '0.7rem',
                    color: '#1DB954',
                  }}
                >
                  ✓
                </div>
                <div>
                  <h5 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.15rem' }}>{p.title}</h5>
                  <p style={{ fontSize: '0.9rem', color: '#777' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/driver/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#1DB954',
              color: '#000',
              fontWeight: 700,
              fontSize: '0.95rem',
              padding: '0.85rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
            }}
          >
            Register as a Driver →
          </Link>
        </div>

        {/* Right: earnings card */}
        <div
          style={{
            background: '#181818',
            border: '1px solid #262626',
            borderRadius: '14px',
            padding: '2rem',
          }}
        >
          <h4
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '1px',
              color: '#6B6B6B',
              marginBottom: '1.5rem',
            }}
          >
            Sample Weekly Earnings
          </h4>

          {[
            { label: 'Total Fare Collected', val: 'PKR 28,500', color: '#fff' },
            { label: 'Platform Commission (17%)', val: '− PKR 4,845', color: '#e05' },
            { label: 'Surge Bonus Earned', val: '+ PKR 1,200', color: '#1DB954' },
            { label: 'Your Net Earnings', val: 'PKR 24,855', color: '#1DB954', large: true },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.85rem 0',
                borderBottom: row.large ? 'none' : '1px solid #262626',
              }}
            >
              <span style={{ fontSize: '0.9rem', color: '#aaa' }}>{row.label}</span>
              <span
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontWeight: 700,
                  fontSize: row.large ? '1.3rem' : '1rem',
                  color: row.color,
                }}
              >
                {row.val}
              </span>
            </div>
          ))}

          <div
            style={{
              marginTop: '1.2rem',
              padding: '0.8rem',
              background: 'rgba(29,185,84,0.08)',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: '#888',
              lineHeight: 1.5,
            }}
          >
            Based on ~35 rides/week at average fare PKR 815. Actual earnings vary.
          </div>
        </div>
      </div>
    </section>
  )
}