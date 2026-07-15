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
    <div className="ride-type-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(0.35rem, 2vw, 0.75rem)' }}>
      {rideTypes.map((type) => {
        const config = FARE_CONFIG[type]
        const active = value === type

        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className="ride-type-card"
            style={{
              background: active ? 'rgba(29,185,84,0.12)' : '#444',
              border: `1px solid ${active ? '#1DB954' : '#2A2A2A'}`,
              borderRadius: '12px',
              padding: 'clamp(0.5rem, 3vw, 1rem) clamp(0.35rem, 2vw, 0.75rem)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.2rem, 1vw, 0.4rem)',
              boxShadow: active ? '0 0 0 1px rgba(29,185,84,0.25)' : 'none',
            }}
          >
            <span
              className="ride-type-label"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(0.62rem, 2.2vw, 0.88rem)',
                color: active ? '#1DB954' : '#E5E5E5',
              }}
            >
              {config.label}
            </span>
            <span className="ride-type-desc" style={{ fontSize: 'clamp(0.52rem, 1.9vw, 0.8rem)', color: active ? '#C9C9C9' : '#888', lineHeight: 1.4 }}>
              {descriptions[type]}
            </span>
            <span
              className="ride-type-price"
              style={{
                fontSize: 'clamp(0.52rem, 1.9vw, 0.8rem)',
                fontWeight: 600,
                color: active ? '#1DB954' : '#666',
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