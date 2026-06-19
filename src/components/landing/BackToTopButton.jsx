import { useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'
import { logoIcon, logoIconGreen } from '../../assets/landing'
import { scrollToSection } from '../../hooks/useSmoothScroll'

gsap.registerPlugin(ScrollTrigger)

const SHOW_AFTER_PX = 500
const RING_TEXT = 'SCROLL TO TOP • SCROLL TO TOP • SCROLL TO TOP • '
const RING_RADIUS = 36
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
const THEME_GREEN = '#004A5C'
const THEME_RED = '#FF4B55'
const SHADOW_GREEN = '0 8px 24px rgba(0, 74, 92, 0.16)'
const SHADOW_RED = '0 8px 24px rgba(255, 75, 85, 0.32)'
const SHADOW_GREEN_HOVER = '0 14px 36px rgba(0, 74, 92, 0.24)'
const SHADOW_RED_HOVER = '0 14px 36px rgba(255, 75, 85, 0.4)'

function CircularTextRing({ ringTextRef, pathId }) {
  const top = 50 - RING_RADIUS

  return (
    <svg
      className="absolute inset-0 size-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <path
          id={pathId}
          fill="none"
          d={`M 50 ${top} A ${RING_RADIUS} ${RING_RADIUS} 0 1 1 50 ${top + RING_RADIUS * 2} A ${RING_RADIUS} ${RING_RADIUS} 0 1 1 50 ${top}`}
        />
      </defs>
      <text
        ref={ringTextRef}
        fill={THEME_GREEN}
        fontSize="6.4"
        fontWeight="700"
        className="font-sans uppercase"
      >
        <textPath
          href={`#${pathId}`}
          startOffset="0%"
          textLength={RING_CIRCUMFERENCE}
          lengthAdjust="spacing"
        >
          {RING_TEXT}
        </textPath>
      </text>
    </svg>
  )
}

export default function BackToTopButton() {
  const pathId = useId().replace(/:/g, '')
  const wrapRef = useRef(null)
  const ringSpinRef = useRef(null)
  const ringFadeRef = useRef(null)
  const ringTextRef = useRef(null)
  const coreRef = useRef(null)
  const logoGreenRef = useRef(null)
  const logoRedRef = useRef(null)
  const visibleRef = useRef(false)
  const overFooterRef = useRef(false)
  const ringTweenRef = useRef(null)

  useGSAP(() => {
    const wrap = wrapRef.current
    const ringSpin = ringSpinRef.current
    const ringFade = ringFadeRef.current
    const core = coreRef.current
    const ringText = ringTextRef.current
    const logoGreen = logoGreenRef.current
    const logoRed = logoRedRef.current
    if (!wrap || !ringSpin || !ringFade || !core || !ringText || !logoGreen || !logoRed) return

    gsap.set(wrap, { autoAlpha: 0, y: 20, scale: 0.72, pointerEvents: 'none' })
    gsap.set(ringSpin, { rotation: 0, transformOrigin: '50% 50%', force3D: true })
    gsap.set(ringFade, { autoAlpha: 0 })
    gsap.set(logoGreen, { autoAlpha: 1 })
    gsap.set(logoRed, { autoAlpha: 0 })

    ringTweenRef.current = gsap.to(ringSpin, {
      rotation: '+=360',
      duration: 18,
      repeat: -1,
      ease: 'none',
      paused: true,
    })

    const getScrollY = () => ScrollSmoother.get()?.scrollTop() ?? window.scrollY

    const setFooterTheme = (overFooter) => {
      if (overFooterRef.current === overFooter) return
      overFooterRef.current = overFooter

      gsap.to(ringText, {
        fill: overFooter ? THEME_RED : THEME_GREEN,
        duration: 0.35,
        ease: 'power2.out',
      })

      gsap.to(core, {
        boxShadow: overFooter ? SHADOW_RED : SHADOW_GREEN,
        duration: 0.35,
        ease: 'power2.out',
      })

      gsap.to(logoGreen, {
        autoAlpha: overFooter ? 0 : 1,
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to(logoRed, {
        autoAlpha: overFooter ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const syncFooterTheme = () => {
      const buttonRect = wrap.getBoundingClientRect()
      const darkZones = ['footer', 'final-cta-panel']
      const overFooter = darkZones.some((id) => {
        const zone = document.getElementById(id)
        if (!zone) return false

        const zoneRect = zone.getBoundingClientRect()
        return zoneRect.top < buttonRect.bottom - 12
      })

      setFooterTheme(overFooter)
    }

    const show = () => {
      if (visibleRef.current) return
      visibleRef.current = true

      gsap.timeline()
        .to(wrap, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          pointerEvents: 'auto',
          duration: 0.55,
          ease: 'back.out(1.7)',
        })
        .fromTo(
          core,
          { scale: 0.82, rotation: -12 },
          { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(2)' },
          '-=0.35',
        )
        .to(ringFade, {
          autoAlpha: 1,
          duration: 0.45,
          ease: 'power2.out',
        }, '-=0.35')

      ringTweenRef.current?.play()
      syncFooterTheme()
    }

    const hide = () => {
      if (!visibleRef.current) return
      visibleRef.current = false

      gsap.to(wrap, {
        autoAlpha: 0,
        y: 20,
        scale: 0.72,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          ringTweenRef.current?.pause()
          gsap.set(ringFade, { autoAlpha: 0 })
        },
      })
    }

    const syncVisibility = () => {
      const scrollY = getScrollY()

      if (scrollY > SHOW_AFTER_PX) show()
      else hide()

      if (visibleRef.current) syncFooterTheme()
    }

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: syncVisibility,
    })

    syncVisibility()

    return () => {
      trigger.kill()
      ringTweenRef.current?.kill()
    }
  })

  const handleClick = () => {
    scrollToSection('#')

    if (!coreRef.current) return
    gsap.fromTo(
      coreRef.current,
      { scale: 0.92 },
      { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.45)' },
    )
  }

  const handleEnter = () => {
    if (!wrapRef.current || !visibleRef.current) return

    gsap.to(wrapRef.current, {
      scale: 1.06,
      duration: 0.35,
      ease: 'power2.out',
    })

    gsap.to(coreRef.current, {
      boxShadow: overFooterRef.current ? SHADOW_RED_HOVER : SHADOW_GREEN_HOVER,
      duration: 0.35,
      ease: 'power2.out',
    })

    gsap.to(ringTweenRef.current, {
      timeScale: 2.4,
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  const handleLeave = () => {
    if (!wrapRef.current || !visibleRef.current) return

    gsap.to(wrapRef.current, {
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    })

    gsap.to(coreRef.current, {
      boxShadow: overFooterRef.current ? SHADOW_RED : SHADOW_GREEN,
      duration: 0.35,
      ease: 'power2.out',
    })

    gsap.to(ringTweenRef.current, {
      timeScale: 1,
      duration: 0.45,
      ease: 'power2.out',
    })
  }

  return createPortal(
    <div
      ref={wrapRef}
      className="fixed bottom-5 right-4 z-[200] lg:bottom-8 lg:right-8"
    >
      <button
        type="button"
        aria-label="Scroll to top"
        onClick={handleClick}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative flex size-[70px] cursor-pointer items-center justify-center will-change-transform lg:size-[88px]"
      >
        <div ref={ringSpinRef} className="absolute inset-0 size-full">
          <div ref={ringFadeRef} className="absolute inset-0 size-full">
            <CircularTextRing ringTextRef={ringTextRef} pathId={pathId} />
          </div>
        </div>

        <span
          ref={coreRef}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-bg-primary shadow-[0_8px_24px_rgba(0,74,92,0.16)] lg:h-14 lg:w-14"
        >
          <img
            ref={logoGreenRef}
            src={logoIconGreen}
            alt=""
            className="absolute h-6 w-[17px] object-contain lg:h-8 lg:w-[22px]"
          />
          <img
            ref={logoRedRef}
            src={logoIcon}
            alt=""
            className="absolute h-6 w-[17px] object-contain lg:h-8 lg:w-[22px]"
          />
        </span>
      </button>
    </div>,
    document.body,
  )
}
