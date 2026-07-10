import Link from 'next/link'

const footerLinks = {
  Passengers: [
    { label: 'Book a Ride', href: '/book' },
    { label: 'How It Works', href: '/#how' },
    { label: 'Safety Features', href: '/safety' },
    { label: 'Download App', href: '/#app' },
  ],
  Drivers: [
    { label: 'Drive with RideFlow', href: '/driver' },
    { label: 'Register as Driver', href: '/driver/register' },
    { label: 'Earnings', href: '/driver#earnings' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Cities', href: '/cities' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

const socials = ['Facebook', 'Instagram', 'TikTok', 'X']

export default function Footer() {
  return (
    <footer
      style={{
        padding: 'clamp(2.5rem, 6vw, 4rem) 5vw clamp(1.25rem, 3vw, 2rem)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid #262626',
        }}
      >
        {/* Top grid */}
        <div
          className="footer-top-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            marginTop: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
                letterSpacing: '-0.5px',
                color: '#fff',
                textDecoration: 'none',
                display: 'inline-block',
                marginBottom: '0.8rem',
              }}
            >
              Ride<span style={{ color: '#2B8659' }}>Flow</span>
            </Link>
            <p style={{ fontSize: 'clamp(0.78rem, 1.7vw, 0.85rem)', color: '#999', lineHeight: 1.7, maxWidth: '260px' }}>
              Pakistan&apos;s safety-first, driver-fair ride-hailing platform.
              Starting in Rawalpindi &amp; Islamabad.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h5
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '1.5px',
                  color: '#eee',
                  marginBottom: '1rem',
                }}
              >
                {title}
              </h5>
              <ul style={{ listStyle: 'none' }}>
                {items.map((item) => (
                  <li key={item.label} style={{ marginBottom: '0.6rem' }}>
                    <Link
                      href={item.href}
                      style={{
                        color: '#999',
                        fontSize: 'clamp(0.82rem, 1.8vw, 0.88rem)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap' as const,
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: 'clamp(0.72rem, 1.6vw, 0.8rem)', color: '#888' }}>
            © 2026 RideFlow Pakistan. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 'clamp(0.8rem, 2vw, 1.2rem)', flexWrap: 'wrap' as const }}>
            {socials.map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  fontSize: 'clamp(0.72rem, 1.6vw, 0.8rem)',
                  color: '#888',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 560px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
          }
          .footer-top-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </footer>
  )
}