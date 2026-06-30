'use client'

import { RideType } from '@/types'
import { FARE_CONFIG } from '@/constants/fare-config'

interface Props {
  value: RideType
  onChange: (type: RideType) => void
}

const rideTypes: RideType[] = ['economy', 'comfort', 'premium']

const descriptions: Record<RideType, string> = {
  economy: 'Affordable, everyday rides',
  comfort: 'Newer cars, more space',
  premium: 'Top-rated drivers, best cars',
}

export default function RideTypeSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {rideTypes.map((type) => {
        const config = FARE_CONFIG[type]
        const active = value === type

        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={`text-left rounded-xl border p-3.5 transition-all ${
              active
                ? 'border-[#34D186] bg-[#34D186]/8'
                : 'border-[#222222] hover:border-[#333333]'
            }`}
          >
            <div className="font-bold text-sm mb-1">{config.label}</div>
            <div className="text-xs text-gray-500 mb-2 leading-snug">
              {descriptions[type]}
            </div>
            <div className="text-xs font-semibold text-[#34D186]">
              From PKR {config.minFare}
            </div>
          </button>
        )
      })}
    </div>
  )
}