import { useState } from 'react'

const inputClass =
  'h-12 w-full rounded-2xl border border-border-subtle bg-bg-secondary px-4 pr-12 text-base text-text-primary placeholder:text-text-secondary/70 outline-none transition focus:border-brand-secondary focus:bg-white'

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 3l18 18" strokeLinecap="round" />
        <path
          d="M10.58 10.58a2 2 0 0 0 2.83 2.83M9.88 5.09A10.94 10.94 0 0 1 12 5c5.52 0 10 4.48 10 7a11.27 11.27 0 0 1-1.67 2.58M6.61 6.61A11.27 11.27 0 0 0 2 12c0 2.52 4.48 7 10 7 1.05 0 2.06-.16 3-.45"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export default function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  disabled = false,
  required = false,
  minLength,
  className = '',
  id,
}) {
  const [visible, setVisible] = useState(false)

  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <span className="text-sm font-medium text-text-primary">{label}</span>
      )}
      <div className="relative">
        <input
          id={id}
          required={required}
          disabled={disabled}
          minLength={minLength}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={visible ? 'Hide password' : 'Show password'}
          disabled={disabled}
          onClick={() => setVisible((current) => !current)}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-text-secondary transition hover:bg-bg-primary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <EyeIcon open={visible} />
        </button>
      </div>
    </label>
  )
}
