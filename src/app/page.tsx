import HeroSection from '@/components/home/HeroSection'
import BookingWidget from '@/components/booking/BookingWidget'
import StatsBar from '@/components/home/StatsBar'
import HowItWorks from '@/components/home/HowItWorks'
import WhyRideFlow from '@/components/home/WhyRideFlow'
import DriverCTA from '@/components/home/DriverCTA'
import CityStrip from '@/components/home/CityStrip'
import AppDownload from '@/components/home/AppDownload'
import FleetSection from '@/components/home/Fleetsection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BookingWidget />
      {/* <StatsBar /> */}
      <WhyRideFlow />
      <HowItWorks />
      <DriverCTA />
      <CityStrip />
      <FleetSection/>
      <AppDownload />
    </>
  )
}