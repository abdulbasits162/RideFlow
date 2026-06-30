const features = [
  {
    icon: '🪪',
    title: 'Verified Driver Identity',
    desc: 'Every driver\'s ID is verified before they can take their first ride. No exceptions.',
  },
  {
    icon: '💳',
    title: 'Local Payment Methods',
    desc: 'Pay with mobile wallets or cash — we support what people already use every day.',
  },
  {
    icon: '📍',
    title: 'Live GPS Tracking',
    desc: 'Your driver\'s location streams live during the ride. Share your trip in one tap.',
  },
  {
    icon: '🆘',
    title: 'One-Tap SOS',
    desc: 'Hit SOS and your location, ride ID, and details go instantly to emergency contacts.',
  },
  {
    icon: '📊',
    title: 'Transparent Fare, Always',
    desc: 'See the full fare before confirming. Surge is shown clearly and capped at 2×.',
  },
  {
    icon: '⭐',
    title: 'Two-Way Rating System',
    desc: 'Drivers and passengers rate each other after every ride, keeping the platform safe.',
  },
]

export default function WhyRideFlow() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <span className="block text-xs font-bold uppercase tracking-widest text-[#34D186] mb-3">
          Why RideFlow
        </span>
        <h2 className="font-black text-3xl md:text-5xl tracking-tight leading-tight mb-4 max-w-xl">
          Safety and fairness, not just speed.
        </h2>
        <p className="text-gray-500 max-w-md mb-16 leading-relaxed">
          Every decision is built around two people: the passenger who needs to feel safe, and the driver who deserves to earn fairly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#141414] border border-[#222222] rounded-2xl p-7 transition-all duration-300 hover:border-[#34D186] hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[#34D186]/10 flex items-center justify-center text-2xl mb-5">
                {f.icon}
              </div>
              <h4 className="font-bold text-base mb-2">
                {f.title}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}