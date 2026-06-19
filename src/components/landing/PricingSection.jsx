import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { pricingPlans } from '../../data/landingContent'
import { Container, PrimaryButton, SectionHeading } from '../ui/primitives'

function PricingCard({ plan }) {
  const isPrimary = plan.variant === 'primary'

  return (
    <article className="pricing-card flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_0_5px_1px_rgba(0,0,0,0.09)]">
      <div className={`${plan.headerColor} px-8 py-10 text-text-inverse`}>
        <p className="text-sm font-medium">• {plan.label}</p>
        <div className="mt-4 flex items-end gap-1">
          <span className="text-5xl font-bold">{plan.price}</span>
          <span className="pb-2 text-sm">{plan.period}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-8 py-8">
        <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
        <hr className="my-6 border-border-subtle" />
        <ul className="flex flex-1 flex-col gap-3">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-text-secondary"
            >
              <span className="mt-0.5 text-text-tertiary">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        {isPrimary ? (
          <PrimaryButton className="mt-8 w-full">Get Started</PrimaryButton>
        ) : (
          <button
            type="button"
            className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full border border-brand-secondary text-base font-medium text-brand-secondary transition hover:bg-brand-secondary hover:text-white"
          >
            Get Started
          </button>
        )}
      </div>
    </article>
  )
}

export default function PricingSection() {
  const [billing, setBilling] = useState('monthly')
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)

  const plans = pricingPlans[billing]

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.pricing-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        autoAlpha: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
      })
    },
    { scope: sectionRef, dependencies: [billing] },
  )

  const handleBillingChange = (next) => {
    if (next === billing) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBilling(next)
      return
    }

    gsap.to(cardsRef.current, {
      autoAlpha: 0,
      y: 16,
      duration: 0.2,
      onComplete: () => {
        setBilling(next)
        gsap.fromTo(
          cardsRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        )
      },
    })
  }

  return (
    <section ref={sectionRef} id="pricing" className="bg-bg-primary py-16 md:py-24">
      <Container>
        <SectionHeading
          badge="Pricing"
          title="Choose the plan that fits your trip style"
          subtitle="Get started early and pick the level that works best for you and your group."
        />

        <div className="relative mx-auto mt-10 flex w-fit rounded-full bg-bg-secondary p-1">
          <span
            className="absolute bottom-1 top-1 rounded-full bg-brand-secondary transition-transform duration-300"
            style={{
              left: '4px',
              width: 'calc(50% - 4px)',
              transform: billing === 'monthly' ? 'translateX(0)' : 'translateX(100%)',
            }}
          />
          <button
            type="button"
            className={`relative z-10 rounded-full px-6 py-3 text-sm font-medium transition ${billing === 'monthly' ? 'text-white' : 'text-text-primary'}`}
            onClick={() => handleBillingChange('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition ${billing === 'yearly' ? 'text-white' : 'text-text-primary'}`}
            onClick={() => handleBillingChange('yearly')}
          >
            Yearly
            <span className="rounded-full bg-brand-primary px-2 py-0.5 text-xs text-white">
              -20%
            </span>
          </button>
        </div>

        <div
          ref={cardsRef}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
        >
          {plans.map((plan) => (
            <PricingCard key={`${billing}-${plan.name}`} plan={plan} />
          ))}
        </div>
      </Container>
    </section>
  )
}
