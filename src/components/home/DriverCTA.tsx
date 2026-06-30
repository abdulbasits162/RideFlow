import Link from 'next/link'

const perks = [
  {
    title: 'Weekly Payouts',
    desc: 'Your earnings land in your wallet every week. No delays, no queues.',
  },
  {
    title: 'Full Earnings Transparency',
    desc: 'See every deduction itemised — fare, commission, any promotions. Zero hidden cuts.',
  },
  {
    title: 'You Set Your Hours',
    desc: 'Go online when you want, go offline when you don\'t. No minimum hours.',
  },
]

export default function DriverCTA() {
  return (
    <section id="driver" className="border-t border-b border-[#222222] bg-[#0E0E0E] py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left: copy */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-[#34D186] mb-3">
            For Drivers
          </span>
          <h2 className="font-black text-3xl md:text-5xl tracking-tight leading-tight mb-5">
            The most driver-friendly platform around.
          </h2>
          <p className="text-gray-500 leading-relaxed mb-10 max-w-md">
            RideFlow charges the lowest commission in the market — meaning more in your pocket every single ride.
          </p>

          <div className="flex flex-col gap-6">
            {perks.map((p) => (
              <div key={p.title} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#34D186]/10 border border-[#34D186]/30 flex items-center justify-center text-xs text-[#34D186] flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">{p.title}</h5>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/driver/register"
            className="inline-flex items-center gap-2 bg-[#34D186] text-black font-bold text-sm px-8 py-3.5 rounded-full hover:bg-[#1AAF65] transition-all active:scale-95 mt-10"
          >
            Register as a Driver →
          </Link>
        </div>

        {/* Right: earnings card */}
        <div className="bg-[#141414] border border-[#222222] rounded-2xl p-8">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
            Sample Weekly Earnings
          </h4>

          <div className="flex justify-between items-center py-3.5 border-b border-[#222222]">
            <span className="text-sm text-gray-400">Total Fare Collected</span>
            <span className="font-bold text-sm">PKR 28,500</span>
          </div>
          <div className="flex justify-between items-center py-3.5 border-b border-[#222222]">
            <span className="text-sm text-gray-400">Platform Commission (17%)</span>
            <span className="font-bold text-sm text-red-400">− PKR 4,845</span>
          </div>
          <div className="flex justify-between items-center py-3.5 border-b border-[#222222]">
            <span className="text-sm text-gray-400">Surge Bonus Earned</span>
            <span className="font-bold text-sm text-[#34D186]">+ PKR 1,200</span>
          </div>
          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-300 font-medium">Your Net Earnings</span>
            <span className="font-black text-xl text-[#34D186]">PKR 24,855</span>
          </div>

          <div className="mt-4 bg-[#34D186]/8 rounded-lg p-3.5 text-xs text-gray-500 leading-relaxed">
            Based on ~35 rides/week at average fare PKR 815. Actual earnings vary by city, hours, and ride type.
          </div>
        </div>

      </div>
    </section>
  )
}