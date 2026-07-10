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
        height: 'clamp(52px, 9vw, 68px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(1rem, 6vw, 5vw)',
        background: 'white' ,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #eee' : 'none',
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
          fontSize: 'clamp(1rem, 4vw, 1.45rem)',
          letterSpacing: '-0.5px',
          color: 'black',
          textDecoration: 'none',
        }}
      >
        Ride<span style={{ color: '#2B8659' }}>Flow</span>
      </Link>

      {/* Desktop links — hidden below 768px via CSS class */}
      <ul
        className="nav-desktop-links"
        style={{ gap: 'clamp(0.75rem, 3vw, 2rem)', listStyle: 'none', alignItems: 'center', display: 'flex' }}
      >
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              style={{
                color: 'black',
                textDecoration: 'none',
                fontSize: 'clamp(0.7rem, 1.4vw, 0.9rem)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#444')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'black')}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop CTAs — hidden below 768px via CSS class */}
      <div
        className="nav-desktop-ctas"
        style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.4rem, 1.5vw, 0.75rem)' }}
      >
        {/* Become a Driver — hidden below 1024px via CSS class */}
        <Link
          href="/driver/register"
          className="nav-become-driver"
          style={{
            fontSize: 'clamp(0.68rem, 1.3vw, 0.88rem)',
            fontWeight: 600,
            color: 'black',
            border: '1px solid #262626',
            padding: 'clamp(0.3rem, 1.2vw, 0.45rem) clamp(0.6rem, 2.5vw, 1.2rem)',
            borderRadius: '50px',
            textDecoration: 'none',
            transition: 'border-color 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#262626')}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#E1E1E1')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
        >
          Become a Driver
        </Link>
        <a
          href="#book"
          onClick={(e) => handleNavClick(e, '#book')}
          style={{
            fontSize: 'clamp(0.68rem, 1.3vw, 0.88rem)',
            fontWeight: 600,
            color: '#fff',
            background: '#2B8659',
            padding: 'clamp(0.3rem, 1.2vw, 0.45rem) clamp(0.6rem, 2.5vw, 1.2rem)',
            borderRadius: '50px',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#34A16A')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#2B8659')}
        >
          Book Now
        </a>
      </div>

      {/* Mobile toggle — shown below 768px via CSS class */}
      <button
        className="nav-mobile-toggle"
        onClick={() => setOpen(!open)}
        style={{
          background: '#444',
          border: 'none',
          borderRadius:'10px',
          color: '#fff',
          cursor: 'pointer',
          padding: 'clamp(0.3rem, 1.5vw, 0.5rem)',
        }}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'clamp(52px, 9vw, 68px)',
            left: 0, right: 0,
            background: '#444',
            borderBottom: '1px solid #262626',
            padding: 'clamp(0.6rem, 4vw, 1rem) clamp(1rem, 6vw, 5vw)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.6rem, 3vw, 1rem)',
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              style={{
                color: '#eee',
                textDecoration: 'none',
                fontSize: 'clamp(0.75rem, 3.5vw, 0.9rem)',
                padding: 'clamp(0.15rem, 1vw, 0.25rem) 0',
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
              background: '#2B8659',
              color: '#000',
              fontWeight: 700,
              textAlign: 'center',
              padding: 'clamp(0.5rem, 3vw, 0.75rem)',
              borderRadius: '50px',
              textDecoration: 'none',
              cursor: 'pointer',
              marginTop: '0.5rem',
              fontSize: 'clamp(0.8rem, 3.5vw, 0.95rem)',
            }}
          >
            Book Now
          </a>
        </div>
      )}

      <style jsx>{`
        .nav-mobile-toggle {
          display: none;
        }

        /* Below 1024px: hide "Become a Driver" button only */
        @media (max-width: 1024px) {
          .nav-become-driver {
            display: none;
          }
        }

        /* Below 768px: hide desktop links + CTAs, show hamburger */
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