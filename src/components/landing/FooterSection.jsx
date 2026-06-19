import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  footerBrandMobile,
  footerBrandWordmark,
  footerOtterBase,
  footerOtterDetail,
  socialInsta,
  socialTiktok,
  socialYt,
} from '../../assets/landing'
import { footerLinks } from '../../data/landingContent'
import SmoothScrollLink from './SmoothScrollLink'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  {
    icon: socialInsta,
    label: 'Instagram',
    href: 'https://www.instagram.com/trubbiai',
  },
  {
    icon: socialTiktok,
    label: 'TikTok',
    href: 'https://www.tiktok.com/@trubbi.ai',
  },
  {
    icon: socialYt,
    label: 'YouTube',
    href: '#',
  },
]

/** Figma node 729:4956 — Isolation_Mode (base + detail overlay) */
function FooterOtterIsolation({ className = '' }) {
  return (
    <div className={`relative overflow-clip ${className}`}>
      <img
        src={footerOtterBase}
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full max-w-none"
      />
      <div className="absolute inset-[8.51%_54.78%_74.89%_8.44%]">
        <img
          src={footerOtterDetail}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full max-w-none"
        />
      </div>
    </div>
  )
}

/** Figma 832:7651 — mobile otter + trubbi wordmark canvas */
function FooterMobileDecor({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-full max-w-[393px] ${className}`}>
      <div className="relative h-[512px] w-full">
        <FooterOtterIsolation className="footer-otter absolute left-[15.28px] top-[434px] z-[1] h-[121.843px] w-[94.928px]" />

        <div className="footer-brand absolute left-[11.62%] right-[3.89%] top-[439px] z-[2] h-[87.797px]">
          <img
            src={footerBrandMobile}
            alt="trubbi"
            loading="lazy"
            className="size-full max-w-none object-fill"
          />
        </div>
      </div>
    </div>
  )
}

export default function FooterSection() {
  const footerRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const trigger = footerRef.current
      const mm = gsap.matchMedia()

      gsap.from('.footer-content', {
        scrollTrigger: {
          trigger,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 32,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
      })

      const buildOtterEntrance = (decorSelector) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger,
              start: 'top 85%',
              toggleActions: 'restart none restart none',
            },
          })
          .from(`${decorSelector} .footer-otter`, {
            y: 120,
            autoAlpha: 0,
            duration: 0.75,
            ease: 'power3.out',
          })
          .from(
            `${decorSelector} .footer-brand`,
            {
              y: 50,
              autoAlpha: 0,
              duration: 0.28,
              ease: 'power1.out',
            },
            '+=0.001',
          )
      }

      mm.add('(min-width: 1024px)', () =>
        buildOtterEntrance('.footer-decor-desktop'),
      )
      mm.add('(max-width: 767px)', () =>
        buildOtterEntrance('.footer-decor-mobile'),
      )
      mm.add('(min-width: 768px) and (max-width: 1023px)', () =>
        buildOtterEntrance('.footer-decor-tablet'),
      )
    },
    { scope: footerRef },
  )

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative max-md:h-[400px] h-[500px] overflow-hidden rounded-t-[24px] bg-brand-secondary px-11 pt-12 pb-0 lg:h-[460px] lg:py-16"
    >
      {/* Mobile — unchanged Figma layout */}
      <FooterMobileDecor className="footer-decor-mobile md:hidden" />

      {/* Tablet — same canvas, scaled to ~760px */}
      <FooterMobileDecor className="footer-decor-tablet hidden origin-bottom scale-[1.935] md:block lg:hidden" />

      {/* Desktop decor canvas — Figma 724:4848 (1440×460) */}
      <div className="footer-decor-desktop pointer-events-none absolute bottom-0 left-1/2 hidden w-[1440px] origin-bottom -translate-x-1/2 scale-[min(1,calc(100vw/1440))] lg:block">
        <div className="relative h-[460px] w-[1440px]">
          <FooterOtterIsolation className="footer-otter absolute left-[180px] top-[273.74px] z-[1] h-[335px] w-[261px]" />

          <div className="footer-brand absolute left-[263px] right-[263px] top-[288.63px] z-[2] h-[241.389px]">
            <img
              src={footerBrandWordmark}
              alt="trubbi"
              loading="lazy"
              className="size-full max-w-none object-fill"
            />
          </div>
        </div>
      </div>

      <div className="footer-content relative z-10 mx-auto flex w-full max-w-[1352px] flex-col gap-[38px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="flex w-[191px] flex-col gap-[18px]">
            <h3 className="text-[22px] font-bold leading-none text-[#f3f1ee]">
              Pages
            </h3>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <SmoothScrollLink
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium leading-[19.6px] text-text-muted transition hover:text-white"
                >
                  {link.label}
                </SmoothScrollLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4 lg:items-start">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target={social.href === '#' ? undefined : '_blank'}
                rel={social.href === '#' ? undefined : 'noopener noreferrer'}
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center transition hover:opacity-80"
              >
                <img src={social.icon} alt="" className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>

        <p className="text-xs leading-[16.8px] text-text-muted lg:mt-2">
          © 2026 Trubbi. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
