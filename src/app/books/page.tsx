'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, Shield, Star } from 'lucide-react'
import { RideType, PaymentMethod, FareEstimate } from '@/types'
import RideTypeSelector from '@/components/booking/RideTypeSelector'

export default function BookPage() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [distanceKm, setDistanceKm] = useState('5')
  const [durationMin, setDurationMin] = useState('15')
  const [rideType, setRideType] = useState<RideType>('economy')
  const [payment, setPayment] = useState<PaymentMethod>('cash')
  const [fare, setFare] = useState<FareEstimate | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [booked, setBooked] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [hasCalculated, setHasCalculated] = useState(false)

  const calculateFare = useCallback(async (type: RideType) => {
    setLoading(true)
    setError('')
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
      if (!res.ok) throw new Error('Failed')
      const data: FareEstimate = await res.json()
      setFare(data)
    } catch {
      setError('Could not calculate fare. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [distanceKm, durationMin])

  async function handleGetFare() {
    if (!pickup || !dropoff) {
      setError('Please enter pickup and drop-off locations.')
      return
    }
    setHasCalculated(true)
    await calculateFare(rideType)
  }

  async function handleRideTypeChange(type: RideType) {
    setRideType(type)
    if (hasCalculated) await calculateFare(type)
  }

  async function handleConfirmBooking() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickup: { address: pickup },
          dropoff: { address: dropoff },
          rideType,
          payment,
          fare,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setBookingId(data.booking.id)
      setBooked(true)
    } catch {
      setError('Booking failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: '#F7F7F7',
    border: '1.5px solid #E5E5E5',
    borderRadius: '10px',
    padding: '0.85rem 1rem 0.85rem 2.75rem',
    color: '#111',
    fontSize: '0.92rem',
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

  // Booking confirmed screen
  if (booked) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1.25rem, 5vw, 2rem)',
      }}>
        <div style={{ textAlign: 'center', maxWidth: '440px' }}>
          <div style={{
            width: 'clamp(70px, 12vw, 90px)', height: 'clamp(70px, 12vw, 90px)',
            background: 'rgba(43,134,89,0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: 'clamp(1.9rem, 5vw, 2.5rem)',
          }}>
            🚗
          </div>
          <h1 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: 800,
            color: '#0A0A0A',
            marginBottom: '0.75rem',
          }}>
            Ride Confirmed!
          </h1>
          <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
            We&apos;re finding the nearest verified driver. You&apos;ll be matched in under 90 seconds.
          </p>

          <div style={{
            background: '#F7FFF9',
            border: '1px solid #C5E8D4',
            borderRadius: '14px',
            padding: 'clamp(1rem, 3vw, 1.25rem) clamp(1.1rem, 3vw, 1.5rem)',
            marginBottom: '1.5rem',
            textAlign: 'left' as const,
          }}>
            <div style={{ fontSize: '0.72rem', color: '#888', marginBottom: '0.25rem', textTransform: 'uppercase' as const, letterSpacing: '1px' }}>
              Booking ID
            </div>
            <div style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 800,
              fontSize: '0.95rem',
              color: '#2B8659',
              letterSpacing: '0.5px',
            }}>
              {bookingId.slice(0, 8).toUpperCase()}
            </div>
          </div>

          <div
            className="confirm-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              marginBottom: '2rem',
            }}
          >
            {[
              { icon: '📍', label: 'From', value: pickup },
              { icon: '🏁', label: 'To', value: dropoff },
              { icon: '🚗', label: 'Ride Type', value: rideType.charAt(0).toUpperCase() + rideType.slice(1) },
              { icon: '💰', label: 'Fare', value: `PKR ${fare?.finalFare}` },
            ].map((item) => (
              <div key={item.label} style={{
                background: '#F9F9F9',
                borderRadius: '10px',
                padding: '0.85rem',
                textAlign: 'left' as const,
              }}>
                <div style={{ fontSize: '0.7rem', color: '#aaa', marginBottom: '0.2rem' }}>{item.label}</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111', wordBreak: 'break-word' as const }}>
                  {item.icon} {item.value}
                </div>
              </div>
            ))}
          </div>

          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#0A0A0A',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.92rem',
            padding: '0.85rem 2rem',
            borderRadius: '50px',
            textDecoration: 'none',
          }}>
            Back to Home
          </Link>
        </div>

        <style jsx>{`
          @media (max-width: 420px) {
            .confirm-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>

      {/* Header */}
      <div
        className="book-header"
        style={{
          background: '#eee',
          padding: 'clamp(80px, 14vw, 100px) 5vw clamp(35px, 6vw, 50px)',
          paddingLeft: 'clamp(1.25rem, 15vw, 220px)',
        }}
      >
        <Link href="/" style={{

          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#333',
          textDecoration: 'none',
          fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
          marginBottom: '1.5rem',
        }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          fontWeight: 800,
          color: '#000',
          letterSpacing: '-1px',
          marginBottom: '0.5rem',
          lineHeight: 1.1,
        }}>
          Book your ride.
        </h1>
        <p style={{ color: '#333', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
          Fare shown upfront. Verified driver. No surprises.
        </p>
      </div>

      {/* Main content */}
      <div
        className="booking-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(1.75rem, 5vw, 3rem) clamp(1rem, 4vw, 1.5rem) clamp(3rem, 8vw, 5rem)',
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: 'clamp(1.75rem, 5vw, 3rem)',
          alignItems: 'start',
        }}
      >
        {/* Left: form */}
        <div>

          {/* Locations */}
          <div style={{
            background: '#fff',
            border: '1px solid #EFEFEF',
            borderRadius: '16px',
            padding: 'clamp(1.25rem, 4vw, 1.75rem)',
            marginBottom: '1.25rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(0.92rem, 2vw, 1rem)',
              color: '#0A0A0A',
              marginBottom: '1.25rem',
            }}>
              Where are you going?
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Pickup Location</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} color="#2B8659" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="e.g. Saddar, Rawalpindi"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Drop-off Location</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} color="#e53e3e" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="e.g. Centaurus Mall, Islamabad"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={labelStyle}>Distance (km)</label>
                  <input
                    type="number"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(e.target.value)}
                    min="0" step="0.1"
                    style={{ ...inputStyle, paddingLeft: '1rem' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Duration (min)</label>
                  <input
                    type="number"
                    value={durationMin}
                    onChange={(e) => setDurationMin(e.target.value)}
                    min="0"
                    style={{ ...inputStyle, paddingLeft: '1rem' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2B8659')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ride type */}
          <div style={{
            background: '#fff',
            border: '1px solid #EFEFEF',
            borderRadius: '16px',
            padding: 'clamp(1.25rem, 4vw, 1.75rem)',
            marginBottom: '1.25rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(0.92rem, 2vw, 1rem)',
              color: '#0A0A0A',
              marginBottom: '1.25rem',
            }}>
              Choose ride type
            </h3>
            <RideTypeSelector value={rideType} onChange={handleRideTypeChange} />
          </div>

          {/* Payment */}
          <div style={{
            background: '#fff',
            border: '1px solid #EFEFEF',
            borderRadius: '16px',
            padding: 'clamp(1.25rem, 4vw, 1.75rem)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(0.92rem, 2vw, 1rem)',
              color: '#0A0A0A',
              marginBottom: '1.25rem',
            }}>
              Payment method
            </h3>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {(['cash', 'wallet'] as PaymentMethod[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPayment(m)}
                  style={{
                    flex: 1,
                    padding: 'clamp(0.7rem, 2.5vw, 0.85rem)',
                    borderRadius: '10px',
                    border: `1.5px solid ${payment === m ? '#2B8659' : '#E5E5E5'}`,
                    background: payment === m ? 'rgba(43,134,89,0.06)' : '#F7F7F7',
                    color: payment === m ? '#2B8659' : '#666',
                    fontSize: 'clamp(0.78rem, 2vw, 0.88rem)',
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
        </div>

        {/* Right: fare summary + CTA */}
        <div className="fare-sidebar" style={{ position: 'sticky', top: '90px' }}>

          {/* Fare card */}
          <div style={{
            background: '#444',
            borderRadius: '20px',
            padding: 'clamp(1.4rem, 4vw, 2rem)',
            marginBottom: '1rem',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              color: '#fff',
              marginBottom: '1.5rem',
            }}>
              Fare Summary
            </h3>

            {fare ? (
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid #1a1a1a',
                  fontSize: '0.85rem',
                }}>
                  <span style={{ color: '#eee' }}>Base fare</span>
                  <span style={{ color: '#fff' }}>PKR {fare.baseFare}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid #1a1a1a',
                  fontSize: '0.85rem',
                }}>
                  <span style={{ color: '#eee' }}>Distance fare</span>
                  <span style={{ color: '#fff' }}>PKR {fare.distanceFare}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid #1a1a1a',
                  fontSize: '0.85rem',
                }}>
                  <span style={{ color: '#eee' }}>Time fare</span>
                  <span style={{ color: '#fff' }}>PKR {fare.timeFare}</span>
                </div>
                {fare.surgeMultiplier > 1 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0',
                    borderBottom: '1px solid #1a1a1a',
                    fontSize: '0.85rem',
                  }}>
                    <span style={{ color: '#f59e0b' }}>Surge ({fare.surgeMultiplier}×)</span>
                    <span style={{ color: '#f59e0b' }}>Active</span>
                  </div>
                )}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  marginTop: '0.5rem',
                  flexWrap: 'wrap' as const,
                  gap: '0.5rem',
                }}>
                  <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#fff' }}>Total</span>
                  <span style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    color: '#2B8659',
                  }}>
                    {loading ? '...' : `PKR ${fare.finalFare}`}
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' as const, padding: '1.5rem 0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
                <p style={{ fontSize: '0.9rem', color: '#eee', lineHeight: 1.6 }}>
                  Enter your locations and click &quot;Get Fare Estimate&quot; to see the price.
                </p>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: '#FFF5F5',
              border: '1px solid #FED7D7',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              fontSize: '0.83rem',
              color: '#e53e3e',
              marginBottom: '1rem',
            }}>
              {error}
            </div>
          )}

          {/* CTA buttons */}
          {!fare ? (
            <button
              type="button"
              onClick={handleGetFare}
              disabled={loading}
              style={{
                width: '100%',
                background: '#2B8659',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                padding: 'clamp(0.85rem, 2.5vw, 1rem)',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Calculating...' : 'Get Fare Estimate →'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirmBooking}
              disabled={loading}
              style={{
                width: '100%',
                background: '#2B8659',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                padding: 'clamp(0.85rem, 2.5vw, 1rem)',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Confirming...' : '✓ Confirm Booking'}
            </button>
          )}

          <p style={{
            textAlign: 'center' as const,
            fontSize: '0.75rem',
            color: '#bbb',
            marginTop: '0.75rem',
          }}>
            Fare locked at booking — no hidden charges
          </p>

          {/* Trust badges */}
          <div style={{
            marginTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}>
            {[
              { icon: <Shield size={14} color="#2B8659" />, text: 'NADRA-verified drivers only' },
              { icon: <Clock size={14} color="#2B8659" />, text: 'Average match time under 90 seconds' },
              { icon: <Star size={14} color="#2B8659" />, text: '4.8 average driver rating' },
            ].map((item) => (
              <div key={item.text} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.78rem',
                color: '#888',
              }}>
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .booking-grid {
            grid-template-columns: 1fr !important;
          }
          .fare-sidebar {
            position: static !important;
            top: auto !important;
          }
        }
      `}</style>
    </div>
  )
}