import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  heroBg,
  iphoneMockup,
  avatar1,
  avatar2,
  avatar3,
} from '../../assets/landing'
import { navLinks } from '../../data/landingContent'
import LogoPill from './LogoPill'
import MobileNavMenu, {
  MenuToggleButton,
  useMenuToggleAnimation,
} from './MobileNavMenu'
import SmoothScrollLink from './SmoothScrollLink'
import WaitlistButton from './WaitlistButton'

const navPillClassName =
  'nav-pill flex h-12 shrink-0 flex-nowrap items-center rounded-full bg-white shadow-[0_0_2.5px_rgba(0,0,0,0.09)]'

function NavPillLinks({ className = '' }) {
  const linkClass = `shrink-0 whitespace-nowrap px-5 py-3 text-base text-text-primary transition-colors hover:text-brand-primary ${className}`

  return (
    <>
      {navLinks.map((link) => (
        <SmoothScrollLink key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </SmoothScrollLink>
      ))}
    </>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [solidHeader, setSolidHeader] = useState(false)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)

  useMenuToggleAnimation(menuOpen, line1Ref, line2Ref, line3Ref)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    if (!mq.matches) return

    const onScroll = () => {
      setSolidHeader(window.scrollY > 24)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleToggleMenu = () => {
    setMenuOpen((open) => !open)
  }

  const handleCloseMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[110] w-full lg:relative lg:z-50">
      <div className="mx-auto max-w-[1440px] px-5 max-lg:py-[10px] md:px-8 lg:px-20 lg:py-8">
        <div
          className={`flex h-9 items-center gap-3 lg:h-12 lg:justify-between lg:gap-6 ${
            solidHeader ? 'max-lg:justify-end' : 'justify-between'
          }`}
        >
          <SmoothScrollLink
            href="#"
            className={`shrink-0 transition-opacity duration-300 lg:opacity-100 ${
              solidHeader ? 'max-lg:pointer-events-none max-lg:invisible max-lg:w-0 max-lg:opacity-0' : ''
            }`}
            aria-label="trubbi home"
          >
            <LogoPill />
          </SmoothScrollLink>

          <nav className="hidden lg:flex lg:flex-1 lg:justify-center">
            <div className={navPillClassName}>
              <NavPillLinks />
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden lg:block">
              <WaitlistButton variant="nav" className="h-12 w-[143px]" />
            </div>

            <MenuToggleButton
              open={menuOpen}
              onToggle={handleToggleMenu}
              line1Ref={line1Ref}
              line2Ref={line2Ref}
              line3Ref={line3Ref}
              solidHeader={solidHeader}
            />
          </div>
        </div>
      </div>

      <MobileNavMenu open={menuOpen} onClose={handleCloseMenu} />
    </header>
  )
}

function AvatarGroup() {
  const avatars = [
    { src: avatar3, left: 'left-0' },
    { src: avatar2, left: 'left-7' },
    { src: avatar1, left: 'left-14' },
  ]

  return (
    <div className="relative h-9 w-[92px] shrink-0">
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className={`hero-avatar absolute ${avatar.left} top-0 h-9 w-9 overflow-hidden rounded-full ring-2 ring-white/90`}
        >
          <img src={avatar.src} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  )
}

export function HeroSection() {
  const sectionRef = useRef(null)
  const phoneWrapRef = useRef(null)
  const phoneRef = useRef(null)
  const countRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      const counter = { value: 0 }

      if (countRef.current) countRef.current.textContent = '0+'

      tl.from('.hero-phone', {
        y: -36,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })
        .from('.hero-line', {
        y: -48,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        clearProps: 'transform,opacity',
      })
        .from(
          '.hero-sub',
          {
            y: -28,
            autoAlpha: 0,
            duration: 0.6,
            clearProps: 'transform,opacity',
          },
          '-=0.35',
        )
        .from(
          '.hero-cta',
          {
            y: -20,
            autoAlpha: 0,
            duration: 0.5,
            clearProps: 'transform,opacity',
          },
          '-=0.25',
        )
        .from(
          '.hero-avatar',
          {
            scale: 0,
            opacity: 0,
            x: -20,
            duration: 0.55,
            stagger: 0.14,
            ease: 'back.out(1.8)',
            clearProps: 'transform,opacity',
          },
          '-=0.15',
        )
        .from(
          '.hero-count',
          {
            opacity: 0,
            x: -12,
            duration: 0.45,
            clearProps: 'transform,opacity',
          },
          '-=0.25',
        )
        .to(
          counter,
          {
            value: 500,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = `${Math.round(counter.value)}+`
              }
            },
          },
          '-=0.2',
        )
        .from(
          '.hero-proof-copy',
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
            clearProps: 'transform,opacity',
          },
          '-=0.9',
        )
    },
    { scope: sectionRef },
  )

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const desktopMq = window.matchMedia('(min-width: 1024px)')
    if (!desktopMq.matches) return

    const section = sectionRef.current
    const phoneWrap = phoneWrapRef.current
    const phone = phoneRef.current
    if (!section || !phoneWrap || !phone) return

    const resetPhone = () => {
      gsap.to(phone, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    const handleMove = (event) => {
      const rect = phoneWrap.getBoundingClientRect()
      const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width
      const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height

      gsap.to(phone, {
        x: x * 28,
        y: y * 20,
        rotateY: x * 8,
        rotateX: -y * 6,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    const handleDesktopChange = (event) => {
      if (!event.matches) resetPhone()
    }

    section.addEventListener('mousemove', handleMove)
    section.addEventListener('mouseleave', resetPhone)
    desktopMq.addEventListener('change', handleDesktopChange)

    return () => {
      section.removeEventListener('mousemove', handleMove)
      section.removeEventListener('mouseleave', resetPhone)
      desktopMq.removeEventListener('change', handleDesktopChange)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[852px] lg:min-h-[900px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <Navbar />

      {/* Reserve space for fixed mobile header (10px + 36px + 10px) */}
      <div className="h-[56px] shrink-0 lg:hidden" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col px-5 pb-16 pt-0 max-lg:items-stretch md:max-w-[760px] md:px-8 lg:max-w-[1440px] lg:flex-row lg:items-center lg:px-20 lg:pb-40 lg:pt-4">
        <div
          ref={phoneWrapRef}
          className="order-1 flex w-full shrink-0 flex-col items-center justify-center pt-[19px] max-lg:pb-0 lg:order-2 lg:h-[788px] lg:w-[617px] lg:justify-start lg:pt-[90px] lg:[perspective:1000px]"
        >
          <img
            ref={phoneRef}
            src={iphoneMockup}
            alt="Trubbi app preview"
            className="hero-phone h-auto w-full max-w-[263px] object-contain max-lg:mx-auto md:max-w-[380px] lg:h-[547px] lg:w-[562px] lg:max-w-none lg:will-change-transform"
          />
        </div>

        <div className="order-2 flex w-full max-w-[353px] flex-1 flex-col max-lg:items-start max-lg:text-left md:max-w-[760px] lg:order-1 lg:max-w-[663px] lg:items-start lg:gap-6 lg:text-left">
          <h1 className="mb-8 flex w-full flex-col font-sans text-[34px] font-bold normal-case tracking-[-0.85px] text-white min-[360px]:text-[42px] min-[360px]:tracking-[-1.05px] lg:mb-0 lg:capitalize lg:text-[64px] lg:tracking-[-2px]">
            <span className="hero-line block leading-[37.4px] min-[360px]:leading-[46.2px] lg:leading-[1.14]">
              Plan group trips
            </span>
            <span className="hero-line block leading-[37.4px] min-[360px]:leading-[46.2px] lg:leading-[1.14]">
              without the chaos
            </span>
          </h1>

          <p className="hero-sub mb-[19px] w-full max-w-[340px] text-[14px] leading-5 text-white min-[360px]:text-base min-[360px]:leading-6 md:max-w-[560px] lg:mb-0 lg:max-w-[608px] lg:text-xl lg:leading-[27px]">
            <span className="min-[360px]:hidden lg:!hidden">
              Create a trip, add your people, shape the vibe, and plan together
              without juggling five different apps.
            </span>
            <span className="hidden min-[360px]:inline lg:!hidden">
              Create a trip, add your people, shape the vibe,
              <br />
              and plan together without juggling five different
              <br />
              apps.
            </span>
            <span className="hidden lg:inline">
              Create a trip, add your people, shape the vibe, and plan together
              without juggling five different apps.
            </span>
          </p>

          <div className="hero-cta mb-8 w-full md:w-auto lg:mb-0">
            <WaitlistButton className="h-12 w-full min-w-0 shadow-[0_10px_7.5px_rgba(0,0,0,0.1),0_4px_3px_rgba(0,0,0,0.1)] md:h-[46px] md:w-auto md:min-w-[160px] md:shadow-[0_0_5px_1px_rgba(0,0,0,0.09)]" />
          </div>

          <div className="hero-proof flex w-full flex-col gap-2 max-lg:items-start">
            <div className="flex items-center gap-3">
              <AvatarGroup />
              <span
                ref={countRef}
                className="hero-count text-2xl font-bold leading-8 tracking-[-0.48px] text-white lg:text-[40px] lg:leading-[52px] lg:tracking-[-0.8px]"
              >
                500+
              </span>
            </div>
            <div className="hero-proof-copy text-sm leading-5 text-white lg:text-base lg:leading-4">
              <p className="mb-0">Travelers already on the wait list.</p>
              <p>Join them now!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Figma Rectangle 2 — blurred cream fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-[91px] w-[112%] min-w-[1619px] -translate-x-1/2 bg-bg-primary blur-[32px] lg:h-[126px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-16 w-full bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent lg:h-24"
      />
    </section>
  )
}
