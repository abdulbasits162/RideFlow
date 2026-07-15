'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const imgWrap = imageWrapRef.current
        const imgEl = imageRef.current
        if (!imgWrap || !imgEl) return

        const scrollY = window.scrollY
        const vh = window.innerHeight
        const progress = Math.min(Math.max(scrollY / vh, 0), 1)

        // image rises from bottom → top  (same as before)
        const translateY = 70 - (progress * 70)
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
          style={{ padding: 'clamp(90px, 12vw, 140px) 5vw clamp(50px, 8vw, 80px) ', background: 'white' }}
        >

          {/* YOUR ORIGINAL green glow — unchanged */}




          {/* YOUR ORIGINAL content — completely unchanged */}
          <div className="relative z-10" style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'clamp(-200px, -9vw, -190px)' }}>
            {/* <div
              className="inline-flex items-center gap-2 "
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
                  background: '#2B8659',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#2B8659',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                Now live — Rawalpindi & Islamabad
              </span>
            </div> */}

            <h1
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-1.5px',
                marginBottom: 'clamp(1rem, 2vw, 1.4rem)',
                color: 'black'
              }}
            >
              Move smarter.
              <span style={{ color: '#2B8659' }}>Ride better.</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.2rem, 1.5vw, 2rem)',
                color: '#333',
                maxWidth: '720px',
                marginBottom: 'clamp(1.75rem, 3vw, 2.5rem)',
                lineHeight: 1.7,
                padding: '0 1rem',
              }}
            >
              From daily commutes to airport transfers and intercity travel, RideFlow gets you there safely, comfortably, and on time.
            </p>

            <div className="flex flex-wrap" style={{ gap: 'clamp(0.6rem, 1.5vw, 1rem)', justifyContent: 'center' }}>
              <Link
                href="/books"
                style={{
                  width: '250px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: '#2B8659',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
                  padding: 'clamp(0.7rem, 1.5vw, 0.85rem) clamp(1.4rem, 3vw, 2rem)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}

                onMouseEnter={(e) => (e.currentTarget.style.background = '#34A16A')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#2B8659')}
              >
                📍Book a Ride
              </Link>
              <Link
                href="/driver/register"
                style={{
                  width: '250px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: '#2B8659',
                  color: 'black',
                  fontWeight: 700,
                  fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
                  padding: 'clamp(0.7rem, 1.5vw, 0.85rem) clamp(1.4rem, 3vw, 2rem)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: '#eee'

                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#E1E1E1')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#eee')}

              >
                🚗 Drive with RideFlow
              </Link>
            </div>
          </div>

          {/* IMAGE wrapper — rises on scroll */}
          <div
            ref={imageWrapRef}
            className="absolute inset-0 z-20 will-change-transform pointer-events-none overflow-hidden hero-image-wrap"
            style={{ transform: 'translateY(60%)' }}
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
                className="hero-driver-img"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>



          </div>

        </section>
      </div>

      <style>{`
        @keyframes pulse {
          // 0%, 100% { opacity: 1; transform: scale(1); }
          // 50% { opacity: 0.4; transform: scale(1.4); }
        }

        /* Mobile: keep image's original aspect ratio instead of cropping it */
        @media (max-width: 768px) {
          .hero-driver-img {
            object-fit: contain !important;
          }
          .hero-image-wrap {
            background: transparent;
          }
        }
      `}</style>
    </>
  )
}