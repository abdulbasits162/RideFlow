import Link from 'next/link'

const footerLinks = {
  Passengers: [
    { label: 'Book a Ride', href: '/book' },
    { label: 'How It Works', href: '/#how' },
    { label: 'Safety Features', href: '/safety' },
    { label: 'Download App', href: '/#app' },
  ],
  Drivers: [
    { label: 'Drive with RideFlow', href: '/driver' },
    { label: 'Register as Driver', href: '/driver/register' },
    { label: 'Earnings', href: '/driver#earnings' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Cities', href: '/cities' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

const socials = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'X', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#222222] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-black text-2xl tracking-tight">
              Ride<span className="text-[#34D186]">Flow</span>
            </Link>
            <p className="text-sm text-[#6B6B6B] mt-3 leading-relaxed max-w-xs">
              Pakistan&apos;s safety-first, driver-fair ride-hailing platform.
              Starting in Rawalpindi &amp; Islamabad.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#6B6B6B] mb-4">
                {title}
              </h5>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#222222] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#6B6B6B]">
            © 2026 RideFlow Pakistan. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs text-[#6B6B6B] hover:text-[#34D186] transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}