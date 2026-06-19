import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  stepCalendar,
  stepGraphicInvite,
  stepGraphicItinerary,
  stepGraphicVibe,
  stepLaCard,
  stepParisCard,
} from '../../assets/landing'
import { howItWorksSteps } from '../../data/landingContent'
import { SCROLL_REVEAL_ONCE } from '../../hooks/useLandingAnimations'
import { Container, SectionHeading } from '../ui/primitives'

gsap.registerPlugin(ScrollTrigger)

const vibeTagsMobile = [
  { label: 'Relaxation', className: 'left-0 top-0' },
  { label: 'Culture', className: 'left-[44.57%] top-[17.35%]' },
  { label: 'Food', className: 'left-[16.76%] top-[41.43%]' },
  { label: 'Adventure', className: 'left-[73.03%] top-[45.88%]' },
  { label: 'Photography', className: 'left-[62%] top-[79.76%]' },
]

const vibeTagsDesktop = [
  { label: 'Relaxation', className: 'left-0 top-0' },
  { label: 'Culture', className: 'left-[44.6%] top-[17.4%]' },
  { label: 'Food', className: 'left-[16.8%] top-[41.4%]' },
  { label: 'Adventure', className: 'left-[73.1%] top-[45.9%]' },
  { label: 'Photography', className: 'left-[62%] top-[79.8%]' },
]

const stepMeta = {
  stepDestination: {
    titleClass: 'font-medium',
    descriptionClass: 'lg:max-w-[76%]',
  },
  stepInvite: {
    titleClass: 'font-medium',
    descriptionClass: 'lg:max-w-none lg:pr-[5%]',
  },
  stepVibe: {
    titleClass: 'font-bold',
    descriptionClass: 'lg:max-w-[73%]',
  },
  stepItinerary: {
    titleClass: 'font-medium',
    descriptionClass: 'lg:max-w-none lg:pr-[11%]',
  },
}

function StepDestinationMedia({ mobile = false }) {
  if (mobile) {
    return (
      <div className="relative mx-auto h-[233px] w-[232px]">
        <img
          src={stepLaCard}
          alt=""
          loading="lazy"
          className="step-image pointer-events-none absolute left-0 top-0 w-[119px] max-w-none"
        />
        <div className="pointer-events-none absolute left-[31px] top-[40px] w-[176px]">
          <img
            src={stepCalendar}
            alt=""
            loading="lazy"
            className="step-image block w-full max-w-none"
          />
        </div>
        <img
          src={stepParisCard}
          alt=""
          loading="lazy"
          className="step-image pointer-events-none absolute bottom-0 right-0 w-[65px] max-w-none"
        />
      </div>
    )
  }

  return (
    <>
      <img
        src={stepLaCard}
        alt=""
        loading="lazy"
        className="step-image pointer-events-none absolute left-[2.6%] top-[42.7%] z-10 w-[47.3%] max-w-none"
      />
      <div className="pointer-events-none absolute left-[15%] top-[51.6%] w-[70%]">
        <img
          src={stepCalendar}
          alt=""
          loading="lazy"
          className="step-image block w-full max-w-none"
        />
      </div>
      <img
        src={stepParisCard}
        alt=""
        loading="lazy"
        className="step-image pointer-events-none absolute left-[68.9%] top-[88.5%] z-10 w-[25.8%] max-w-none"
      />
    </>
  )
}

function StepInviteMedia({ mobile = false }) {
  if (mobile) {
    return (
      <img
        src={stepGraphicInvite}
        alt=""
        loading="lazy"
        className="step-image pointer-events-none block h-[296px] w-[112%] max-w-none -translate-x-[4.5%] object-cover object-top"
      />
    )
  }

  return (
    <div className="pointer-events-none absolute left-[-17.5%] top-[40.7%] h-[59.3%] w-[135%] overflow-hidden">
      <img
        src={stepGraphicInvite}
        alt=""
        loading="lazy"
        className="step-image size-full object-cover object-top"
      />
    </div>
  )
}

function StepVibeMedia({ mobile = false }) {
  const tags = mobile ? vibeTagsMobile : vibeTagsDesktop

  if (mobile) {
    return (
      <>
        <div className="pointer-events-none absolute left-[11.05%] top-0 z-10 h-[42.27%] w-[64.46%]">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className={`absolute inline-flex items-center whitespace-nowrap rounded-full bg-[#f5efe7] px-[11.7px] py-[7px] text-[8px] font-medium leading-none text-text-secondary shadow-[0_0_1.2px_rgba(0,0,0,0.1)] ${tag.className}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <img
          src={stepGraphicVibe}
          alt=""
          loading="lazy"
          className="step-image pointer-events-none absolute left-[-31.97%] top-[16.41%] z-0 h-[148.45%] w-[163.94%] max-w-none object-cover"
        />
      </>
    )
  }

  return (
    <>
      <div className="pointer-events-none absolute left-[10.3%] top-[41.2%] z-10 h-[22.6%] w-[71.1%]">
        {tags.map((tag) => (
          <span
            key={tag.label}
            className={`absolute inline-flex items-center rounded-full bg-[#f5efe7] px-[12px] py-[7px] text-[8px] font-medium leading-none text-text-secondary shadow-[0_0_1.2px_rgba(0,0,0,0.1)] lg:text-[8px] ${tag.className}`}
          >
            {tag.label}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute left-[-37.1%] top-[50%] h-[79.4%] w-[180.9%] overflow-hidden">
        <img
          src={stepGraphicVibe}
          alt=""
          loading="lazy"
          className="step-image size-full object-cover object-bottom"
        />
      </div>
    </>
  )
}

function StepItineraryMedia({ mobile = false }) {
  if (mobile) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-28.18%] top-[25%] flex h-full w-[176.07%] items-center justify-center md:max-lg:top-[12%]">
          <div className="rotate-[27.17deg] origin-center max-[360px]:scale-[0.78] md:max-lg:scale-[1]">
            <img
              src={stepGraphicItinerary}
              alt=""
              loading="lazy"
              className="step-image block h-[378px] w-[504px] max-w-none object-cover md:max-lg:h-[400px] md:max-lg:w-[534px]"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute left-[-61.1%] top-[26.3%] h-[119%] w-[223.1%]">
      <div className="absolute left-1/2 top-1/2 h-[66.74%] w-[81.16%] -translate-x-1/2 -translate-y-1/2 rotate-[27.17deg] overflow-hidden">
        <img
          src={stepGraphicItinerary}
          alt=""
          loading="lazy"
          className="step-image size-full object-cover"
        />
      </div>
    </div>
  )
}

const mobileStepLayout = {
  stepDestination: {
    shell: 'pb-[41px]',
    textMediaGap: 'gap-8',
    media: 'h-[233px]',
  },
  stepInvite: {
    shell: 'pb-0',
    textMediaGap: 'gap-2',
    media: 'h-[296px]',
  },
  stepVibe: {
    layout: 'vibe-stack',
    shell: 'pb-0',
    labelGap: 'mt-8',
    copyGap: 'gap-[15.9px]',
    mediaGap: 'mt-[13.7px]',
  },
  stepItinerary: {
    shell: 'pb-0',
    textMediaGap: 'gap-0',
    copyClass: 'relative z-10',
    media:
      'relative -mx-7 -mt-[81px] z-0 h-[320px] w-[calc(100%+3.5rem)] shrink-0 overflow-hidden md:max-lg:-mt-[52px] md:max-lg:h-[400px]',
  },
}

const stepMediaComponents = {
  stepDestination: StepDestinationMedia,
  stepInvite: StepInviteMedia,
  stepVibe: StepVibeMedia,
  stepItinerary: StepItineraryMedia,
}

function StepCard({ step, index, total }) {
  const isFirst = index === 0
  const isLast = index === total - 1
  const meta = stepMeta[step.imageKey]
  const mobileLayout = mobileStepLayout[step.imageKey]
  const Media = stepMediaComponents[step.imageKey]

  return (
    <article
      className={`step-card relative w-full shrink-0 overflow-hidden bg-white max-md:border-b max-md:border-border-subtle max-md:last:border-b-0 md:max-lg:border-border-subtle md:max-lg:[&:nth-child(-n+2)]:border-b md:max-lg:[&:nth-child(3)]:border-b-0 md:max-lg:[&:nth-child(4)]:border-b-0 md:max-lg:[&:nth-child(odd)]:border-r md:max-lg:[&:nth-child(odd)]:border-border-subtle lg:mx-0 lg:h-[547px] lg:w-[320px] lg:max-w-none lg:border-b-0 lg:border-r lg:border-border-subtle lg:last:border-r-0 ${
        isFirst ? 'lg:rounded-none lg:rounded-tl-3xl' : ''
      } ${isLast ? 'lg:rounded-none lg:rounded-br-3xl' : ''}`}
      data-step={index}
    >
      {!isFirst && (
        <span
          aria-hidden
          className="step-divider absolute left-0 top-0 hidden h-full w-px origin-top bg-border-subtle lg:block"
        />
      )}

      {/* Mobile — Figma 828:5798 per-step spacing */}
      {mobileLayout.layout === 'vibe-stack' ? (
        <div className={`flex flex-col px-7 pt-10 lg:hidden ${mobileLayout.shell ?? ''}`}>
          <p className="step-label text-xs font-medium leading-4 text-text-secondary">
            {step.step}
          </p>

          <div
            className={`step-copy flex flex-col ${mobileLayout.labelGap ?? 'mt-8'} ${mobileLayout.copyGap ?? 'gap-[15.9px]'}`}
          >
            <h3
              className={`max-w-[246px] text-xl font-bold leading-[27px] text-text-primary ${meta.titleClass}`}
            >
              {step.title}
            </h3>
            <p className="max-w-[233px] text-sm font-normal leading-[19px] text-text-secondary">
              {step.description}
            </p>
          </div>

          <div className="step-media relative -mx-7 mt-[13.7px] aspect-[353/292] w-[calc(100%+3.5rem)] shrink-0 overflow-hidden">
            <Media mobile />
          </div>
        </div>
      ) : mobileLayout.layout === 'absolute' ? (
        <div
          className={`relative overflow-hidden lg:hidden ${mobileLayout.shell ?? 'aspect-[353/475] w-full'}`}
        >
          <p className="step-label absolute left-[7.93%] top-[8.42%] text-xs font-medium leading-4 text-text-secondary">
            {step.step}
          </p>

          <h3
            className={`step-copy absolute left-[7.93%] top-[18.53%] z-20 max-w-[69.7%] text-[18px] font-bold leading-[27px] tracking-[-0.2px] text-text-primary min-[353px]:text-[20px] ${meta.titleClass}`}
          >
            {step.title}
          </h3>
          <p className="step-copy absolute left-[7.93%] top-[27.56%] z-20 max-w-[65.9%] text-[14px] font-normal leading-[19px] text-text-secondary">
            {step.description}
          </p>

          <Media mobile />
        </div>
      ) : (
        <div
          className={`flex flex-col gap-8 px-7 pt-10 lg:hidden ${mobileLayout.shell}`}
        >
          <p className="step-label text-xs font-medium leading-4 text-text-secondary">
            {step.step}
          </p>

          <div className={`flex flex-col ${mobileLayout.textMediaGap}`}>
            <div className={`step-copy flex flex-col gap-4 ${mobileLayout.copyClass ?? ''}`}>
              <h3
                className={`text-xl font-medium leading-[27px] text-text-primary ${meta.titleClass}`}
              >
                {step.title}
              </h3>
              <p className="max-w-[242px] text-sm font-normal leading-[19px] text-text-secondary">
                {step.description}
              </p>
            </div>

            <div
              className={`step-media relative w-full shrink-0 overflow-hidden ${mobileLayout.media}`}
            >
              <Media mobile />
            </div>
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="relative hidden min-h-0 lg:absolute lg:inset-0 lg:block">
        <p className="step-label absolute left-[8.75%] top-[9.05%] -translate-y-1/2 text-sm font-normal text-text-secondary">
          {step.step}
        </p>

        <div className="step-copy absolute left-[8.75%] right-[8.75%] top-[16.6%] z-20 flex flex-col gap-[2.9%]">
          <h3
            className={`text-[22px] font-medium leading-snug text-text-primary ${meta.titleClass}`}
          >
            {step.title}
          </h3>
          <p
            className={`text-base leading-normal text-text-secondary ${meta.descriptionClass}`}
          >
            {step.description}
          </p>
        </div>

        <Media />
      </div>
    </article>
  )
}

export default function HowItWorksSection() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const cards = gsap.utils.toArray('.step-card')
      const mm = gsap.matchMedia()

      const buildEntrance = (headingSelector) => {
        const entrance = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            ...SCROLL_REVEAL_ONCE,
          },
        })

        entrance
          .from(`${headingSelector} > span, ${headingSelector} .inline-flex`, {
            y: 22,
            autoAlpha: 0,
            scale: 0.94,
            duration: 0.35,
            ease: 'power3.out',
          })
          .from(
            `${headingSelector} h2`,
            {
              y: 36,
              autoAlpha: 0,
              duration: 0.4,
              ease: 'power3.out',
            },
            '-=0.2',
          )
          .from(
            `${headingSelector} p`,
            {
              y: 26,
              autoAlpha: 0,
              duration: 0.35,
              ease: 'power2.out',
            },
            '-=0.25',
          )
          .from(
            '.how-steps-grid',
            {
              y: 40,
              opacity: 0,
              duration: 0.4,
              ease: 'power3.out',
            },
            '-=0.2',
          )

        entrance.from(
          cards,
          {
            y: 48,
            autoAlpha: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power3.out',
          },
          '-=0.25',
        )

        entrance.from(
          '.step-copy',
          {
            y: 20,
            autoAlpha: 0,
            duration: 0.35,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.4',
        )

        entrance.from(
          '.step-image',
          {
            y: 32,
            scale: 1.05,
            autoAlpha: 0,
            duration: 0.55,
            stagger: 0.05,
            ease: 'power3.out',
          },
          '-=0.38',
        )

        entrance.from(
          '.step-divider',
          {
            scaleY: 0,
            autoAlpha: 0,
            duration: 0.35,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.4',
        )
      }

      mm.add('(min-width: 1024px)', () =>
        buildEntrance('.how-heading-desktop'),
      )
      mm.add('(max-width: 1023px)', () => buildEntrance('.how-heading-mobile'))
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="overflow-x-hidden bg-bg-primary max-lg:pb-12 max-lg:pt-16 lg:py-24"
    >
      <Container>
        <SectionHeading
          className="how-heading how-heading-mobile gap-3 max-lg:items-center max-lg:text-center lg:hidden [&_h2]:mx-auto [&_h2]:max-w-[301px] md:[&_h2]:max-w-[560px] [&_h2]:normal-case [&_h2]:leading-normal [&_h2]:tracking-[-0.8px] [&_p]:mx-auto [&_p]:w-full [&_p]:max-w-[min(353px,calc(100vw-32px))] md:[&_p]:max-w-[760px] [&_p]:text-[14px] [&_p]:leading-[22px]"
          badge="How It Works"
          align="center"
          title={
            <>
              <span className="block">Plan Your Trip In A</span>
              <span className="block">Few Simple Steps</span>
            </>
          }
          subtitle={
            <>
              From destination to shared itinerary, Trubbi
              <br />
              helps your group plan faster and stay organized.
            </>
          }
        />

        <SectionHeading
          className="how-heading how-heading-desktop hidden gap-[18px] lg:flex lg:items-start lg:text-left [&_h2]:lg:max-w-none [&_h2]:lg:whitespace-nowrap [&_h2]:text-[#072723] [&_h2]:lg:text-[48px] [&_h2]:lg:leading-[43px] [&_h2]:lg:tracking-[-0.6px] [&_p]:lg:max-w-[655px] [&_p]:lg:text-xl [&_p]:lg:font-medium [&_p]:lg:opacity-80"
          badge="How It Works"
          align="left"
          title="Plan your trip in a few simple steps"
          subtitle="From destination to shared itinerary, Trubbi helps your group plan faster and stay organized."
        />

        <div className="how-steps-grid mx-auto mt-10 max-w-full overflow-hidden rounded-3xl border border-border-subtle bg-white md:max-w-[760px] lg:mt-[46px] lg:max-w-full lg:border-0">
          <div className="grid grid-cols-1 items-start md:grid-cols-2 lg:flex lg:h-[547px] lg:w-[1280px] lg:max-w-full lg:flex-row lg:items-stretch">
            {howItWorksSteps.map((step, index) => (
              <StepCard
                key={step.step}
                step={step}
                index={index}
                total={howItWorksSteps.length}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
