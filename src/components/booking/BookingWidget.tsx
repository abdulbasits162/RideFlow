'use client'

import { useState } from 'react'
import { Zap, MapPin, ShieldCheck } from "lucide-react";

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

  async function handleGetFare() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/fare-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rideType,
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
  }

  const inputStyle = {
    width: '100%',
    background: '#F0F2F1',
    border: '1px solid #262626',
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    color: 'black',
    fontSize: '0.9rem',
    outline: 'none',  
    fontFamily: 'var(--font-inter), sans-serif',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
    color: '#444',
    marginBottom: '0.4rem',
  }

  return (
    
    <section
      id="book"

      style={{
        background:'#eee',
        padding: '110px 10vw',
        borderBottom: '1px solid #262626',
        display: 'flex',
        justifyContent: 'space-evenly'
        
      }}
    >
 <div className="flex flex-col">
      {/* Section Label */}
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-500">
        Book Online
      </span>

      {/* Title */}
      <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-gray-950">
        Your ride,
        <br />
        in seconds.
      </h2>

      {/* Description */}
      <p className="mt-6 text-gray-900 leading-7 max-w-lg">
        Set your pickup, choose your destination, and we'll match you with the
        nearest verified driver in under 2 minutes. Fare shown upfront — no
        surprises.
      </p>
<br />
      {/* Features */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex items-center gap-3 text-sm text-gray-800">
          <Zap size={18} className="text-green-500" />
          <span>Average match time: 90 seconds</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-800">
          <MapPin size={18} className="text-green-500" />
          <span>Fare locked at booking — no hidden charges</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-800">
          <ShieldCheck size={18} className="text-green-500" />
          <span>Every driver NADRA-checked before their first ride</span>
        </div>
      </div>
    </div>

      <div
        style={{
          background: '#fff',
          // border: '1px solid #262626',
          borderRadius: '14px',
          padding: '1rem',
          
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '1.4rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            color:'black'
          }}
        >
          Book a Ride
        </h3>

        {/* Pickup */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Pickup Location</label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="e.g. Saddar, Rawalpindi"
            style={inputStyle}
          />
        </div>
<br />
        {/* Dropoff */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Drop-off Location</label>
          <input
            type="text"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            placeholder="e.g. Centaurus Mall, Islamabad"
            style={inputStyle}
          />
        </div>

       
<br />  
        {/* Ride Type */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Ride Type</label>
          <RideTypeSelector value={rideType} onChange={setRideType} />
        </div>
        {/* Payment */}
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={labelStyle}>Payment</label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {(['cash', 'wallet'] as PaymentMethod[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setPayment(m)}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  borderRadius: '10px',
                  border: `1px solid ${payment === m ? 'black' : '#999'}`,
                  background: payment === m ? '#85D3A1' : '#fff',
                  color: payment === m ? '#111' : '#444',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                {m === 'cash' ? 'Cash' : 'Mobile Wallet'}
              </button>
            ))}
          </div>
        </div>
<br />
        {/* Fare result */}
        {fare && (
          <div
            style={{
              background: 'rgba(29,185,84,0.08)',
              border: '1px solid rgba(29,185,84,0.2)',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1.2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', color: '#888' }}>Estimated Fare</div>
              <div style={{ fontSize: '0.72rem', color: '#555', marginTop: '2px' }}>
                {fare.distanceKm} km · {fare.durationMin} min
              </div>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 800,
                fontSize: '1.6rem',
                color: '#1DB954',
              }}
            >
              PKR {fare.finalFare}
            </div>
          </div>
        )}

        {error && (
          <p style={{ fontSize: '0.8rem', color: '#e05', marginBottom: '1rem' }}>{error}</p>
        )}

        {/* CTA */}
        <button
          type="button"
          onClick={handleGetFare}
          disabled={loading || !pickup || !dropoff}
          style={{
            width: '100%',
            background: '#1DB954',
            color: '#000',
            border: 'none',
            borderRadius: '50px',
            padding: '0.9rem',
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'background 0.2s',
            opacity: loading || !pickup || !dropoff ? 0.5 : 1,
          }}
        >
          {loading ? 'Calculating...' : fare ? 'Confirm Booking' : 'Get Fare Estimate'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#555', marginTop: '0.75rem' }}>
          Fare is locked at booking — no hidden charges.
        </p>
      </div>
    </section>
  )
}