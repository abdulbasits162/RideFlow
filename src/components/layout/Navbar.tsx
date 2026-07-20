'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Car, Truck, BookOpen} from 'lucide-react'
import { useRouter } from 'next/navigation'

const links = [
  { label: 'Book a Ride', href: '#book' },
  { label: 'How It Works', href: '#how' },
  { label: 'Cities', href: '#cities' },
  { label: 'Drive with Us', href: '#driver' },
  { label: 'For Fleets', href: '#fleet' },
]

const registerOptions = [
  {
    icon: <BookOpen size={18} color="#2B8659" />,
    label: 'Book a Ride',
    desc: 'Find a ride in seconds',
    href: '/books',
    isHash: true,
  },
  {
    icon: <Car size={18} color="#2B8659" />,
    label: 'Become a Driver',
    desc: 'Make money on your terms',
    href: '/driver/register',
    isHash: false,
  },
  {
    icon: <Truck size={18} color="#2B8659" />,
    label: 'Sign up as Fleet Owner',
    desc: 'Add your fleet and boost income',
    href: '/fleet',
    isHash: true,
  },
  // {
  //   icon: <Users size={18} color="#2B8659" />,
  //   label: 'Corporate Account',
  //   desc: 'Rides for your entire team',
  //   href: '/corporate',
  //   isHash: false,
  // },
]


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [open, setOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  // const [langOpen, setLangOpen] = useState(false)
  // const [activeLang, setActiveLang] = useState('EN')
  const lastScrollY = useRef(0)
  const registerRef = useRef<HTMLDivElement>(null)
  // const langRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      if (currentY < 50) {
        setVisible(true)
      } else if (currentY > lastScrollY.current) {
        setVisible(false)
        setOpen(false)
        setRegisterOpen(false)
        // setLangOpen(false)
      } else {
        setVisible(true)
      }
      setScrolled(currentY > 20)
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (registerRef.current && !registerRef.current.contains(e.target as Node)) {
        setRegisterOpen(false)
      }
      // if (langRef.current && !langRef.current.contains(e.target as Node)) {
      //   setLangOpen(false)
      // }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    setOpen(false)
    setRegisterOpen(false)
    if (href.startsWith('#')) {
      const isHome = window.location.pathname === '/'
      if (isHome) {
        document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push('/')
        setTimeout(() => {
          document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
        }, 500)
      }
    } else {
      router.push(href)
    }
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      height: 'clamp(52px, 9vw, 68px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(1rem, 6vw, 5vw)',
      background: 'white',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: '1px solid #eee',
      transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.3s ease, background 0.3s',
    }}>

      {/* Logo */}
      <Link href="/" style={{
        fontFamily: 'var(--font-syne), sans-serif',
        fontWeight: 800,
        fontSize: 'clamp(1rem, 4vw, 1.45rem)',
        letterSpacing: '-0.5px',
        color: 'black',
        textDecoration: 'none',
        flexShrink: 0,
      }}>
        Ride<span style={{ color: '#2B8659' }}>Flow</span>
      </Link>

      {/* Desktop nav links */}
      <ul className="nav-desktop-links" style={{
        gap: 'clamp(0.75rem, 3vw, 2rem)',
        listStyle: 'none',
        alignItems: 'center',
        display: 'flex',
      }}>
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              style={{
                color: 'black',
                textDecoration: 'none',
                fontSize: 'clamp(0.7rem, 1.4vw, 0.88rem)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#2B8659')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'black')}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop right side */}
      <div className="nav-desktop-ctas" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        flexShrink: 0,
      }}>

      {/* Support button */}
<a
  href="/support"
  style={{
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#333',
    textDecoration: 'none',
    padding: '0.45rem 1rem',
    borderRadius: '50px',
    transition: 'color 0.2s',
    whiteSpace: 'nowrap',
    fontFamily: 'var(--font-inter), sans-serif',
    marginRight:'20px'
  }}
  onMouseEnter={(e) => (e.currentTarget.style.background = '#eee')}
  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
>
  Support
</a>

        {/* Register dropdown */}
        <div ref={registerRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setRegisterOpen(!registerOpen); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#444',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              padding: '0.45rem 1.1rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 700,
              fontFamily: 'var(--font-inter), sans-serif',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#555')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#444')}
          >
            Register
            <ChevronDown
              size={14}
              color="#fff"
              style={{
                transform: registerOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </button>

          {registerOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              right: 0,
              background: '#fff',
              border: '1px solid #E5E5E5',
              borderRadius: '16px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              minWidth: '260px',
              overflow: 'hidden',
              zIndex: 200,
            }}>
              {registerOptions.map((opt) => (
                opt.isHash ? (
                  <a
                    key={opt.label}
                    href={opt.href}
                    onClick={(e) => handleNavClick(e, opt.href)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.9rem',
                      padding: '0.9rem 1.1rem',
                      textDecoration: 'none',
                      borderBottom: '1px solid #F5F5F5',
                      transition: 'background 0.15s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F9FFF6')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: 'rgba(43,134,89,0.08)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {opt.icon}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        color: '#0A0A0A',
                        fontFamily: 'var(--font-inter), sans-serif',
                      }}>
                        {opt.label}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '1px' }}>
                        {opt.desc}
                      </div>
                    </div>
                  </a>
                ) : (
                  <Link
                    key={opt.label}
                    href={opt.href}
                    onClick={() => setRegisterOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.9rem',
                      padding: '0.9rem 1.1rem',
                      textDecoration: 'none',
                      borderBottom: '1px solid #F5F5F5',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F9FFF6')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: 'rgba(43,134,89,0.08)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {opt.icon}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        color: '#0A0A0A',
                        fontFamily: 'var(--font-inter), sans-serif',
                      }}>
                        {opt.label}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '1px' }}>
                        {opt.desc}
                      </div>
                    </div>
                  </Link>
                )
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile toggle */}
      <button
        className="nav-mobile-toggle"
        onClick={() => setOpen(!open)}
        style={{
          background: '#0A0A0A',
          border: 'none',
          borderRadius: '10px',
          color: '#fff',
          cursor: 'pointer',
          padding: '0.4rem',
          display: 'none',
        }}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'clamp(52px, 9vw, 68px)',
          left: 0, right: 0,
          background: '#fff',
          borderBottom: '1px solid #eee',
          padding: '1rem clamp(1rem, 6vw, 5vw)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          zIndex: 200,
        }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              style={{
                color: '#333',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                padding: '0.65rem 0',
                borderBottom: '1px solid #F5F5F5',
                cursor: 'pointer',
              }}
            >
              {l.label}
            </a>
          ))}

          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {registerOptions.map((opt) => (
              opt.isHash ? (
                <a
                  key={opt.label}
                  href={opt.href}
                  onClick={(e) => handleNavClick(e, opt.href)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: '#F9F9F9',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '32px', height: '32px',
                    background: 'rgba(43,134,89,0.08)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {opt.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0A0A0A' }}>{opt.label}</div>
                    <div style={{ fontSize: '0.72rem', color: '#888' }}>{opt.desc}</div>
                  </div>
                </a>
              ) : (
                <Link
                  key={opt.label}
                  href={opt.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: '#F9F9F9',
                    borderRadius: '12px',
                    textDecoration: 'none',
                  }}
                >
                  <div style={{
                    width: '32px', height: '32px',
                    background: 'rgba(43,134,89,0.08)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {opt.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0A0A0A' }}>{opt.label}</div>
                    <div style={{ fontSize: '0.72rem', color: '#888' }}>{opt.desc}</div>
                  </div>
                </Link>
              )
            ))}
          </div>

        
        </div>
      )}

      <style jsx>{`
        .nav-mobile-toggle {
          display: none !important;
        }
        @media (max-width: 768px) {
          .nav-desktop-links {
            display: none !important;
          }
          .nav-desktop-ctas {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  )
}