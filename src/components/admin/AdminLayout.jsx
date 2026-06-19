import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  {
    to: '/admin/dashboard/user-capture',
    label: 'User Capture',
    end: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/admin/dashboard/analytics',
    label: 'Analytics',
    end: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" />
      </svg>
    ),
  },
]

const pageTitles = {
  '/admin/dashboard/user-capture': 'User Capture',
  '/admin/dashboard/analytics': 'Analytics',
  '/admin/dashboard/profile': 'Profile',
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}

export default function AdminLayout() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const contentRef = useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const pageTitle = pageTitles[location.pathname] || 'Dashboard'

  useEffect(() => {
    document.body.classList.add('admin-scroll')
    return () => document.body.classList.remove('admin-scroll')
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(content, { autoAlpha: 1, y: 0 })
      return
    }

    gsap.fromTo(
      content,
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' },
    )
  }, [location.pathname])

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="admin-scroll min-h-screen bg-bg-primary">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border-subtle bg-bg-surface/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <button
          type="button"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen((open) => !open)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-text-primary transition hover:bg-bg-secondary"
        >
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <p className="text-sm font-semibold text-text-primary">{pageTitle}</p>
        <div className="h-10 w-10" aria-hidden />
      </header>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-[#004A5C]/50 backdrop-blur-[2px] lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <div className="flex min-h-[calc(100dvh-57px)] lg:min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[min(288px,88vw)] flex-col border-r border-border-subtle bg-bg-surface px-4 py-5 transition-transform duration-300 ease-out sm:px-5 sm:py-6 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-[280px] lg:shrink-0 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-6 px-2 lg:mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-secondary">
              Trubbi Admin
            </p>
            <h1 className="mt-1 text-lg font-bold text-text-primary sm:text-xl">Dashboard</h1>
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-secondary text-white shadow-[0_8px_24px_rgba(0,74,92,0.25)]'
                      : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-border-subtle bg-bg-secondary p-4">
            <button
              type="button"
              onClick={() => {
                closeSidebar()
                navigate('/admin/dashboard/profile')
              }}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-xl p-1 text-left transition hover:bg-bg-primary/60 ${
                location.pathname === '/admin/dashboard/profile'
                  ? 'ring-2 ring-brand-secondary/30'
                  : ''
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-sm font-bold text-white">
                {admin?.firstName?.[0]}
                {admin?.lastName?.[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-text-primary">
                  {admin?.firstName} {admin?.lastName}
                </p>
                <p className="truncate text-xs text-text-secondary">{admin?.email}</p>
                <p className="mt-0.5 text-xs font-medium text-brand-secondary">Profile & password</p>
              </div>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 w-full cursor-pointer rounded-full bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
            >
              Log out
            </button>
          </div>
        </aside>

        <main className="flex flex-1 justify-center overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-10">
          <div ref={contentRef} className="w-full max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
