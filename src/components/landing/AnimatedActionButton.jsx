import useAnimatedButtonHover from '../../hooks/useAnimatedButtonHover'

export default function AnimatedActionButton({
  children,
  className = '',
  type = 'button',
  onClick,
  restShadow = '0 0 5px 1px rgba(0,0,0,0.09)',
  hoverShadow = '0 14px 32px rgba(255, 75, 85, 0.42)',
}) {
  const { buttonRef, shineRef } = useAnimatedButtonHover(restShadow, hoverShadow)

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      className={`relative inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full px-6 text-base font-medium will-change-transform ${className}`}
    >
      <span
        ref={shineRef}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full skew-x-[-20deg] bg-white/25"
      />
      <span className="relative z-[1]">{children}</span>
    </button>
  )
}
