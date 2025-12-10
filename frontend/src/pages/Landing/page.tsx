import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroSection from "@/components/landing/hero-section"
import AboutSection from "@/components/landing/about-section"
import HowItWorksSection from "@/components/landing/how-it-works-section"
import StatsSection from "@/components/landing/stats-section"
import TestimonialsSection from "@/components/landing/testimonials-section"
import FAQSection from "@/components/landing/faq-section"
import CTASection from "@/components/landing/cta-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
