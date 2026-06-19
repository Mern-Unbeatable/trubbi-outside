import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ctaPhone } from '../../assets/landing'
import { SCROLL_REVEAL_ONCE } from '../../hooks/useLandingAnimations'
import WaitlistButton from './WaitlistButton'
import { Container } from '../ui/primitives'

gsap.registerPlugin(ScrollTrigger)

/** Figma 831:7649 — fixed 449×455 frame, inner image crop */
function CtaPhoneFrame({ className = '' }) {
  return (
    <div
      className={`cta-phone-media relative h-[455px] w-[449px] shrink-0 overflow-hidden ${className}`}
    >
      <img
        src={ctaPhone}
        alt="Trubbi app on iPhone home screen"
        loading="lazy"
        className="absolute bottom-0 left-[-35.42%] h-[89.07%] w-[135.42%] max-w-none"
      />
    </div>
  )
}

export default function FinalCTA() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.cta-copy', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          ...SCROLL_REVEAL_ONCE,
        },
        x: -40,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power3.out',
      })

      gsap.from('.cta-phone-media', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          ...SCROLL_REVEAL_ONCE,
        },
        y: 28,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="bg-bg-primary py-16 lg:py-24">
      <Container>
        {/* Figma 831:7636 — Top Content */}
        <div
          id="final-cta-panel"
          className="relative mx-auto flex w-full max-w-[1280px] flex-col items-start gap-2.5 overflow-hidden rounded-[24px] bg-[#013c4a] px-4 pt-6 pb-0 md:max-lg:pb-0 lg:min-h-[510px] lg:flex-row lg:items-stretch lg:gap-0 lg:p-0"
        >
          <div className="cta-copy relative z-10 flex w-full flex-col gap-8 max-lg:max-w-[321px] lg:w-[54%] lg:max-w-[700px] lg:shrink-0 lg:px-[60px] lg:py-[60px]">
            <div className="flex flex-col gap-5 lg:gap-6">
              <span
                className="text-[32px] leading-none lg:text-[52px]"
                aria-hidden
              >
                ✈️
              </span>

              <h2 className="text-[32px] font-bold capitalize leading-[1.15] tracking-[-1.04px] text-white md:max-w-[560px] lg:max-w-none lg:text-[48px] lg:leading-[62.4px]">
                Stop planning trips across five different apps
              </h2>

              <p className="max-w-[301px] text-base font-normal leading-normal text-[#e7e7e7]/80 max-md:pl-2.5 md:max-w-[520px] lg:max-w-[478px] lg:pl-0 lg:text-xl lg:font-medium">
                Join the waitlist and be first to try a better way to plan
                together.
              </p>
            </div>

            <div className="flex items-center">
              <WaitlistButton variant="cta" className="h-12 px-[17px] text-[14.6px]" />
            </div>
          </div>

          {/* Mobile — Figma 831:7649: 449×455, left-aligned, bleeds right */}
          <CtaPhoneFrame className="md:hidden" />

          {/* Tablet — same frame, scaled to panel width */}
          <div className="hidden origin-bottom-left md:block md:max-lg:-ml-4 md:max-lg:scale-[1.693] lg:hidden">
            <CtaPhoneFrame />
          </div>

          {/* Desktop */}
          <div className="cta-phone-media relative hidden min-h-[510px] w-full overflow-hidden lg:block lg:flex-1">
            <img
              src={ctaPhone}
              alt=""
              loading="lazy"
              className="absolute left-[-20%] top-0 h-full w-[120%] max-w-none object-cover object-top"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
