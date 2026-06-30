const cities = [
  { name: 'Rawalpindi', status: 'live', label: 'Live now' },
  { name: 'Islamabad', status: 'live', label: 'Live now' },
  { name: 'Lahore', status: 'soon', label: 'Month 7' },
  { name: 'Faisalabad', status: 'soon', label: 'Month 9' },
  { name: 'Gujranwala', status: 'soon', label: 'Year 2' },
]

export default function CityStrip() {
  return (
    <section id="cities" className="bg-[#0E0E0E] border-b border-[#222222] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <span className="block text-xs font-bold uppercase tracking-widest text-[#34D186] mb-3">
          Coverage
        </span>
        <h2 className="font-black text-3xl md:text-5xl tracking-tight leading-tight mb-4">
          Where we operate.
        </h2>
        <p className="text-gray-500 max-w-md mb-14 leading-relaxed">
          Starting in the twin cities, then expanding across the country.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {cities.map((c) => (
            <div
              key={c.name}
              className={`bg-[#141414] border rounded-2xl p-6 text-center ${
                c.status === 'live' ? 'border-[#34D186]' : 'border-[#222222]'
              }`}
            >
              <div className="font-bold text-base mb-2">{c.name}</div>
              <div
                className={`text-xs font-semibold ${
                  c.status === 'live' ? 'text-[#34D186]' : 'text-gray-500'
                }`}
              >
                {c.status === 'live' ? '🟢' : '⏳'} {c.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}