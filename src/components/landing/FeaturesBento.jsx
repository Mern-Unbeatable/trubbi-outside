import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  featureGraphicAi,
  featureGraphicItinerary,
  featureGraphicLive,
  featureGraphicVibe,
} from '../../assets/landing'
import { featureCards } from '../../data/landingContent'
import { Container, SectionHeading } from '../ui/primitives'

gsap.registerPlugin(ScrollTrigger)

const featureImages = {
  featureGraphicItinerary,
  featureGraphicLive,
  featureGraphicAi,
  featureGraphicVibe,
}

const cardEntrance = [
  { x: -56, y: 48, rotation: -2.5, scale: 0.9 },
  { x: 56, y: 48, rotation: 2.5, scale: 0.9 },
  { x: -64, y: 56, rotation: -1.5, scale: 0.88 },
  { x: 64, y: 56, rotation: 1.5, scale: 0.88 },
]

const mediaConfig = {
  featureGraphicItinerary: {
    mobile: {
      shell:
        'relative h-[211px] shrink-0 overflow-hidden px-4 pt-4 md:h-[220px] md:px-3 lg:px-4',
      image:
        'feature-card-image mx-auto h-full w-full max-w-[298px] object-contain object-center md:max-w-full',
    },
    desktop: {
      shell: 'relative min-h-[420px] flex-1 overflow-hidden',
      image: 'feature-card-image h-full w-full object-contain object-center',
    },
  },
  featureGraphicLive: {
    mobile: {
      shell:
        'relative h-[211px] shrink-0 overflow-hidden px-4 pt-4 md:h-[220px] md:px-3 lg:px-4',
      image:
        'feature-card-image mx-auto h-full w-full max-w-[309px] object-contain object-center md:max-w-full',
    },
    desktop: {
      shell: 'relative min-h-0 flex-1 overflow-hidden',
      image:
        'feature-card-image h-full w-full object-contain object-center',
    },
  },
  featureGraphicAi: {
    mobile: {
      shell: 'relative h-[200px] shrink-0 overflow-hidden pt-4 md:h-[210px]',
      image:
        'feature-card-image mx-auto h-full w-full max-w-[298px] object-contain object-center md:max-w-full',
    },
    desktop: {
      shell:
        'pointer-events-none absolute inset-x-0 bottom-0 top-[150px] overflow-hidden',
      image:
        'feature-card-image absolute bottom-0 left-1/2 h-auto w-full max-w-none -translate-x-1/2 object-contain object-bottom',
    },
  },
  featureGraphicVibe: {
    mobile: {
      shell:
        'relative h-[192px] shrink-0 overflow-hidden px-4 pt-[23px] md:h-[200px] md:px-3 lg:px-4',
      image:
        'feature-card-image mx-auto block h-[169px] w-full max-w-[287px] object-contain object-center md:h-full md:max-w-full',
    },
    desktop: {
      shell: 'relative h-[252px] shrink-0 overflow-hidden',
      image:
        'feature-card-image mx-auto h-full w-full max-w-[520px] object-contain object-center',
    },
  },
}

function FeatureCardText({
  title,
  description,
  mobileDescription,
  className = '',
  descriptionClassName = '',
}) {
  return (
    <div className={`feature-card-text flex flex-col gap-1.5 ${className}`}>
      <h3 className="text-[20px] font-medium capitalize leading-[30px] text-text-primary lg:text-[30px] lg:leading-[30px]">
        {title}
      </h3>
      <p
        className={`max-w-[400px] text-sm leading-6 text-text-secondary lg:text-base lg:leading-6 ${descriptionClassName}`}
      >
        {mobileDescription ? (
          <>
            <span className="lg:hidden">
              {mobileDescription[0]}
              <br />
              {mobileDescription[1]}
            </span>
            <span className="hidden lg:inline">{description}</span>
          </>
        ) : (
          description
        )}
      </p>
    </div>
  )
}

function FeatureCardMedia({ card, viewport }) {
  const image = featureImages[card.imageKey]
  const config = mediaConfig[card.imageKey][viewport]

  return (
    <div className={`feature-card-media ${config.shell}`}>
      <img src={image} alt="" loading="lazy" className={config.image} />
    </div>
  )
}

function FeatureCard({ card, className = '' }) {
  const desktopLayout = card.layout
  const mobileLayout = card.mobileLayout ?? card.layout

  const isTextTopMobile =
    mobileLayout === 'text-top' || mobileLayout === 'text-top-overlay'
  const isTextTopDesktop =
    desktopLayout === 'text-top' || desktopLayout === 'text-top-overlay'
  const isOverlayDesktop = desktopLayout === 'text-top-overlay'
  const isCompactGraphic = card.layout === 'graphic-top-compact'
  const isLiveCard = card.imageKey === 'featureGraphicLive'

  const textClassName =
    'gap-2 px-4 max-lg:pb-4 max-lg:pt-3 lg:gap-2 lg:px-16 lg:pb-0 lg:pt-16'

  const mobileTextClassName = isTextTopMobile
    ? 'pb-0 pt-4'
    : isCompactGraphic
      ? 'mt-[50px] pb-4 pt-0'
      : ''

  return (
    <article
      className={`feature-card group flex cursor-pointer flex-col overflow-hidden rounded-3xl bg-white ${isOverlayDesktop ? 'lg:relative' : ''} ${className}`}
    >
      {/* Mobile */}
      <div className="flex flex-col lg:hidden">
        {!isTextTopMobile && (
          <FeatureCardMedia card={card} viewport="mobile" />
        )}
        <FeatureCardText
          title={card.title}
          description={card.description}
          mobileDescription={card.mobileDescription}
          className={`${textClassName} ${mobileTextClassName}`}
          descriptionClassName={isLiveCard ? 'max-lg:max-w-[301px] max-lg:text-sm max-lg:leading-6' : ''}
        />
        {isTextTopMobile && (
          <FeatureCardMedia card={card} viewport="mobile" />
        )}
      </div>

      {/* Desktop */}
      <div className="hidden min-h-0 flex-1 flex-col lg:flex">
        {isTextTopDesktop && (
          <FeatureCardText
            title={card.title}
            description={card.description}
            className={`${textClassName} ${isOverlayDesktop ? 'relative z-10 [&_h3]:lg:max-w-[260px] [&_h3]:lg:whitespace-nowrap [&_p]:lg:max-w-[323px]' : ''}`}
          />
        )}

        {!isOverlayDesktop && (
          <FeatureCardMedia card={card} viewport="desktop" />
        )}

        {!isTextTopDesktop && (
          <FeatureCardText
            title={card.title}
            description={card.description}
            className={`${textClassName} lg:mt-auto lg:pb-16 lg:pt-0`}
          />
        )}
      </div>

      {isOverlayDesktop && (
        <div className="hidden lg:contents">
          <FeatureCardMedia card={card} viewport="desktop" />
        </div>
      )}
    </article>
  )
}

export default function FeaturesBento() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const cards = gsap.utils.toArray('.feature-card')
      const cleanups = []

      const entrance = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      })

      entrance
        .from('.features-heading > span', {
          y: 24,
          autoAlpha: 0,
          scale: 0.92,
          duration: 0.35,
          ease: 'power3.out',
        })
        .from(
          '.features-heading h2',
          {
            y: 40,
            autoAlpha: 0,
            duration: 0.4,
            ease: 'power3.out',
          },
          '-=0.2',
        )
        .from(
          '.features-heading p',
          {
            y: 28,
            autoAlpha: 0,
            filter: 'blur(4px)',
            duration: 0.35,
            ease: 'power2.out',
          },
          '-=0.25',
        )
        .from(
          '.features-grid',
          {
            autoAlpha: 0,
            duration: 0.2,
          },
          '-=0.2',
        )

      cards.forEach((card, index) => {
        entrance.from(
          card,
          {
            ...cardEntrance[index],
            autoAlpha: 0,
            clipPath: 'inset(14% round 24px)',
            duration: 0.45,
            ease: 'power3.out',
          },
          index === 0 ? '-=0.15' : '-=0.38',
        )

        entrance.from(
          card.querySelectorAll('.feature-card-text'),
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.35,
            ease: 'power3.out',
          },
          '-=0.35',
        )

        entrance.from(
          card.querySelectorAll('.feature-card-image'),
          {
            scale: 1.08,
            autoAlpha: 0,
            duration: 0.4,
            ease: 'power3.out',
          },
          '-=0.38',
        )
      })

      cards.forEach((card) => {
        const images = card.querySelectorAll('.feature-card-image')
        if (!images.length) return

        const onEnter = () => {
          gsap.to(images, {
            scale: 1.045,
            duration: 0.5,
            ease: 'power2.out',
          })
          gsap.to(card, {
            y: -6,
            duration: 0.5,
            ease: 'power2.out',
          })
        }

        const onLeave = () => {
          gsap.to(images, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          })
          gsap.to(card, {
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          })
        }

        card.addEventListener('mouseenter', onEnter)
        card.addEventListener('mouseleave', onLeave)
        cleanups.push(() => {
          card.removeEventListener('mouseenter', onEnter)
          card.removeEventListener('mouseleave', onLeave)
        })
      })

      return () => {
        cleanups.forEach((cleanup) => cleanup())
      }
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="features" className="bg-bg-primary py-16 lg:py-24">
      <Container>
        <SectionHeading
          className="features-heading"
          badge="Why Trubbi"
          title="Explore our standout features"
          subtitle="Everything your group needs to turn trip ideas into a clear, shared plan"
        />

        <div className="features-grid mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:mt-16 lg:flex lg:flex-col lg:gap-6">
          <div className="contents lg:grid lg:grid-cols-2 lg:gap-6 lg:items-stretch">
            <FeatureCard card={featureCards[0]} className="max-lg:h-auto max-lg:min-h-0 lg:min-h-[636px]" />
            <FeatureCard card={featureCards[1]} className="max-lg:h-auto max-lg:min-h-0 lg:min-h-[636px]" />
          </div>

          <div className="contents lg:grid lg:grid-cols-[742fr_530fr] lg:gap-6 lg:items-stretch">
            <FeatureCard card={featureCards[2]} className="max-lg:h-auto max-lg:min-h-0 lg:min-h-[424px]" />
            <FeatureCard card={featureCards[3]} className="max-lg:h-auto max-lg:min-h-0 lg:min-h-[424px]" />
          </div>
        </div>
      </Container>
    </section>
  )
}
