'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const links = [
  { label: 'Book a Ride', href: '#book' },
  { label: 'How It Works', href: '#how' },
  { label: 'Cities', href: '#cities' },
  { label: 'Drive with Us', href: '#driver' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [open, setOpen] = useState(false)
  const lastScrollY = useRef(0)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY

      // Show/hide based on scroll direction
      if (currentY < 50) {
        setVisible(true)
      } else if (currentY > lastScrollY.current) {
        // Scrolling down — hide
        setVisible(false)
        setOpen(false)
      } else {
        // Scrolling up — show
        setVisible(true)
      }

      setScrolled(currentY > 20)
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    setOpen(false)

    if (href.startsWith('#')) {
      const isHome = window.location.pathname === '/'
      if (isHome) {
        const el = document.getElementById(href.replace('#', ''))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push('/')
        setTimeout(() => {
          const el = document.getElementById(href.replace('#', ''))
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 500)
      }
    } else {
      router.push(href)
    }
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5vw',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #262626' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease, background 0.3s, border-color 0.3s',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontWeight: 800,
          fontSize: '1.45rem',
          letterSpacing: '-0.5px',
          color: '#fff',
          textDecoration: 'none',
        }}
      >
        Ride<span style={{ color: '#1DB954' }}>Flow</span>
      </Link>

      {/* Desktop links */}
      <ul
        className="hidden md:flex"
        style={{ gap: '2rem', listStyle: 'none', alignItems: 'center', display: 'flex' }}
      >
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              style={{
                color: '#ccc',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop CTAs */}
      <div
        className="hidden md:flex"
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
      >
        <Link
          href="/driver/register"
          style={{
            fontSize: '0.88rem',
            fontWeight: 600,
            color: '#fff',
            border: '1px solid #262626',
            padding: '0.45rem 1.2rem',
            borderRadius: '50px',
            textDecoration: 'none',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1DB954')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#262626')}
        >
          Become a Driver
        </Link>
        <a
          href="#book"
          onClick={(e) => handleNavClick(e, '#book')}
          style={{
            fontSize: '0.88rem',
            fontWeight: 600,
            color: '#000',
            background: '#1DB954',
            padding: '0.45rem 1.2rem',
            borderRadius: '50px',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#159040')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#1DB954')}
        >
          Book Now
        </a>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          padding: '0.5rem',
        }}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '68px',
            left: 0, right: 0,
            background: '#0A0A0A',
            borderBottom: '1px solid #262626',
            padding: '1rem 5vw',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              style={{
                color: '#ccc',
                textDecoration: 'none',
                fontSize: '0.9rem',
                padding: '0.25rem 0',
                cursor: 'pointer',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={(e) => handleNavClick(e, '#book')}
            style={{
              background: '#1DB954',
              color: '#000',
              fontWeight: 700,
              textAlign: 'center',
              padding: '0.75rem',
              borderRadius: '50px',
              textDecoration: 'none',
              cursor: 'pointer',
              marginTop: '0.5rem',
            }}
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  )
}