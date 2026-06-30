import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RideFlow Pakistan — Safe. Local. Yours.',
  description: 'Pakistan\'s safety-first ride-hailing platform. Verified drivers, transparent fares, local payments.',
  keywords: 'ride hailing pakistan, taxi rawalpindi, taxi islamabad, cab booking pakistan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#141414',
              color: '#fff',
              border: '1px solid #222222',
            },
          }}
        />
      </body>
    </html>
  )
}