const stats = [
  { num: '50M+', desc: 'Urban commuters underserved' },
  { num: '15–18%', desc: 'Lowest commission in the market' },
  { num: '<90s', desc: 'Average driver match time' },
  { num: '2×', desc: 'Max surge cap — always transparent' },
]

export default function StatsBar() {
  return (
    <div
      style={{
        borderTop: '1px solid #262626',
        borderBottom: '1px solid #262626',
        background: '#111111',
        padding: '4rem 5vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap' as const,
        gap: '7.5rem',
      }}
    >
      {stats.map((s) => (
        <div key={s.desc} style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: '#1DB954',
              lineHeight: 1,
              marginBottom: '0.3rem',
            }}
          >
            {s.num}
          </div>
          <div style={{ fontSize: '1rem', color: '#6B6B6B' }}>
            {s.desc}
          </div>
        </div>
      ))}
    </div>
  )
}