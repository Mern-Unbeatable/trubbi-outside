import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'
import AnimatedActionButton from './AnimatedActionButton'
import { api, ApiError } from '../../lib/api'

const WaitlistContext = createContext(null)

export function useWaitlist() {
  const context = useContext(WaitlistContext)
  if (!context) {
    throw new Error('useWaitlist must be used within WaitlistProvider')
  }
  return context
}

function WaitlistModal({ open, onClose }) {
  const backdropRef = useRef(null)
  const panelRef = useRef(null)
  const formRef = useRef(null)
  const successRef = useRef(null)
  const closeTweenRef = useRef(null)
  const isClosingRef = useRef(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  const resetForm = useCallback(() => {
    setSubmitted(false)
    setSubmitting(false)
    setError('')
    setForm({ firstName: '', lastName: '', email: '' })
  }, [])

  useEffect(() => {
    const smoother = ScrollSmoother.get()
    if (!smoother) return
    smoother.paused(open)
    return () => smoother.paused(false)
  }, [open])

  const finishClose = useCallback(() => {
    isClosingRef.current = false
    resetForm()
    onClose()
  }, [onClose, resetForm])

  const closeModal = useCallback(() => {
    if (isClosingRef.current) return

    const backdrop = backdropRef.current
    const panel = panelRef.current
    const fields = panel?.querySelectorAll('.waitlist-field')
    const success = successRef.current

    if (!backdrop || !panel) {
      finishClose()
      return
    }

    isClosingRef.current = true
    closeTweenRef.current?.kill()

    const targets = submitted && success ? [success] : fields ? [...fields] : []

    gsap.killTweensOf([backdrop, panel, ...targets, formRef.current, success])

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishClose()
      return
    }

    closeTweenRef.current = gsap.timeline({
      onComplete: finishClose,
    })

    if (targets.length) {
      closeTweenRef.current.to(targets, {
        y: 16,
        autoAlpha: 0,
        duration: 0.2,
        stagger: 0.04,
        ease: 'power2.in',
      })
    }

    closeTweenRef.current
      .to(
        panel,
        { y: 32, autoAlpha: 0, scale: 0.96, duration: 0.28, ease: 'power2.in' },
        targets.length ? '-=0.05' : 0,
      )
      .to(backdrop, { autoAlpha: 0, duration: 0.22, ease: 'power2.in' }, '-=0.12')
  }, [finishClose, submitted])

  useGSAP(
    () => {
      if (!open) return

      const backdrop = backdropRef.current
      const panel = panelRef.current
      const fields = panel?.querySelectorAll('.waitlist-field')
      if (!backdrop || !panel || !fields?.length) return

      gsap.killTweensOf([backdrop, panel, fields, successRef.current])
      gsap.set(backdrop, { autoAlpha: 0 })
      gsap.set(panel, { autoAlpha: 0, y: 48, scale: 0.92 })
      gsap.set(fields, { autoAlpha: 0, y: 24 })
      gsap.set(successRef.current, { autoAlpha: 0, scale: 0.9 })

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set([backdrop, panel, fields], { autoAlpha: 1, y: 0, scale: 1 })
        return
      }

      gsap
        .timeline()
        .to(backdrop, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
        .to(
          panel,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: 'back.out(1.4)',
          },
          '-=0.15',
        )
        .to(
          fields,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.25',
        )
    },
    { dependencies: [open], revertOnUpdate: true },
  )

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeModal()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, closeModal])

  const showSuccess = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSubmitted(true)
      return
    }

    gsap.to(formRef.current, {
      autoAlpha: 0,
      y: -12,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setSubmitted(true)
        gsap.fromTo(
          successRef.current,
          { autoAlpha: 0, scale: 0.85, y: 12 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: 'back.out(1.6)',
          },
        )
      },
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await api.captureUser(form)
      showSuccess()
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Something went wrong. Please try again.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[250] flex h-[100dvh] w-screen items-center justify-center overflow-hidden px-5"
      role="presentation"
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 cursor-pointer bg-[#004A5C]/80 backdrop-blur-[6px]"
        aria-hidden
        onClick={closeModal}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
        className="relative z-[1] w-full max-w-[480px] rounded-[24px] bg-bg-primary p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:rounded-[28px] md:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close waitlist form"
          className="absolute right-4 top-4 z-[2] flex h-8 w-8 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-brand-primary text-lg font-medium leading-none text-white shadow-[0_4px_14px_rgba(255,75,85,0.35)] transition hover:brightness-110 md:right-5 md:top-5 md:h-10 md:w-10 md:text-xl"
          onClick={closeModal}
        >
          ×
        </button>

        {!submitted ? (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
            <div className="waitlist-field flex flex-col gap-1.5 pr-7 md:gap-2 md:pr-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-brand-secondary md:text-sm">
                Waitlist
              </p>
              <h2
                id="waitlist-title"
                className="text-[17px] font-bold leading-[1.15] tracking-[-0.3px] text-text-primary md:text-[32px] md:leading-none"
              >
                Join the Trubbi waitlist
              </h2>
              <p className="text-[13px] leading-5 text-text-secondary md:text-base md:leading-normal">
                Be first to know when we launch.
              </p>
            </div>

            <div className="waitlist-field grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              <label className="flex flex-col gap-1.5 md:gap-2">
                <span className="text-xs font-medium text-text-primary md:text-sm">
                  First name
                </span>
                <input
                  required
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      firstName: event.target.value,
                    }))
                  }
                  className="h-10 rounded-xl border border-border-subtle bg-bg-secondary px-3 text-sm text-text-primary placeholder:text-text-secondary/70 outline-none transition focus:border-brand-secondary focus:bg-white md:h-12 md:rounded-2xl md:px-4 md:text-base"
                />
              </label>

              <label className="flex flex-col gap-1.5 md:gap-2">
                <span className="text-xs font-medium text-text-primary md:text-sm">
                  Last name
                </span>
                <input
                  required
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      lastName: event.target.value,
                    }))
                  }
                  className="h-10 rounded-xl border border-border-subtle bg-bg-secondary px-3 text-sm text-text-primary placeholder:text-text-secondary/70 outline-none transition focus:border-brand-secondary focus:bg-white md:h-12 md:rounded-2xl md:px-4 md:text-base"
                />
              </label>
            </div>

            <label className="waitlist-field flex flex-col gap-1.5 md:gap-2">
              <span className="text-xs font-medium text-text-primary md:text-sm">Email</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                className="h-10 rounded-xl border border-border-subtle bg-bg-secondary px-3 text-sm text-text-primary placeholder:text-text-secondary/70 outline-none transition focus:border-brand-secondary focus:bg-white md:h-12 md:rounded-2xl md:px-4 md:text-base"
              />
            </label>

            {error && (
              <p className="waitlist-field rounded-xl border border-[#E03131]/30 bg-[#E03131]/10 px-4 py-3 text-sm text-[#c92a2a]">
                {error}
              </p>
            )}

            <AnimatedActionButton
              type="submit"
              disabled={submitting}
              className="waitlist-field h-10 w-full bg-brand-primary text-sm text-white shadow-[0_8px_24px_rgba(255,75,85,0.35)] md:h-12 md:text-base"
              restShadow="0 8px 24px rgba(255, 75, 85, 0.35)"
            >
              {submitting ? 'Submitting…' : 'Submit'}
            </AnimatedActionButton>
          </form>
        ) : (
          <div ref={successRef} className="flex flex-col items-center gap-3 py-6 text-center md:gap-4 md:py-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-2xl md:h-16 md:w-16 md:text-3xl">
              ✓
            </div>
            <h2 className="text-[22px] font-bold text-text-primary md:text-[28px]">
              You&apos;re on the list!
            </h2>
            <p className="max-w-[320px] text-sm text-text-secondary md:text-base">
              Thanks for joining, {form.firstName || 'friend'}. We&apos;ll email you
              at {form.email} when Trubbi launches.
            </p>
            <AnimatedActionButton
              type="button"
              onClick={closeModal}
              className="mt-1 h-10 bg-brand-secondary px-6 text-sm text-white md:mt-2 md:h-12 md:px-8 md:text-base"
              restShadow="0 8px 24px rgba(0, 74, 92, 0.25)"
              hoverShadow="0 14px 32px rgba(0, 74, 92, 0.35)"
            >
              Close
            </AnimatedActionButton>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

export default function WaitlistProvider({ children }) {
  const [open, setOpen] = useState(false)

  const openWaitlist = useCallback(() => setOpen(true), [])
  const closeWaitlist = useCallback(() => setOpen(false), [])

  return (
    <WaitlistContext.Provider value={{ openWaitlist, closeWaitlist }}>
      {children}
      <WaitlistModal open={open} onClose={closeWaitlist} />
    </WaitlistContext.Provider>
  )
}
