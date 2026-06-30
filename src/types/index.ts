export type RideType = 'economy' | 'comfort' | 'premium'
export type PaymentMethod = 'wallet' | 'cash'
export type CityStatus = 'live' | 'soon'

export interface Location {
  address: string
  lat: number
  lng: number
}

export interface FareEstimate {
  rideType: RideType
  distanceKm: number
  durationMin: number
  baseFare: number
  distanceFare: number
  timeFare: number
  surgeMultiplier: number
  subtotal: number
  finalFare: number
}

export interface Booking {
  id: string
  pickup: Location
  dropoff: Location
  rideType: RideType
  payment: PaymentMethod
  fare: FareEstimate
  status: 'pending' | 'matched' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: string
}

export interface City {
  name: string
  slug: string
  status: CityStatus
  label: string
}

export interface DriverRegistration {
  fullName: string
  phone: string
  cnic: string
  vehicleMake: string
  vehicleModel: string
  city: string
  payoutNumber: string
}