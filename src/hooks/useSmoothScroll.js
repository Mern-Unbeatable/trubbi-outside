import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import {
  DESKTOP_MEDIA_QUERY,
  isDesktopViewport,
  prefersReducedMotion,
} from './useLandingAnimations'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const NATIVE_SCROLL_CLASS = 'native-scroll'

function enableNativeScroll() {
  document.body.classList.add(NATIVE_SCROLL_CLASS)
}

function disableNativeScroll() {
  document.body.classList.remove(NATIVE_SCROLL_CLASS)
}

export function useSmoothScroll(wrapperRef, contentRef) {
  const smootherRef = useRef(null)

  useLayoutEffect(() => {
    let smoother = null
    let cancelled = false

    const setup = () => {
      smoother?.kill()
      smoother = null
      smootherRef.current = null

      if (prefersReducedMotion() || !isDesktopViewport()) {
        enableNativeScroll()
        ScrollTrigger.refresh()
        scrollToInitialHash()
        return
      }

      disableNativeScroll()

      const wrapper = wrapperRef.current
      const content = contentRef.current
      if (!wrapper || !content) return

      smoother = ScrollSmoother.create({
        wrapper,
        content,
        smooth: 2.2,
        smoothTouch: 0.1,
        normalizeScroll: true,
      })

      smootherRef.current = smoother

      if (window.location.hash) {
        scrollToInitialHash()
      } else {
        smoother.scrollTop(0)
      }

      ScrollTrigger.refresh()
    }

    setup()

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)
    const handleViewportChange = () => {
      if (cancelled) return
      setup()
    }

    mediaQuery.addEventListener('change', handleViewportChange)

    return () => {
      cancelled = true
      mediaQuery.removeEventListener('change', handleViewportChange)
      smoother?.kill()
      smootherRef.current = null
      disableNativeScroll()
    }
  }, [wrapperRef, contentRef])

  return smootherRef
}

export function getScrollSmoother() {
  return ScrollSmoother.get()
}

export function scrollToSection(href, { instant = false } = {}) {
  if (typeof window === 'undefined') return

  const smooth = !instant && !prefersReducedMotion()
  const headerOffset = isDesktopViewport() ? 32 : 88

  if (!href || href === '#') {
    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.scrollTo(0, smooth)
    } else {
      window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
    }
    window.history.pushState(null, '', window.location.pathname)
    return
  }

  const target = document.querySelector(href)
  if (!target) return

  const smoother = ScrollSmoother.get()
  if (smoother && isDesktopViewport()) {
    smoother.scrollTo(target, smooth, `top ${headerOffset}px`)
    window.history.pushState(null, '', href)
    return
  }

  const scrollTop =
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0

  const top = Math.max(
    0,
    target.getBoundingClientRect().top + scrollTop - headerOffset,
  )

  window.scrollTo({
    top,
    behavior: smooth ? 'smooth' : 'auto',
  })

  document.documentElement.scrollTop = top

  window.history.pushState(null, '', href)
}

function scrollToInitialHash() {
  const hash = window.location.hash
  if (!hash) return

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToSection(hash, { instant: true })
      ScrollTrigger.refresh()
    })
  })
}
