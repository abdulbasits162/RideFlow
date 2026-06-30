export default function AppDownload() {
  return (
    <section id="app" className="py-24 px-6 text-center">
      <div className="max-w-2xl mx-auto">

        <span className="block text-xs font-bold uppercase tracking-widest text-[#34D186] mb-3">
          Get the App
        </span>
        <h2 className="font-black text-3xl md:text-5xl tracking-tight leading-tight mb-4">
          Everything is better in the app.
        </h2>
        <p className="text-gray-500 mb-12 leading-relaxed">
          Real-time tracking, in-ride chat, saved locations, ride history, and SOS — all in one place. Free on Android and iOS.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#"
            className="flex items-center gap-3 bg-[#141414] border border-[#222222] rounded-2xl px-7 py-3.5 min-w-[200px] hover:border-[#34D186] transition-all hover:-translate-y-0.5"
          >
            <span className="text-2xl">🤖</span>
            <div className="text-left">
              <span className="block text-[10px] text-gray-500">Get it on</span>
              <span className="block font-bold text-sm">Google Play</span>
            </div>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 bg-[#141414] border border-[#222222] rounded-2xl px-7 py-3.5 min-w-[200px] hover:border-[#34D186] transition-all hover:-translate-y-0.5"
          >
            <span className="text-2xl">🍎</span>
            <div className="text-left">
              <span className="block text-[10px] text-gray-500">Download on the</span>
              <span className="block font-bold text-sm">App Store</span>
            </div>
          </a>
        </div>

      </div>
    </section>
  )
}