import { scrollToSection } from '../../hooks/useSmoothScroll'

export default function SmoothScrollLink({
  href,
  className = '',
  children,
  onNavigate,
  ...props
}) {
  const handleClick = (event) => {
    if (!href?.startsWith('#')) return

    event.preventDefault()

    if (onNavigate) {
      onNavigate(href)
      return
    }

    scrollToSection(href)
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
