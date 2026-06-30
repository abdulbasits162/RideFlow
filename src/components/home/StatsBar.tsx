const stats = [
  { num: '50M+', desc: 'Urban commuters underserved' },
  { num: '15–18%', desc: 'Commission — lowest in the market' },
  { num: '<90s', desc: 'Average driver match time' },
  { num: '2×', desc: 'Max surge cap — full transparency' },
]

export default function StatsBar() {
  return (
    <section className="border-t border-b border-[#222222] py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.desc} className="text-center">
            <div className="font-black text-3xl md:text-4xl text-[#34D186] mb-2 tracking-tight">
              {s.num}
            </div>
            <div className="text-sm text-gray-500">
              {s.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}