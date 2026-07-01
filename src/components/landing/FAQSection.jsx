import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { faqChevron } from '../../assets/landing'
import { faqItems } from '../../data/landingContent'
import { SCROLL_REVEAL_ONCE } from '../../hooks/useLandingAnimations'
import { Container, SectionHeading } from '../ui/primitives'

gsap.registerPlugin(ScrollTrigger)

function FAQItem({ item, index, isOpen, onToggle }) {
  const answerRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      if (isOpen) {
        gsap.to(answerRef.current, {
          height: 'auto',
          autoAlpha: 1,
          duration: 0.35,
          ease: 'power2.out',
        })
      } else {
        gsap.to(answerRef.current, {
          height: 0,
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.in',
        })
      }
    },
    { dependencies: [isOpen] },
  )

  return (
    <div className="border-t border-border-subtle">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-bold text-[#221f1d] lg:text-[22px]">
          {index + 1}. {item.question}
        </span>
        <img
          src={faqChevron}
          alt=""
          className={`h-6 w-6 shrink-0 transition ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div ref={answerRef} className="h-0 overflow-hidden opacity-0">
        <div className="mb-6 rounded-3xl bg-bg-secondary px-6 py-6">
          <p className="text-justify text-lg font-medium leading-normal text-text-primary">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.faq-panel', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          ...SCROLL_REVEAL_ONCE,
        },
        y: 32,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="faqs" className="bg-bg-primary pb-16 pt-10 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-[26px] lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            badge="FAQs"
            align="left"
            title="Common Questions"
            className="faq-panel max-lg:items-center max-lg:text-center"
          />

          <div className="faq-panel">
            {faqItems.map((item, index) => (
              <FAQItem
                key={item.question}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? -1 : index))
                }
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
