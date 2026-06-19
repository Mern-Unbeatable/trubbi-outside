import { useWaitlist } from './WaitlistProvider'
import AnimatedActionButton from './AnimatedActionButton'

const variants = {
  primary:
    'bg-[#ff4b55] text-white shadow-[0_0_5px_1px_rgba(0,0,0,0.09)]',
  nav: 'bg-[#ff4d54] text-white shadow-[0_0_5px_1px_rgba(0,0,0,0.09)]',
  cta: 'border border-white/50 bg-[#ff4b55] text-white',
}

export default function WaitlistButton({
  className = '',
  children = 'Join Waitlist',
  variant = 'primary',
  onOpen,
}) {
  const { openWaitlist } = useWaitlist()

  const handleClick = () => {
    openWaitlist()
    onOpen?.()
  }

  return (
    <AnimatedActionButton
      type="button"
      onClick={handleClick}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </AnimatedActionButton>
  )
}
