'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Book a Ride', href: '/book' },
  { label: 'How It Works', href: '/#how' },
  { label: 'Cities', href: '/cities' },
  { label: 'Safety', href: '/safety' },
  { label: 'Drive with Us', href: '/driver' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222222]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-black text-xl tracking-tight">
          Ride<span className="text-[#34D186]">Flow</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/driver/register"
            className="text-sm font-semibold text-white border border-[#222222] px-5 py-2 rounded-full hover:border-[#34D186] hover:bg-[#34D186]/5 transition-all"
          >
            Become a Driver
          </Link>
          <Link
            href="/book"
            className="text-sm font-semibold bg-[#34D186] text-black px-5 py-2 rounded-full hover:bg-[#1AAF65] transition-all"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-[#222222] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-gray-400 hover:text-white transition-colors py-1"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="text-sm font-semibold bg-[#34D186] text-black px-5 py-3 rounded-full text-center hover:bg-[#1AAF65] transition-all mt-2"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  )
}