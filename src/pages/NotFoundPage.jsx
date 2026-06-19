import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoIcon from '../assets/landing/logo-icon.svg'

export default function NotFoundPage() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  useEffect(() => {
    document.body.classList.add('admin-scroll')
    document.title = 'Page not found — Trubbi'

    return () => {
      document.body.classList.remove('admin-scroll')
      document.title = 'Trubbi — Plan group trips without the chaos'
    }
  }, [])

  return (
    <div className="admin-scroll flex min-h-[100dvh] items-center justify-center bg-bg-primary px-4 py-10">
      <div className="mx-auto w-full max-w-lg text-center">
        <img src={logoIcon} alt="" className="mx-auto h-14 w-auto" aria-hidden />

        <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-brand-secondary">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">Page not found</h1>
        <p className="mt-3 text-sm text-text-secondary sm:text-base">
          {isAdmin
            ? 'This admin page does not exist or you may not have access.'
            : 'The page you are looking for does not exist or has been moved.'}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-full bg-brand-primary px-6 text-base font-medium text-white shadow-[0_8px_24px_rgba(255,75,85,0.35)] transition hover:brightness-110"
          >
            Back to home
          </Link>
          {isAdmin && (
            <Link
              to="/admin/login"
              className="inline-flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-full border border-border-subtle bg-bg-surface px-6 text-base font-medium text-text-primary transition hover:border-brand-secondary hover:text-brand-secondary"
            >
              Admin login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
