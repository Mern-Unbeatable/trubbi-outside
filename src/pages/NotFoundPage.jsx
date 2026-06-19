import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoIconGreen from '../assets/landing/logo-icon-green.svg'

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
    <div className="admin-scroll flex min-h-[100dvh] items-center justify-center bg-brand-primary px-4 py-10">
      <div className="mx-auto w-full max-w-lg text-center">
        <img
          src={logoIconGreen}
          alt=""
          width={50}
          height={72}
          className="mx-auto block"
          aria-hidden
        />

        <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-white/80">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Page not found</h1>
        <p className="mt-3 text-sm text-white/90 sm:text-base">
          {isAdmin
            ? 'This admin page does not exist or you may not have access.'
            : 'The page you are looking for does not exist or has been moved.'}
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-full bg-white px-6 text-base font-medium text-brand-primary shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition hover:brightness-110"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
