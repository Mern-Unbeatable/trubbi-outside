import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { navLinks } from '../../data/landingContent'
import { scrollToSection } from '../../hooks/useSmoothScroll'
import SmoothScrollLink from './SmoothScrollLink'

export function MenuToggleButton({
  open,
  onToggle,
  line1Ref,
  line2Ref,
  line3Ref,
  solidHeader = false,
}) {
  const showRedCircle = open || solidHeader

  return (
    <button
      type="button"
      className={`flex h-9 w-9 items-center justify-center rounded-full transition lg:hidden ${
        showRedCircle
          ? 'bg-brand-primary shadow-[0_4px_14px_rgba(255,75,85,0.35)]'
          : 'bg-transparent shadow-none'
      }`}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      onClick={onToggle}
    >
      <span className="relative block h-3.5 w-4">
        <span
          ref={line1Ref}
          className="absolute left-0 top-0 block h-0.5 w-full origin-center rounded-full bg-white"
        />
        <span
          ref={line2Ref}
          className="absolute left-0 top-1.5 block h-0.5 w-full origin-center rounded-full bg-white"
        />
        <span
          ref={line3Ref}
          className="absolute right-0 top-3 block h-0.5 w-3 origin-center rounded-full bg-white"
        />
      </span>
    </button>
  )
}

export default function MobileNavMenu({ open, onClose }) {
  const overlayRef = useRef(null)
  const navCardRef = useRef(null)
  const menuTweenRef = useRef(null)
  const pendingScrollRef = useRef(null)
  const [mounted, setMounted] = useState(open)

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useEffect(() => {
    if (!open) return

    const scrollY = window.scrollY || document.documentElement.scrollTop || 0
    const body = document.body

    body.classList.add('menu-open')
    body.style.top = `-${scrollY}px`

    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.paused(true)
    }

    return () => {
      body.classList.remove('menu-open')
      body.style.top = ''
      body.style.width = ''

      const pendingHref = pendingScrollRef.current
      pendingScrollRef.current = null

      smoother?.paused(false)

      if (pendingHref) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scrollToSection(pendingHref)
          })
        })
      } else {
        window.scrollTo(0, scrollY)
      }
    }
  }, [open])

  useLayoutEffect(() => {
    if (!mounted) return

    const overlay = overlayRef.current
    const navCard = navCardRef.current
    const links = navCard?.querySelectorAll('.mobile-nav-link')
    if (!overlay || !navCard) return

    menuTweenRef.current?.kill()
    gsap.killTweensOf([overlay, navCard, links])

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (open) {
      gsap.set(overlay, { autoAlpha: 0 })
      gsap.set(navCard, { autoAlpha: 0, y: -28, scale: 0.94, transformOrigin: '50% 0%' })
      gsap.set(links, { autoAlpha: 0, x: 36, y: 8 })

      if (reducedMotion) {
        gsap.set([overlay, navCard, links], { autoAlpha: 1, x: 0, y: 0, scale: 1 })
        return
      }

      menuTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(overlay, { autoAlpha: 1, duration: 0.45 })
        .to(
          navCard,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: 'back.out(1.35)',
          },
          '-=0.28',
        )
        .to(
          links,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.42,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.28',
        )

      return
    }

    if (reducedMotion) {
      setMounted(false)
      return
    }

    menuTweenRef.current = gsap
      .timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => setMounted(false),
      })
      .to(links, {
        autoAlpha: 0,
        x: -24,
        y: -4,
        duration: 0.22,
        stagger: { each: 0.05, from: 'end' },
      })
      .to(
        navCard,
        {
          autoAlpha: 0,
          y: -20,
          scale: 0.96,
          duration: 0.32,
          ease: 'power3.in',
        },
        '-=0.08',
      )
      .to(overlay, { autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, '-=0.14')
  }, [open, mounted])

  const handleNavigate = useCallback((href) => {
    pendingScrollRef.current = href
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!mounted) return null

  return createPortal(
    <div
      ref={overlayRef}
      className="invisible fixed inset-0 z-[100] bg-[#0a1f26]/40 backdrop-blur-[3px] lg:hidden"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="absolute inset-x-0 top-14 mx-auto max-w-[1440px] px-5 pb-8 pt-3"
        onClick={(event) => event.stopPropagation()}
      >
        <nav
          ref={navCardRef}
          className="invisible flex flex-col gap-0 overflow-hidden rounded-[24px] bg-bg-primary p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] will-change-transform"
        >
          {navLinks.map((link, index) => (
            <SmoothScrollLink
              key={link.href}
              href={link.href}
              className={`mobile-nav-link block py-4 text-lg font-medium leading-none text-text-primary ${
                index < navLinks.length - 1 ? 'border-b border-border-subtle/80' : ''
              }`}
              onNavigate={handleNavigate}
            >
              {link.label}
            </SmoothScrollLink>
          ))}
        </nav>
      </div>
    </div>,
    document.body,
  )
}

export function useMenuToggleAnimation(open, line1Ref, line2Ref, line3Ref) {
  useLayoutEffect(() => {
    const line1 = line1Ref.current
    const line2 = line2Ref.current
    const line3 = line3Ref.current
    if (!line1 || !line2 || !line3) return

    gsap.killTweensOf([line1, line2, line3])

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(line1, { y: open ? 6 : 0, rotation: open ? 45 : 0 })
      gsap.set(line2, { autoAlpha: open ? 0 : 1 })
      gsap.set(line3, { y: open ? -6 : 0, rotation: open ? -45 : 0, width: open ? '1rem' : '0.75rem' })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut', duration: 0.38 } })

    tl.to(line1, { y: open ? 6 : 0, rotation: open ? 45 : 0 }, 0)
      .to(line2, { autoAlpha: open ? 0 : 1, duration: 0.2 }, 0)
      .to(line3, { y: open ? -6 : 0, rotation: open ? -45 : 0, width: open ? '1rem' : '0.75rem' }, 0)
  }, [open, line1Ref, line2Ref, line3Ref])
}
