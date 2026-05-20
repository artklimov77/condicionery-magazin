import Hero from '@/components/home/Hero'
import BrandCarousel from '@/components/home/BrandCarousel'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import HowItWorks from '@/components/home/HowItWorks'
import WhyUs from '@/components/home/WhyUs'
import QuizTeaser from '@/components/home/QuizTeaser'
import GuideBanner from '@/components/home/GuideBanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandCarousel />
      <FeaturedProducts />
      <HowItWorks />
      <WhyUs />
      <QuizTeaser />
      <GuideBanner />
    </>
  )
}
