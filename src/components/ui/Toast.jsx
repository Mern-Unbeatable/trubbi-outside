import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'

const ToastContext = createContext(null)

const TOAST_STYLES = {
  success: {
    bg: '#2F9E44',
    icon: '✓',
  },
  warning: {
    bg: '#F59F00',
    icon: '!',
  },
  error: {
    bg: '#E03131',
    icon: '!',
  },
}

function ToastItem({ toast, onRemove }) {
  const ref = useRef(null)

  const dismiss = useCallback(() => {
    const el = ref.current
    if (!el) {
      onRemove(toast.id)
      return
    }

    gsap.to(el, {
      x: 120,
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => onRemove(toast.id),
    })
  }, [onRemove, toast.id])

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    gsap.fromTo(
      el,
      { x: 120, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.45, ease: 'back.out(1.4)' },
    )

    const timer = setTimeout(dismiss, toast.duration || 4000)
    return () => clearTimeout(timer)
  }, [dismiss, toast.duration])

  const style = TOAST_STYLES[toast.type] || TOAST_STYLES.success

  return (
    <div
      ref={ref}
      role="alert"
      className="pointer-events-auto flex w-full max-w-[380px] items-start gap-3 overflow-hidden rounded-2xl bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
        style={{ backgroundColor: style.bg }}
      >
        {style.icon}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        {toast.title && (
          <p className="text-sm font-bold text-text-primary">{toast.title}</p>
        )}
        <p className="text-sm text-text-secondary">{toast.message}</p>
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={dismiss}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm text-text-tertiary transition hover:bg-bg-secondary hover:text-text-primary"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(({ type = 'success', title, message, duration = 4000 }) => {
    const id = crypto.randomUUID()
    setToasts((current) => [...current, { id, type, title, message, duration }])
    return id
  }, [])

  const value = useMemo(
    () => ({
      showToast,
      success: (message, title) => showToast({ type: 'success', message, title }),
      warning: (message, title) => showToast({ type: 'warning', message, title }),
      error: (message, title) => showToast({ type: 'error', message, title }),
    }),
    [showToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed right-4 top-4 z-[500] flex flex-col gap-3 sm:right-6 sm:top-6">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
