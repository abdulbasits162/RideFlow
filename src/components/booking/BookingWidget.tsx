'use client'

import { useState, useEffect, useCallback } from 'react'
import { Zap, MapPin, ShieldCheck } from 'lucide-react'
import { RideType, PaymentMethod, FareEstimate } from '@/types'
import RideTypeSelector from './RideTypeSelector'



import Link from 'next/link'
import Image from 'next/image'



export default function BookingWidget() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [distanceKm, setDistanceKm] = useState('5')
  const [durationMin, setDurationMin] = useState('15')
  const [rideType, setRideType] = useState<RideType>('economy')
  const [payment, setPayment] = useState<PaymentMethod>('cash')
  const [fare, setFare] = useState<FareEstimate | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasCalculated, setHasCalculated] = useState(false)

  const calculateFare = useCallback(async (type: RideType) => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/fare-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rideType: type,
          distanceKm: parseFloat(distanceKm),
          durationMin: parseFloat(durationMin),
        }),
      })
      if (!res.ok) throw new Error('Could not calculate fare')
      const data: FareEstimate = await res.json()
      setFare(data)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [distanceKm, durationMin])

  // Auto-recalculate when rideType changes — but only after first estimate
  useEffect(() => {
    if (hasCalculated) {
      calculateFare(rideType)
    }
  }, [rideType, hasCalculated, calculateFare])

  async function handleGetFare() {
    setHasCalculated(true)
    await calculateFare(rideType)
  }

  // --- rest of your file stays EXACTLY the same from here ---
  const inputStyle = {
    width: '100%',
    background: '#333',
    border: '1.5px solid #E5E5E5',
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    color: '#999',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'var(--font-inter), sans-serif',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
    color: '#444',
    marginBottom: '0.4rem',
  }

  return (
    <section
      id="book"
      className="booking-section"
     style={{
        background: '#F7F8F7',
        padding: 'clamp(60px, 10vw, 120px) 5vw',
      }}
    >
      <div
      className="booking-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 6vw, 4rem)',
          alignItems: 'center',
        }}>
      {/* Left */}
      <div style={{ flex: '1 1 280px', maxWidth: '420px', alignContent: 'center' }}>
        <span className="book-tag" style={{
          fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
          fontWeight: 800,
          letterSpacing: '2px',
          textTransform: 'uppercase' as const,
          color: '#2B8659',
        }}>
          Book Online
        </span>

        <h2 className="book-heading" style={{
          marginTop: '1rem',
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 'clamp(2.2rem, 7vw, 4.5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-1px',
          color: '#0A0A0A',
        }}>
          Your ride,<br />in seconds.
        </h2>


        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { icon: <Zap size={20} color="#2B8659" />, text: 'Average match time: 90 seconds' },
            { icon: <MapPin size={20} color="#2B8659" />, text: 'Fare locked at booking — no hidden charges' },
            { icon: <ShieldCheck size={20} color="#2B8659" />, text: 'Every driver verified before their first ride' },
          ].map((item) => (
            <div key={item.text} className="perk-row" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {item.icon}
              <span className="perk-text" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)', color: '#555' }}>{item.text}</span>
            </div>
          ))}
        </div>
         <Link
            href="/books"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#2B8659',
              color: '#fff',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
              padding: 'clamp(1rem, 2vw, 0.95rem) clamp(2rem, 6vw, 5rem)',
              borderRadius: '10px',
              marginTop:'20px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#256E4A')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#2B8659')}
          >
            Book a Ride
          </Link>
      </div>

 <div
          className="fleet-image-wrap"
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(340px, 45vw, 480px)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/fleet-car.jpeg"
            alt="RideFlow fleet vehicle"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>




</div>
      <style jsx>{`
        @media (max-width: 640px) {
          .booking-section {
            justify-content: center !important;
          }
        }
        @media (max-width: 480px) {
          .book-tag {
            font-size: 0.8rem !important;
          }
          .book-heading {
            font-size: 1.9rem !important;
          }
          .perk-text {
            font-size: 0.82rem !important;
          }
        }
      `}</style>
      <style jsx>{`
        @media (max-width: 900px) {
          .booking-grid {
            grid-template-columns: 1fr !important;
          }
          .fleet-image-wrap {
            order: -1;
          }
        }
      `}</style>

    </section>
  )
}