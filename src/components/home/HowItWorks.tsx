const steps = [
  { num: '1', title: 'Set Your Route', desc: 'Enter pickup and drop-off. See your upfront fare before you confirm — no surprises.' },
  { num: '2', title: 'Matched in Seconds', desc: 'We find the nearest verified driver. You see their name, photo, rating, and plate.' },
  { num: '3', title: 'Track Live', desc: 'Watch your driver in real time. Share your trip link with family in one tap.' },
  { num: '4', title: 'Pay & Rate', desc: 'Pay with your preferred method. Rate your driver to keep the platform safe.' },
]

export default function HowItWorks() {
  return (
    <section
      id="how"
      style={{
        padding: '160px 5vw',
        background: '#444',
        borderTop: '1px solid #262626',
        borderBottom: '1px solid #262626',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          How It Works
        </span>
        <br />
        <h2
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.8px',
            marginBottom: '3.5rem',
          }}
        >
          From tap to destination in four steps.
        </h2>
        <br />
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
          }}
        >
          {/* Connecting line */}
          <div
            style={{
              position: 'absolute',
              top: '23px',
              left: 'calc(0% + 23px)',
              right: 'calc(20% + 23px)',
              height: '1px',
              // background: '#1DB954',
              background: 'linear-gradient(90deg,  #1DB954 0%,rgba(29, 185, 84, 0.2) 100%)',
              zIndex: 0,
            }}
          />

          {steps.map((step) => (
            <div key={step.num}
       
            >
         
              <div

                style={{

                  width: '46px',
                  height: '46px',
                  background: '#1DB954',
                  color: '#000',
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.2rem',
                  flexShrink: 0,
                  position:'relative',
                  zIndex: 1,
                }}
              >
                {step.num}
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: '1.9rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                }}
              >
                {step.title}
              </h4>
              <p style={{ fontSize: '1.3rem', color: '#999', lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}