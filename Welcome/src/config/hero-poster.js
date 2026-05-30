import hero01 from '@/assets/images/bg/01.jpg'
import hero02 from '@/assets/images/bg/02.jpg'
import hero03 from '@/assets/images/bg/03.jpg'
import hero04 from '@/assets/images/bg/04.jpg'

const BY_FILENAME = {
  '01.jpg': hero01,
  '02.jpg': hero02,
  '03.jpg': hero03,
  '04.jpg': hero04,
  '001.jpg': hero01,
}

function bundledPosterUrl(filename) {
  return BY_FILENAME[filename] || null
}

export function resolveHeroPosterPath(envPath) {
  if (!envPath) return ''
  const trimmed = String(envPath).trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  const file = trimmed.split('/').pop() || trimmed
  return bundledPosterUrl(file) || (trimmed.startsWith('/') ? trimmed : `/${trimmed}`)
}

export const HAS_CUSTOM_HERO_POSTER = Boolean(
  String(import.meta.env.VITE_HERO_VIDEO_POSTER || '').trim()
)

export function resolveHeroPosterInstant(resolvedFullUrl) {
  const fast = resolveHeroPosterPath(import.meta.env.VITE_HERO_VIDEO_POSTER_FAST || '')
  if (fast && fast !== resolvedFullUrl) return fast

  if (HAS_CUSTOM_HERO_POSTER && resolvedFullUrl) {
    const light = hero04
    if (light && light !== resolvedFullUrl) return light
  }

  return ''
}
