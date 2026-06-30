'use client'

import { useState } from 'react'
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

  return (
    <div className="bg-[#141414] border border-[#222222] rounded-2xl p-7 max-w-md w-full">
      <h3 className="font-bold text-lg mb-5">Book a Ride</h3>

      <div className="flex flex-col gap-4 mb-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Pickup Location
          </label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="e.g. Saddar"
            className="w-full bg-black border border-[#222222] rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#34D186] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Drop-off Location
          </label>
          <input
            type="text"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            placeholder="e.g. Centaurus Mall"
            className="w-full bg-black border border-[#222222] rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#34D186] transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Distance (km)
            </label>
            <input
              type="number"
              value={distanceKm}
              onChange={(e) => setDistanceKm(e.target.value)}
              min="0"
              step="0.1"
              className="w-full bg-black border border-[#222222] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#34D186] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Duration (min)
            </label>
            <input
              type="number"
              value={durationMin}
              onChange={(e) => setDurationMin(e.target.value)}
              min="0"
              className="w-full bg-black border border-[#222222] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#34D186] transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">
          Ride Type
        </label>
        <RideTypeSelector value={rideType} onChange={setRideType} />
      </div>

      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">
          Payment
        </label>
        <div className="flex gap-2">
          {(['cash', 'wallet'] as PaymentMethod[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setPayment(m)}
              className={`flex-1 text-sm font-medium rounded-xl py-2.5 border transition-all ${
                payment === m
                  ? 'border-[#34D186] bg-[#34D186]/8 text-[#34D186]'
                  : 'border-[#222222] text-gray-400 hover:border-[#333333]'
              }`}
            >
              {m === 'cash' ? 'Cash' : 'Mobile Wallet'}
            </button>
          ))}
        </div>
      </div>

      {fare && (
        <div className="bg-[#34D186]/8 border border-[#34D186]/20 rounded-xl p-4 mb-5 flex justify-between items-center">
          <div>
            <div className="text-xs text-gray-500">Estimated Fare</div>
            <div className="text-[10px] text-gray-600 mt-0.5">
              {fare.distanceKm} km · {fare.durationMin} min
            </div>
          </div>
          <div className="font-black text-2xl text-[#34D186]">
            PKR {fare.finalFare}
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 mb-4">{error}</p>
      )}

      <button
        type="button"
        onClick={handleGetFare}
        disabled={loading || !pickup || !dropoff}
        className="w-full bg-[#34D186] text-black font-bold text-sm py-3.5 rounded-full hover:bg-[#1AAF65] transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
      >
        {loading ? 'Calculating...' : fare ? 'Confirm Booking' : 'Get Fare Estimate'}
      </button>
    </div>
  )
}