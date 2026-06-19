import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function useAnimatedButtonHover(
  restShadow = '0 0 5px 1px rgba(0,0,0,0.09)',
  hoverShadow = '0 14px 32px rgba(255, 75, 85, 0.42)',
  disabled = false,
) {
  const buttonRef = useRef(null)
  const shineRef = useRef(null)

  useGSAP(
    () => {
      const button = buttonRef.current
      const shine = shineRef.current
      if (!button || !shine || disabled) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const onEnter = () => {
        gsap.to(button, {
          scale: 1.06,
          y: -2,
          boxShadow: hoverShadow,
          duration: 0.35,
          ease: 'back.out(2)',
        })
        gsap.to(shine, {
          x: '140%',
          duration: 0.65,
          ease: 'power2.out',
        })
      }

      const onLeave = () => {
        gsap.to(button, {
          scale: 1,
          x: 0,
          y: 0,
          boxShadow: restShadow,
          duration: 0.4,
          ease: 'power2.out',
        })
        gsap.set(shine, { x: '-120%' })
      }

      const onMove = (event) => {
        const rect = button.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8

        gsap.to(button, {
          x,
          y: y - 2,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      button.addEventListener('mouseenter', onEnter)
      button.addEventListener('mouseleave', onLeave)
      button.addEventListener('mousemove', onMove)

      return () => {
        button.removeEventListener('mouseenter', onEnter)
        button.removeEventListener('mouseleave', onLeave)
        button.removeEventListener('mousemove', onMove)
      }
    },
    { scope: buttonRef, dependencies: [disabled] },
  )

  return { buttonRef, shineRef }
}
