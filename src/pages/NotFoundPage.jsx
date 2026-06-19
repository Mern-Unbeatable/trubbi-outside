import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import logoIcon from '../assets/landing/logo-icon.svg'
import AnimatedActionButton from '../components/landing/AnimatedActionButton'

export default function NotFoundPage() {
  const location = useLocation()
  const pageRef = useRef(null)
  const navigate = useNavigate()
  const isAdmin = location.pathname.startsWith('/admin')

  useEffect(() => {
    document.body.classList.add('admin-scroll')
    document.title = 'Page not found — Trubbi'

    return () => {
      document.body.classList.remove('admin-scroll')
      document.title = 'Trubbi — Plan group trips without the chaos'
    }
  }, [])

  useGSAP(
    () => {
      const card = pageRef.current?.querySelector('.not-found-card')
      if (!card) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(card, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' },
      )
    },
    { scope: pageRef },
  )

  return (
    <div
      ref={pageRef}
      className="admin-scroll flex min-h-[100dvh] items-center justify-center bg-[#004A5C] px-4 py-8 sm:px-5 sm:py-10"
    >
      <div className="not-found-card mx-auto w-full max-w-[440px] rounded-[22px] border border-white/10 bg-bg-surface p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:rounded-[28px] sm:p-8">
        <img
          src={logoIcon}
          alt=""
          width={50}
          height={72}
          className="mx-auto block"
          aria-hidden
        />

        <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-brand-secondary sm:mt-8">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">Page not found</h1>
        <p className="mt-2 text-sm text-text-secondary sm:text-base">
          {isAdmin
            ? 'This admin page does not exist or you may not have access.'
            : 'The page you are looking for does not exist or has been moved.'}
        </p>

        <AnimatedActionButton
          type="button"
          onClick={() => navigate('/')}
          className="mt-6 h-12 w-full bg-brand-primary text-base text-white shadow-[0_8px_24px_rgba(255,75,85,0.35)] sm:mt-8"
          restShadow="0 8px 24px rgba(255, 75, 85, 0.35)"
          hoverShadow="0 14px 32px rgba(255, 75, 85, 0.48)"
        >
          Back to home
        </AnimatedActionButton>
      </div>
    </div>
  )
}
