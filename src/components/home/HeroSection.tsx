'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start px-6 pt-24 pb-20 overflow-hidden">

      {/* Background glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 80% 40%, rgba(52,209,134,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(52,209,134,0.06) 0%, transparent 50%)',
        }}
      />
<h1>YO YO YOOOOOO</h1>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(#222222 1px, transparent 1px), linear-gradient(90deg, #222222 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto md:mx-0">

        <div className="inline-flex items-center gap-2 bg-[#34D186]/10 border border-[#34D186]/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34D186] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#34D186]">
            Now live — Rawalpindi &amp; Islamabad
          </span>
        </div>

        <h1 className="font-black text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
          Pakistan&apos;s<br />
          ride-hailing,<br />
          <span className="text-[#34D186]">done right.</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
          Verified drivers. Local payment methods. Transparent fares.
          Built in Pakistan, for Pakistan.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#34D186] text-black font-bold text-sm px-8 py-3.5 rounded-full hover:bg-[#1AAF65] transition-all active:scale-95"
          >
            Book a Ride
          </Link>
          <Link
            href="/driver"
            className="inline-flex items-center gap-2 bg-transparent text-white font-semibold text-sm px-8 py-3.5 rounded-full border border-[#222222] hover:border-[#34D186] hover:bg-[#34D186]/5 transition-all"
          >
            Drive with RideFlow
          </Link>
        </div>
      </div>
    </section>
  )
}