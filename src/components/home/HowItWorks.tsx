const steps = [
  {
    num: '1',
    title: 'Set Your Route',
    desc: 'Enter pickup and drop-off. See your upfront fare before you confirm.',
  },
  {
    num: '2',
    title: 'Matched in Seconds',
    desc: 'We find the nearest verified driver. See their name, photo, rating, and plate.',
  },
  {
    num: '3',
    title: 'Track Live',
    desc: 'Watch your driver approach in real time. Share your trip with family.',
  },
  {
    num: '4',
    title: 'Pay & Rate',
    desc: 'Pay with your preferred method. Rate your driver to keep the platform safe.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="border-b border-[#222222] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <span className="block text-xs font-bold uppercase tracking-widest text-[#34D186] mb-3">
          How It Works
        </span>
        <h2 className="font-black text-3xl md:text-5xl tracking-tight leading-tight mb-16 max-w-xl">
          From tap to destination in four steps.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-full bg-[#34D186] text-black font-black flex items-center justify-center mb-5 text-base">
                {step.num}
              </div>
              <h4 className="font-bold text-base mb-2">
                {step.title}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}