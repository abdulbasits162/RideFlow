'use client'

import { useState, useEffect, useCallback } from 'react'
import { Zap, MapPin, ShieldCheck } from 'lucide-react'
import { RideType, PaymentMethod, FareEstimate } from '@/types'
import RideTypeSelector from './RideTypeSelector'

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
    background: '#1A1A1A',
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
    color: '#999',
    marginBottom: '0.4rem',
  }

  return (
    <section
      id="book"
      style={{
        background: '#ffffff',
        padding: '90px 10vw',
        borderBottom: '1px solid #EFEFEF',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap' as const,
        gap: '3rem',
      }}
    >
      {/* Left */}
      <div style={{ flex: '1 1 280px', maxWidth: '420px',alignContent:'center' }}>
        <span style={{
          fontSize: '1rem',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase' as const,
          color: '#1DB954',
        }}>
          Book Online
        </span>

        <h2 style={{
          marginTop: '1rem',
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-1px',
          color: '#0A0A0A',
        }}>
          Your ride,<br />in seconds.
        </h2>


        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { icon: <Zap size={20} color="#1DB954" />, text: 'Average match time: 90 seconds' },
            { icon: <MapPin size={20} color="#1DB954" />, text: 'Fare locked at booking — no hidden charges' },
            { icon: <ShieldCheck size={20} color="#1DB954" />, text: 'Every driver verified before their first ride' },
          ].map((item) => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {item.icon}
              <span style={{ fontSize: '1.3rem', color: '#555' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: form */}
      <div style={{
        flex: '1 1 320px',
        maxWidth: '460px',
        background: '#0A0A0A',
        border: '1px solid #222',
        borderRadius: '16px',
        padding: '2rem',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '1.3rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: '#fff',
        }}>
          Book a Ride
        </h3>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ ...labelStyle, color: '#999' }}>Pickup Location</label>
          <input
            type="text" value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="e.g. Saddar, Rawalpindi"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#1DB954')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ ...labelStyle, color: '#999' }}>Drop-off Location</label>
          <input
            type="text" value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            placeholder="e.g. Centaurus Mall, Islamabad"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#1DB954')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ ...labelStyle, color: '#999' }}>Ride Type</label>
          <RideTypeSelector value={rideType} onChange={setRideType} />
        </div>

        {fare && (
          <div style={{
            background: 'rgba(29,185,84,0.08)',
            border: '1px solid rgba(29,185,84,0.3)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'white' }}>Estimated Fare</div>
              <div style={{ fontSize: '0.72rem', color: '#999', marginTop: '2px' }}>
                {fare.distanceKm} km · {fare.durationMin} min
              </div>
            </div>
            <div style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 800,
              fontSize: '1.8rem',
              color: loading ? '#555' : '#1DB954',
              transition: 'color 0.2s',
            }}>
              {loading ? '...' : `PKR ${fare.finalFare}`}
            </div>
          </div>
        )}

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ ...labelStyle, color: '#999' }}>Payment</label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {(['cash', 'wallet'] as PaymentMethod[]).map((m) => (
              <button
                key={m} type="button" onClick={() => setPayment(m)}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: `1.5px solid ${payment === m ? '#1DB954' : '#E5E5E5'}`,
                  background: payment === m ? 'rgba(29,185,84,0.08)' : '#1A1A1A',
                  color: payment === m ? '#1DB954' : '#666',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter), sans-serif',
                  transition: 'all 0.2s',
                }}
              >
                {m === 'cash' ? '💵 Cash' : '📱 Mobile Wallet'}
              </button>
            ))}
          </div>
        </div>

        {error && <p style={{ fontSize: '0.8rem', color: '#ff4444', marginBottom: '1rem' }}>{error}</p>}

        <button
          type="button" onClick={handleGetFare}
          disabled={loading || !pickup || !dropoff}
          style={{
            width: '100%',
            background: loading || !pickup || !dropoff ? '#1a1a1a' : '#1DB954',
            color: loading || !pickup || !dropoff ? '#444' : '#000',
            border: `1px solid ${loading || !pickup || !dropoff ? '#333' : '#1DB954'}`,
            borderRadius: '50px',
            padding: '0.95rem',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: loading || !pickup || !dropoff ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'Calculating...' : fare ? '✓ Confirm Booking' : 'Get Fare Estimate'}
        </button>

        <p style={{ textAlign: 'center' as const, fontSize: '0.9rem', color: '#555', marginTop: '0.75rem' }}>
          Fare is locked at booking — no hidden charges.
        </p>
      </div>
    </section>
  )
}