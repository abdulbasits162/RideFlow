import { RideType } from '@/types'

type FareConfigShape = {
  baseFare: number
  perKm: number
  perMinute: number
  minFare: number
  label: string
}

export const FARE_CONFIG: Record<RideType, FareConfigShape> = {
  economy: {
    label: 'Economy',
    baseFare: 150,
    perKm: 45,
    perMinute: 3,
    minFare: 200,
  },
  comfort: {
    label: 'Comfort',
    baseFare: 200,
    perKm: 65,
    perMinute: 5,
    minFare: 300,
  },
  premium: {
    label: 'Premium',
    baseFare: 280,
    perKm: 85,
    perMinute: 7,
    minFare: 400,
  },
}

export const SURGE_MAX = 2.0
export const SURGE_DEFAULT = 1.0