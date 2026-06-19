import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useLandingAnimations } from '../../hooks/useLandingAnimations'
import { useSmoothScroll, stripHashFromUrl } from '../../hooks/useSmoothScroll'
import { HeroSection } from '../../components/landing/HeroSection'
import WaitlistProvider from '../../components/landing/WaitlistProvider'
import ProblemSection from '../../components/landing/ProblemSection'
import FeaturesBento from '../../components/landing/FeaturesBento'
import BookInAppSection from '../../components/landing/BookInAppSection'
import HowItWorksSection from '../../components/landing/HowItWorksSection'
import GalleryMarquee from '../../components/landing/GalleryMarquee'
import FAQSection from '../../components/landing/FAQSection'
import FinalCTA from '../../components/landing/FinalCTA'
import FooterSection from '../../components/landing/FooterSection'
import BackToTopButton from '../../components/landing/BackToTopButton'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function LandingPage() {
  const smoothWrapperRef = useRef(null)
  const smoothContentRef = useRef(null)

  useLandingAnimations()
  useSmoothScroll(smoothWrapperRef, smoothContentRef)

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    stripHashFromUrl()
    window.scrollTo(0, 0)
    ScrollSmoother.get()?.scrollTop(0)

    if (window.matchMedia('(max-width: 1023px)').matches) {
      document.documentElement.scrollTop = 0
    }
  }, [])

  useEffect(() => {
    ScrollTrigger.refresh()

    return () => {
      ScrollSmoother.get()?.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <WaitlistProvider>
      <div id="smooth-wrapper" ref={smoothWrapperRef}>
        <div id="smooth-content" ref={smoothContentRef}>
          <main className="bg-bg-primary">
            <HeroSection />
            <ProblemSection />
            <FeaturesBento />
            <BookInAppSection />
            <HowItWorksSection />
            <GalleryMarquee />
            <FAQSection />
            <FinalCTA />
            <FooterSection />
          </main>
        </div>
      </div>
      <BackToTopButton />
    </WaitlistProvider>
  )
}
