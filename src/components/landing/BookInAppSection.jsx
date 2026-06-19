import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  bookActivity,
  bookArrow,
  bookCheck,
  bookFlight,
  bookHotel,
  bookLocation,
} from '../../assets/landing'
import { bookDeals, bookFeatures } from '../../data/landingContent'
import { SectionBadge } from '../ui/primitives'

gsap.registerPlugin(ScrollTrigger)

const dealImages = {
  bookHotel,
  bookFlight,
  bookActivity,
}

function DealCard({ deal, className = '', compact = false }) {
  const showLocationIcon = deal.showLocationIcon !== false

  if (compact) {
    return (
      <article
        className={`book-card flex h-[57px] w-[199px] shrink-0 items-start gap-[7px] overflow-hidden rounded-[9px] bg-white p-[4.5px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] ${className}`}
      >
        <div className="h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[7px]">
          <img
            src={dealImages[deal.imageKey]}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative flex h-[48px] min-w-0 flex-1 flex-col justify-between pb-[2px]">
          <div className="relative shrink-0 pr-[18px]">
            <h3 className="text-[9px] font-bold leading-[13px] text-text-primary">
              {deal.title}
            </h3>
            <p className="line-clamp-2 max-w-[115px] text-[7px] font-medium leading-[9px] text-text-secondary">
              {deal.description}
            </p>
            <span className="absolute right-0 top-[30px] inline-flex rounded-[4.5px] bg-brand-secondary p-[3px]">
              <img src={bookArrow} alt="" className="h-[11px] w-[11px]" />
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-[2px]">
            {showLocationIcon && (
              <img src={bookLocation} alt="" className="h-[9px] w-[9px] shrink-0" />
            )}
            <p className="truncate text-[7px] font-medium leading-[9px] text-text-secondary">
              {deal.location}
            </p>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      className={`book-card flex h-[101px] w-full gap-3 rounded-2xl bg-white p-2 shadow-[0_1px_1px_rgba(0,0,0,0.05)] lg:w-[353px] ${className}`}
    >
      <div className="h-[85px] w-[85px] shrink-0 overflow-hidden rounded-xl">
        <img
          src={dealImages[deal.imageKey]}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative flex h-[85px] min-w-0 flex-1 flex-col justify-between pb-1">
        <div className="relative h-[56px] shrink-0">
          <h3 className="text-base font-bold leading-normal text-text-primary">
            {deal.title}
          </h3>
          <p className="max-w-[234px] text-xs font-medium leading-normal text-text-secondary">
            {deal.description}
          </p>
          <span className="absolute left-[210.66px] top-[53px] inline-flex rounded-lg bg-brand-secondary p-1.5">
            <img src={bookArrow} alt="" className="h-5 w-5" />
          </span>
        </div>

        <div className="flex items-center gap-1">
          {showLocationIcon && (
            <img src={bookLocation} alt="" className="h-4 w-4 shrink-0" />
          )}
          <p className="text-xs font-medium leading-normal text-text-secondary">
            {deal.location}
          </p>
        </div>
      </div>
    </article>
  )
}

export default function BookInAppSection() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1440px)', () => {
        gsap.from('.book-desktop .book-card', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          x: 60,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
        })

        const comingSoonBlocks = gsap.utils.toArray('.book-desktop .coming-soon-text')
        comingSoonBlocks.forEach((block) => {
          const lines = block.querySelectorAll('.coming-soon-line')
          let floatTween

          const entrance = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 62%',
              toggleActions: 'play none none reverse',
              onLeaveBack: () => floatTween?.kill(),
            },
          })

          entrance
            .from(block, {
              scale: 0.88,
              autoAlpha: 0,
              rotation: -5,
              transformOrigin: 'left center',
              duration: 0.85,
              ease: 'power3.out',
            })
            .from(
              lines,
              {
                y: 32,
                autoAlpha: 0,
                rotation: 8,
                transformOrigin: 'left center',
                duration: 0.75,
                stagger: 0.2,
                ease: 'back.out(1.7)',
              },
              '-=0.5',
            )
            .from(
              block,
              {
                filter: 'blur(6px)',
                duration: 0.6,
                ease: 'power2.out',
              },
              '-=0.65',
            )

          entrance.eventCallback('onComplete', () => {
            floatTween?.kill()
            floatTween = gsap.to(block, {
              y: '+=10',
              duration: 2.6,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
          })

          entrance.eventCallback('onReverseComplete', () => {
            floatTween?.kill()
            gsap.set(block, { clearProps: 'y,filter' })
          })
        })
      })

      mm.add('(max-width: 1439px)', () => {
        const mobileCards = gsap.utils.toArray('.book-mobile-cluster .book-card')
        mobileCards.forEach((card, index) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
            },
            x: index === 1 ? 28 : -28,
            y: 20,
            autoAlpha: 0,
            duration: 0.65,
            delay: index * 0.12,
            ease: 'power3.out',
          })
        })

        gsap.from('.book-mobile-cluster .book-watermark', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
          },
          autoAlpha: 0,
          scale: 0.9,
          duration: 0.75,
          stagger: 0.18,
          ease: 'power3.out',
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="bg-bg-primary py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:max-w-[760px] md:px-8 lg:max-w-[1440px] lg:px-20">
        {/* Desktop — Figma frame 953:4005 (1280 × 437) */}
        <div className="book-desktop relative mx-auto hidden w-full max-w-[1280px] min-[1440px]:block min-[1440px]:h-[437px]">
          <div className="absolute left-[3px] top-0">
            <SectionBadge variant="red">Coming Soon</SectionBadge>
          </div>

          <h2 className="absolute left-[3px] top-[54px] w-[370px] text-[48px] font-bold capitalize leading-normal tracking-[-0.8px] text-text-primary">
            Book Everything in app
          </h2>

          <ul className="absolute left-0 top-[293.5px] flex w-[550px] flex-col gap-4">
            {bookFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5">
                <img src={bookCheck} alt="" className="h-5 w-5 shrink-0" />
                <span className="text-base font-normal text-text-primary">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <DealCard deal={bookDeals[0]} className="absolute left-[913px] top-[29px]" />
          <DealCard deal={bookDeals[1]} className="absolute left-[778px] top-[170px]" />
          <DealCard deal={bookDeals[2]} className="absolute left-[560px] top-[311px]" />

          <div className="pointer-events-none absolute left-[991px] top-[359px] -translate-y-1/2">
            <div className="coming-soon-text font-sarina text-[61.3px] leading-none text-text-muted">
              <p className="coming-soon-line mb-0">Coming</p>
              <p className="coming-soon-line">Soon</p>
            </div>
          </div>
        </div>

        {/* Mobile / tablet — Figma 817:5741 + 970:5082 */}
        <div className="mx-auto w-full max-w-[353px] md:max-w-[760px] min-[1440px]:hidden">
          <div className="flex flex-col items-center gap-3 text-center">
            <SectionBadge variant="red">Coming Soon</SectionBadge>
            <h2 className="w-[253px] max-w-full text-[32px] font-bold capitalize leading-none tracking-[-0.8px] text-text-primary max-[359px]:text-[28px] max-[359px]:tracking-[-0.7px] md:w-full md:max-w-[560px]">
              <span className="block">Book Everything</span>
              <span className="block">In App</span>
            </h2>
            <p className="w-[301px] max-w-full text-base leading-normal text-text-secondary max-[359px]:text-[14px] max-[359px]:leading-5 md:w-full md:max-w-[680px]">
              Book flights, stays and activities directly inside Trubbi with
              everything automatically synced to your itenary
            </p>
          </div>

          <ul className="mx-auto mt-[18px] flex w-[284px] max-w-full flex-col gap-3 md:w-full md:max-w-[560px]">
            {bookFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5">
                <img src={bookCheck} alt="" className="h-5 w-5 shrink-0" />
                <span className="text-sm font-normal leading-normal text-text-primary max-[359px]:text-[14px]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Figma group 970:5082 — 327×195, scaled on 320px */}
          <div className="relative mx-auto mt-8 h-[167px] w-full max-[359px]:max-w-[280px] min-[360px]:h-[195px] min-[360px]:max-w-[327px] md:h-[420px] md:max-w-[706px]">
            <div className="book-mobile-cluster absolute left-1/2 top-0 h-[195px] w-[327px] -translate-x-1/2 origin-top max-[359px]:scale-[0.856] min-[360px]:scale-100 md:scale-[2.15]">
              <p
                className="book-watermark pointer-events-none absolute left-[10px] top-[84px] z-0 font-sarina text-[22px] leading-none text-text-muted"
                aria-hidden
              >
                Coming
              </p>
              <p
                className="book-watermark pointer-events-none absolute left-[241px] top-[153px] z-0 font-sarina text-[22px] leading-none text-text-muted"
                aria-hidden
              >
                Soon
              </p>

              <DealCard
                deal={bookDeals[0]}
                compact
                className="absolute left-[9px] top-0 z-10"
              />
              <DealCard
                deal={bookDeals[1]}
                compact
                className="absolute left-[128px] top-[69px] z-10"
              />
              <DealCard
                deal={bookDeals[2]}
                compact
                className="absolute left-0 top-[138px] z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
