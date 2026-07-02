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
        // background: '#111111'  ,
        // borderTop: '1px solid #262626',
        padding: '4rem 5vw 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto',            borderTop: '1px solid #262626',
 }}>

        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '3rem',
            marginBottom: '3rem',
            marginTop:'3rem'
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontWeight: 800,
                fontSize: '1.6rem',
                letterSpacing: '-0.5px',
                color: '#fff',
                textDecoration: 'none',
                display: 'inline-block',
                marginBottom: '0.8rem',
              }}
            >
              Ride<span style={{ color: '#1DB954' }}>Flow</span>
            </Link>
            <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, maxWidth: '260px' }}>
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
                  color: '#555',
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
                        color: '#888',
                        fontSize: '0.88rem',
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
            // borderTop: '1px solid #262626',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap' as const,
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: '#555' }}>
            © 2026 RideFlow Pakistan. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.2rem' }}>
            {socials.map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  fontSize: '0.8rem',
                  color: '#555',
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
    </footer>
  )
}