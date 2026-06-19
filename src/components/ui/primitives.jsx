export function SectionBadge({ children, variant = 'teal' }) {
  const variants = {
    teal: 'border-brand-secondary/25 text-brand-secondary',
    red: 'border-brand-primary/35 text-brand-primary',
  }

  return (
    <span
      className={`inline-flex h-7 items-center rounded-[30px] border px-6 text-xs font-medium backdrop-blur-[1.75px] lg:h-[39px] lg:px-4 lg:text-sm ${variants[variant]}`}
    >
      {children}
    </span>
  )
}

export function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex h-12 items-center justify-center rounded-full bg-brand-primary px-6 text-base font-medium text-text-inverse shadow-[0_0_5px_1px_rgba(0,0,0,0.09)] transition hover:brightness-110 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex h-12 items-center justify-center rounded-full bg-bg-primary px-6 text-base font-medium text-text-primary transition hover:bg-white ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function SectionHeading({
  badge,
  badgeVariant = 'teal',
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignClass =
    align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <div className={`flex flex-col gap-3 md:gap-4 lg:gap-5 ${alignClass} ${className}`}>
      {badge && <SectionBadge variant={badgeVariant}>{badge}</SectionBadge>}
      {title && (
        <h2 className="max-w-[345px] text-[28px] font-bold capitalize leading-[1.15] tracking-[-0.7px] text-text-primary min-[360px]:max-w-[686px] min-[360px]:text-[32px] min-[360px]:tracking-[-0.8px] md:max-w-[760px] lg:max-w-none lg:text-[48px] lg:leading-tight lg:tracking-[-0.6px]">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="max-w-[345px] text-[14px] leading-5 text-text-secondary min-[360px]:max-w-[655px] min-[360px]:text-base min-[360px]:leading-normal md:max-w-[760px] lg:max-w-[655px] lg:text-xl lg:leading-normal">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function Container({ children, className = '' }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-5 md:max-w-[760px] md:px-8 lg:max-w-[1440px] lg:px-20 ${className}`}
    >
      {children}
    </div>
  )
}
