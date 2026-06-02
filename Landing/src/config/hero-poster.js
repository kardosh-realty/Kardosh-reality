import hero01 from '@/assets/images/bg/01.jpg'
import hero02 from '@/assets/images/bg/02.jpg'
import hero03 from '@/assets/images/bg/03.jpg'
import hero04 from '@/assets/images/bg/04.jpg'
import hero001 from '@/assets/images/bg/001-hero.webp'

/** Default hero still shown until background video plays */
export const DEFAULT_HERO_POSTER = hero001

/** Map env paths / filenames → Vite-resolved asset URLs */
const BY_FILENAME = {
  '01.jpg': hero01,
  '02.jpg': hero02,
  '03.jpg': hero03,
  '04.jpg': hero04,
  '001.jpg': hero01,
  '001.webp': hero001,
  '001-hero.webp': hero001,
}

/**
 * Resolve VITE_HERO_VIDEO_POSTER for dev/build.
 * Raw `/assets/images/...` paths are not served by Vite unless imported.
 */
export function resolveHeroPosterPath(envPath) {
  if (!envPath) return DEFAULT_HERO_POSTER
  const trimmed = String(envPath).trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  const file = trimmed.split('/').pop() || trimmed
  return BY_FILENAME[file] || (trimmed.startsWith('/') ? trimmed : `/${trimmed}`)
}

/** True when VITE_HERO_VIDEO_POSTER is set — never use YouTube frame as poster */
export const HAS_CUSTOM_HERO_POSTER = Boolean(
  String(import.meta.env.VITE_HERO_VIDEO_POSTER || '').trim()
)

/**
 * Optional tiny placeholder while the main poster loads.
 * We do not stack a different stock image under the brand poster by default.
 */
export function resolveHeroPosterInstant(resolvedFullUrl) {
  const fast = resolveHeroPosterPath(import.meta.env.VITE_HERO_VIDEO_POSTER_FAST || '')
  if (fast && fast !== resolvedFullUrl) return fast
  return ''
}
