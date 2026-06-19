import { scrollToSection } from '../../hooks/useSmoothScroll'

export default function SmoothScrollLink({
  href,
  className = '',
  children,
  onNavigate,
  ...props
}) {
  const handleClick = (event) => {
    event.preventDefault()

    if (!href?.startsWith('#')) return

    if (onNavigate) {
      onNavigate(href)
      return
    }

    scrollToSection(href)
  }

  return (
    <a href="/" className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
