import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../components/ui/Toast'
import { api, ApiError } from '../../lib/api'
import AnimatedActionButton from '../../components/landing/AnimatedActionButton'
import PasswordInput from '../../components/admin/PasswordInput'

const inputClass =
  'h-12 w-full rounded-2xl border border-border-subtle bg-bg-secondary px-4 text-base text-text-primary placeholder:text-text-secondary/70 outline-none transition focus:border-brand-secondary focus:bg-white'

export default function AdminLoginPage() {
  const { login, isAuthenticated } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const pageRef = useRef(null)
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [lockoutSeconds, setLockoutSeconds] = useState(0)

  useEffect(() => {
    document.body.classList.add('admin-scroll')
    return () => document.body.classList.remove('admin-scroll')
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard/user-capture', { replace: true })
    }
  }, [isAuthenticated, navigate])

  useGSAP(
    () => {
      const card = pageRef.current?.querySelector('.auth-card')
      if (!card) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(card, { autoAlpha: 1 })
        return
      }

      gsap.fromTo(card, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: 'power2.out' })
    },
    { scope: pageRef },
  )

  useEffect(() => {
    if (!form.email.trim()) {
      setLockoutSeconds(0)
      return undefined
    }

    let active = true

    const fetchStatus = () => {
      api
        .getLoginStatus(form.email)
        .then((res) => {
          if (!active) return
          setLockoutSeconds(res.data.locked ? res.data.lockoutSeconds : 0)
        })
        .catch(() => {
          if (active) setLockoutSeconds(0)
        })
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, 1000)
    return () => {
      active = false
      clearInterval(interval)
    }
  }, [form.email])

  const isLocked = lockoutSeconds > 0

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isLocked) {
      toast.warning(
        `Too many failed attempts. Try again in ${Math.ceil(lockoutSeconds / 60)} min.`,
        'Account locked',
      )
      return
    }

    setLoading(true)

    try {
      await login(form)
      toast.success('Welcome back!', 'Login successful')
      navigate('/admin/dashboard/user-capture')
    } catch (error) {
      const meta = error instanceof ApiError ? error.meta : {}

      if (meta.lockoutSeconds) {
        setLockoutSeconds(meta.lockoutSeconds)
      }

      if (meta.locked) {
        toast.warning(
          error.message || 'Too many failed attempts. You are blocked for 2 minutes.',
          'Account locked',
        )
      } else if (meta.attemptsLeft !== undefined) {
        toast.error(
          error.message || 'Invalid email or password',
          `${meta.attemptsLeft} attempt${meta.attemptsLeft === 1 ? '' : 's'} left`,
        )
      } else {
        toast.error(error.message || 'Login failed', 'Error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      ref={pageRef}
      className="admin-scroll flex min-h-[100dvh] items-center justify-center bg-[#004A5C] px-4 py-8 sm:px-5 sm:py-10"
    >
      <div className="auth-card mx-auto w-full max-w-[440px] rounded-[22px] border border-white/10 bg-bg-surface p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:rounded-[28px] sm:p-8">
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-secondary">
            Admin Portal
          </p>
          <h1 className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">Sign in</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Access the Trubbi admin dashboard
          </p>
        </div>

        {isLocked && (
          <div className="mb-5 rounded-2xl border border-[#F59F00]/30 bg-[#F59F00]/10 px-4 py-3 text-sm text-[#9a6700]">
            Locked for {Math.floor(lockoutSeconds / 60)}:
            {String(lockoutSeconds % 60).padStart(2, '0')} after 5 failed attempts.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text-primary">Email</span>
            <input
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))}
              className={inputClass}
              placeholder="you@company.com"
            />
          </label>

          <PasswordInput
            label="Password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm((c) => ({ ...c, password: e.target.value }))}
            disabled={isLocked}
            required
          />

          <AnimatedActionButton
            type="submit"
            disabled={loading || isLocked}
            className="mt-2 h-12 w-full bg-brand-primary text-base text-white shadow-[0_8px_24px_rgba(255,75,85,0.35)]"
            restShadow="0 8px 24px rgba(255, 75, 85, 0.35)"
            hoverShadow="0 14px 32px rgba(255, 75, 85, 0.48)"
          >
            {loading ? 'Signing in…' : isLocked ? 'Locked' : 'Sign in'}
          </AnimatedActionButton>
        </form>
      </div>
    </div>
  )
}
