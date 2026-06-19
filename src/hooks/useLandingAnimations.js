import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLandingAnimations() {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true })

    const onRefresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', onRefresh)
    window.addEventListener('resize', onRefresh)

    return () => {
      window.removeEventListener('load', onRefresh)
      window.removeEventListener('resize', onRefresh)
    }
  }, [])
}

export const DESKTOP_MEDIA_QUERY = '(min-width: 1024px)'

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isDesktopViewport() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches
}

/** Play scroll-reveal once; avoids reverse/restart jank while scrolling */
export const SCROLL_REVEAL_ONCE = {
  toggleActions: 'play none none none',
  once: true,
}
