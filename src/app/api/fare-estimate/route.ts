import { NextRequest, NextResponse } from 'next/server'
import { FARE_CONFIG, SURGE_MAX } from '@/constants/fare-config'
import type { RideType } from '@/types'

interface FareRequestBody {
  rideType: RideType
  distanceKm: number
  durationMin: number
  surgeMultiplier?: number
}

export async function POST(req: NextRequest) {
  try {
    const body: FareRequestBody = await req.json()
    const { rideType, distanceKm, durationMin, surgeMultiplier = 1.0 } = body

    if (!rideType || !FARE_CONFIG[rideType]) {
      return NextResponse.json({ error: 'Invalid ride type' }, { status: 400 })
    }
    if (typeof distanceKm !== 'number' || typeof durationMin !== 'number') {
      return NextResponse.json({ error: 'distanceKm and durationMin must be numbers' }, { status: 400 })
    }

    const config = FARE_CONFIG[rideType]
    const baseFare = config.baseFare
    const distanceFare = distanceKm * config.perKm
    const timeFare = durationMin * config.perMinute
    const subtotal = baseFare + distanceFare + timeFare

    const clampedSurge = Math.min(surgeMultiplier, SURGE_MAX)
    const withSurge = subtotal * clampedSurge
    const finalFare = Math.round(Math.max(withSurge, config.minFare))

    return NextResponse.json({
      rideType,
      distanceKm,
      durationMin,
      baseFare,
      distanceFare: Math.round(distanceFare),
      timeFare: Math.round(timeFare),
      surgeMultiplier: clampedSurge,
      subtotal: Math.round(subtotal),
      finalFare,
    })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}