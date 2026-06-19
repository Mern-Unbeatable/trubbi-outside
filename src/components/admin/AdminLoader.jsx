import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AdminLoader({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const tween = gsap.to(el, {
      rotation: 360,
      duration: 0.9,
      ease: 'none',
      repeat: -1,
    })

    return () => tween.kill()
  }, [])

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div
        ref={ref}
        className="h-10 w-10 rounded-full border-[3px] border-border-subtle border-t-brand-primary"
      />
      <p className="text-sm font-medium text-text-secondary">Loading captures…</p>
    </div>
  )
}
