'use client'

import { RideType } from '@/types'
import { FARE_CONFIG } from '@/constants/fare-config'

interface Props {
  value: RideType
  onChange: (type: RideType) => void
}

const rideTypes: RideType[] = ['economy', 'comfort', 'premium']



const descriptions: Record<RideType, string> = {
  economy: 'Affordable everyday rides',
  comfort: 'Newer cars, more space',
  premium: 'Top-rated drivers & cars',
}

export default function RideTypeSelector({ value, onChange }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
      {rideTypes.map((type) => {
        const config = FARE_CONFIG[type]
        const active = value === type

        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            style={{
              background: active ? 'rgba(29,185,84,0.08)' : '#0A0A0A',
              border: `1px solid ${active ? '#1DB954' : '#262626'}`,
              borderRadius: '12px',
              padding: '1rem 0.75rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontWeight: 700,
                fontSize: '0.88rem',
                color: active ? '#1DB954' : '#fff',
              }}
            >
              {config.label}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.4 }}>
              {descriptions[type]}
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#1DB954',
                marginTop: '0.2rem',
              }}
            >
              From PKR {config.minFare}
            </span>
          </button>
        )
      })}
    </div>
  )
}