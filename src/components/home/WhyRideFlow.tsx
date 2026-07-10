'use client'
const features = [
  { icon: '🪪', title: 'Verified Driver Identity', desc: 'Every driver\'s ID is verified before their first ride. No exceptions.' },
  { icon: '💳', title: 'Local Payment Methods', desc: 'Pay with mobile wallets or cash — we support what people already use.' },
  { icon: '📍', title: 'Live GPS Tracking', desc: 'Your driver\'s location streams live during the ride. Share your trip in one tap.' },
  { icon: '🆘', title: 'One-Tap SOS', desc: 'Hit SOS and your location and ride ID go instantly to emergency contacts.' },
  { icon: '📊', title: 'Transparent Fare, Always', desc: 'See the full fare before confirming. Surge is shown clearly and capped at 2×.' },
  { icon: '⭐', title: 'Two-Way Rating System', desc: 'Drivers and passengers rate each other after every ride, keeping everyone safe.' },
]

export default function WhyRideFlow() {
  return (
    <section style={{ padding: 'clamp(50px, 8vw, 90px) 5vw',background:'#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: 'clamp(1.5rem, 1.8vw, 1.2rem)',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            color: '#2B8659',
            marginBottom: '0.75rem',
            
          }}
        >
          Why RideFlow
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(1.6rem, 5vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.8px',
            marginBottom: '1rem',
            color:'black'
          }}
        >
          Safety and fairness, not just speed.
        </h2>
        {/* <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.25rem)', color: '#666', maxWidth: '520px', marginBottom: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.7 }}>
          Every decision is built around two people: the passenger who needs to feel safe, and the driver who deserves to earn fairly.
        </p> */}
<br />
        <div
          className="why-rideflow-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(0.9rem, 2.5vw, 1.5rem)',
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: '#fff',
                border: '1px solid #262626',
                borderRadius: '14px',
                padding: 'clamp(1.2rem, 3.5vw, 1.8rem)',
                transition: 'border-color 0.25s, transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#2B8659'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#262626'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div
                style={{
                  width: 'clamp(38px, 6vw, 46px)',
                  height: 'clamp(38px, 6vw, 46px)',
                  background: 'rgba(29,185,84,0.12)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  marginBottom: '1.1rem',
                }}
              >
                {f.icon}
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: 'clamp(1.05rem, 2.5vw, 1.30rem)',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color:'black'
                }}
              >
                {f.title}
              </h4>
              <p style={{ fontSize: 'clamp(0.82rem, 1.8vw, 1rem)', color: '#666', lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .why-rideflow-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .why-rideflow-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}