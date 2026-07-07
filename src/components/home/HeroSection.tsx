'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const imageRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const imgWrap = imageWrapRef.current
        const imgEl   = imageRef.current
        if (!imgWrap || !imgEl) return

        const scrollY  = window.scrollY
        const vh       = window.innerHeight
        const progress = Math.min(Math.max(scrollY / vh, 0), 1)

        // image rises from bottom → top  (same as before)
        const translateY = (1 - progress) * 100
        imgWrap.style.transform = `translateY(${translateY}%)`

        // zoom: starts at 1.0, grows to 1.18 as user scrolls
        const scale = 1 + progress * 0.18
        imgEl.style.transform = `scale(${scale})`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div style={{ height: '200vh' }}>
        <section
          className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden sticky top-0"
          style={{ padding: '140px 5vw 80px' }}
        >

          {/* YOUR ORIGINAL green glow — unchanged */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 80% 40%, rgba(29,185,84,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(29,185,84,0.06) 0%, transparent 50%)',
            }}
          />

          {/* YOUR ORIGINAL grid overlay — unchanged */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage:
                'linear-gradient(#262626 1px, transparent 1px), linear-gradient(90deg, #262626 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              opacity: 0.3,
              maskImage:
                'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
            }}
          />

          {/* YOUR ORIGINAL content — completely unchanged */}
          <div className="relative z-10" style={{ maxWidth: '680px' }}>
            <div
              className="inline-flex items-center gap-2"
              style={{
                background: 'rgba(29,185,84,0.12)',
                border: '1px solid rgba(29,185,84,0.3)',
                borderRadius: '50px',
                padding: '0.35rem 1rem',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  background: '#1DB954',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#1DB954',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                Now live — Rawalpindi & Islamabad
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '6rem',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-1.5px',
                marginBottom: '1.4rem',
              }}
            >
              Move smarter. <br />
              <span style={{ color: '#1DB954' }}>Ride better.</span>
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: '#B0B0B0',
                maxWidth: '520px',
                marginBottom: '2.5rem',
                lineHeight: 1.7,
              }}
            >
              From daily commutes to airport transfers and intercity travel, RideFlow gets you there safely, comfortably, and on time.
            </p>

            <div className="flex flex-wrap" style={{ gap: '1rem' }}>
              <Link
                href="/book"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#1DB954',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  padding: '0.85rem 2rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
              >
                📍 Book a Ride
              </Link>
              <Link
                href="/driver"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#1DB954',
                  color: 'black',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  padding: '0.85rem 2rem',
                  borderRadius: '50px',
                  border: '1px solid #262626',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
              >
                🚗 Drive with RideFlow
              </Link>
            </div>
          </div>

          {/* IMAGE wrapper — rises on scroll */}
          <div
            ref={imageWrapRef}
            className="absolute inset-0 z-20 will-change-transform pointer-events-none overflow-hidden"
            style={{ transform: 'translateY(100%)' }}
          >
            {/* Inner div — zooms independently of the rise */}
            <div
              ref={imageRef}
              className="absolute inset-0 will-change-transform"
              style={{
                transform: 'scale(1)',
                transformOrigin: 'center center',
              }}
            >
              <Image
                src="/images/hero-bg.jpg.jpg"
                alt="RideFlow driver"
                fill
                priority
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

            {/* Top gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 40%)',
              }}
            />

            {/* Bottom fade */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '30%',
                background: 'linear-gradient(to top, #0A0A0A 0%, transparent 100%)',
              }}
            />
          </div>

        </section>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </>
  )
}