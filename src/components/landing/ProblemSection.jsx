import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  problemChat,
  problemPlan,
  problemTools,
  problemGroup,
} from '../../assets/landing'
import { problemCards } from '../../data/landingContent'
import { Container, SectionHeading } from '../ui/primitives'

gsap.registerPlugin(ScrollTrigger)

const imageMap = {
  problemChat,
  problemPlan,
  problemTools,
  problemGroup,
}

const mobileImageClass = {
  problemChat:
    'h-[68px] w-[68px] min-[360px]:h-[127px] min-[360px]:w-[127px]',
  problemPlan:
    'h-[48px] w-[68px] min-[360px]:h-[82px] min-[360px]:w-[118px]',
  problemTools:
    'h-[68px] w-[68px] min-[360px]:h-[127px] min-[360px]:w-[127px]',
  problemGroup:
    'h-[54px] w-[68px] min-[360px]:h-[99px] min-[360px]:w-[127px]',
}

/* Figma 793:5497 — bottom-row frames are rotate-180 in file; coords below are visual (un-flipped). */
const desktopCardConfig = {
  problemChat: {
    shell: 'lg:h-[265px]',
    layout: 'bottom-text',
    title:
      'lg:absolute lg:left-[41px] lg:top-[156px] lg:-translate-y-1/2 lg:whitespace-nowrap',
    description:
      'lg:absolute lg:left-[41px] lg:top-[203px] lg:-translate-y-1/2 lg:mt-0 lg:w-[311px]',
    image:
      'lg:absolute lg:left-[293px] lg:top-[-49px] lg:h-[381px] lg:w-[381px] lg:max-w-none lg:object-cover lg:object-center',
  },
  problemPlan: {
    shell: 'lg:h-[265px]',
    layout: 'bottom-text',
    title:
      'lg:absolute lg:left-[41px] lg:top-[156px] lg:-translate-y-1/2 lg:whitespace-nowrap',
    description:
      'lg:absolute lg:left-[41px] lg:top-[203px] lg:-translate-y-1/2 lg:mt-0 lg:w-[311px]',
    image:
      'lg:absolute lg:left-[292px] lg:top-[16px] lg:h-[234px] lg:w-[363px] lg:max-w-none lg:object-contain lg:object-bottom',
  },
  problemTools: {
    shell: 'lg:h-[212px]',
    layout: 'center-text',
    title: 'lg:whitespace-nowrap',
    description: 'lg:mt-3 lg:w-[311px]',
    image:
      'lg:absolute lg:right-[3px] lg:top-[-21px] lg:h-[265px] lg:w-[265px] lg:max-w-none lg:object-cover lg:object-center',
  },
  problemGroup: {
    shell: 'lg:h-[212px]',
    layout: 'center-text',
    title: 'lg:whitespace-nowrap',
    description: 'lg:mt-3 lg:w-[311px]',
    image:
      'lg:absolute lg:right-[-106px] lg:top-[11px] lg:h-[185px] lg:w-[236px] lg:max-w-none lg:object-contain lg:object-bottom',
  },
}

function ProblemCard({ card, className = '' }) {
  const titleWrapsOnMobile = card.imageKey === 'problemGroup'
  const desktop = desktopCardConfig[card.imageKey]

  return (
    <article
      className={`problem-card overflow-hidden rounded-3xl bg-bg-secondary shadow-[0_0_5px_1px_rgba(0,0,0,0.09)] ${desktop.shell} ${className}`}
    >
      {/* Mobile */}
      <div className="flex items-center gap-2 p-4 lg:hidden">
        <div className="relative z-10 min-w-0 flex-1">
          <h3
            className={`text-[15px] font-medium capitalize leading-tight text-text-primary min-[360px]:text-xl min-[360px]:leading-[27px] ${
              titleWrapsOnMobile
                ? 'max-[359px]:max-w-[168px] max-[359px]:whitespace-normal'
                : 'max-lg:whitespace-nowrap'
            }`}
          >
            {card.title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-[18px] text-text-secondary min-[360px]:text-sm min-[360px]:leading-[19px]">
            {card.description}
          </p>
        </div>
        <img
          src={imageMap[card.imageKey]}
          alt=""
          loading="lazy"
          className={`ml-auto shrink-0 object-contain object-center ${mobileImageClass[card.imageKey]}`}
        />
      </div>

      {/* Desktop — Figma 696:4448–696:4450 (visual coords) */}
      <div className="relative hidden size-full lg:block">
        {desktop.layout === 'center-text' ? (
          <div className="relative z-10 flex h-full flex-col justify-center pl-[41px] pr-[250px]">
            <h3
              className={`text-[30px] font-medium capitalize leading-normal text-text-primary ${desktop.title}`}
            >
              {card.title}
            </h3>
            <p
              className={`text-base leading-normal text-text-secondary ${desktop.description}`}
            >
              {card.description}
            </p>
          </div>
        ) : (
          <>
            <h3
              className={`text-[30px] font-medium capitalize leading-normal text-text-primary ${desktop.title}`}
            >
              {card.title}
            </h3>
            <p
              className={`text-base leading-normal text-text-secondary ${desktop.description}`}
            >
              {card.description}
            </p>
          </>
        )}
        <img
          src={imageMap[card.imageKey]}
          alt=""
          loading="lazy"
          className={`pointer-events-none ${desktop.image}`}
        />
      </div>
    </article>
  )
}

export default function ProblemSection() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.problem-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 48,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="problem" className="bg-bg-primary pb-16 pt-[34px] lg:py-24">
      <Container>
        <SectionHeading
          className="lg:gap-[11px] lg:[&_h2]:max-w-[686px] lg:[&_h2]:whitespace-nowrap lg:[&_p]:max-w-[619px] lg:[&_p]:text-xl"
          badge="Problem"
          title="Trip planning gets messy fast"
          subtitle="Ideas end up scattered across chats, screenshots, saved posts, and notes and no one really knows what the plan is."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:mt-[68px] lg:flex lg:flex-col lg:gap-[34px]">
          <div className="contents lg:grid lg:grid-cols-[620fr_627fr] lg:gap-[34px]">
            <ProblemCard card={problemCards[0]} />
            <ProblemCard card={problemCards[1]} />
          </div>
          <div className="contents lg:grid lg:grid-cols-[652fr_595fr] lg:gap-[34px]">
            <ProblemCard card={problemCards[2]} />
            <ProblemCard card={problemCards[3]} />
          </div>
        </div>
      </Container>
    </section>
  )
}
