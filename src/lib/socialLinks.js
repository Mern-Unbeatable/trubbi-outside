import {
  socialInsta,
  socialTiktok,
  socialYt,
} from '../assets/landing'

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', pattern: /(?:^|\.)instagram\.com/i, icon: socialInsta },
  { id: 'tiktok', label: 'TikTok', pattern: /(?:^|\.)tiktok\.com/i, icon: socialTiktok },
  { id: 'youtube', label: 'YouTube', pattern: /(?:^|\.)(?:youtube\.com|youtu\.be)/i, icon: socialYt },
  { id: 'twitter', label: 'X (Twitter)', pattern: /(?:^|\.)(?:twitter\.com|x\.com)/i },
  { id: 'whatsapp', label: 'WhatsApp', pattern: /(?:^|\.)(?:wa\.me|whatsapp\.com|api\.whatsapp\.com)/i },
  { id: 'facebook', label: 'Facebook', pattern: /(?:^|\.)(?:facebook\.com|fb\.com|fb\.me)/i },
  { id: 'linkedin', label: 'LinkedIn', pattern: /(?:^|\.)linkedin\.com/i },
  { id: 'pinterest', label: 'Pinterest', pattern: /(?:^|\.)pinterest\.com/i },
  { id: 'snapchat', label: 'Snapchat', pattern: /(?:^|\.)snapchat\.com/i },
  { id: 'discord', label: 'Discord', pattern: /(?:^|\.)(?:discord\.gg|discord\.com)/i },
  { id: 'telegram', label: 'Telegram', pattern: /(?:^|\.)(?:t\.me|telegram\.me|telegram\.org)/i },
  { id: 'threads', label: 'Threads', pattern: /(?:^|\.)threads\.net/i },
]

function normalizeHref(value) {
  const trimmed = String(value ?? '').trim()
  if (!trimmed || trimmed === '#') return null
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export function resolveSocialLink(input) {
  const href = normalizeHref(typeof input === 'string' ? input : input?.href)
  if (!href) return null

  const labelOverride =
    typeof input === 'object' && input?.label ? String(input.label).trim() : ''

  let hostname = ''
  try {
    hostname = new URL(href).hostname.replace(/^www\./i, '')
  } catch {
    return {
      href,
      label: labelOverride || 'Link',
      icon: null,
      isExternal: true,
    }
  }

  const platform = PLATFORMS.find(({ pattern }) => pattern.test(hostname))

  return {
    href,
    label: labelOverride || platform?.label || formatHostname(hostname),
    icon: platform?.icon ?? null,
    isExternal: true,
  }
}

function formatHostname(hostname) {
  const base = hostname.split('.')[0] ?? hostname
  return base.charAt(0).toUpperCase() + base.slice(1)
}

export function resolveSocialLinks(links = []) {
  return links.map(resolveSocialLink).filter(Boolean)
}
