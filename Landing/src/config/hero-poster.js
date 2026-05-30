import hero01 from '@/assets/images/bg/01.jpg'
import hero02 from '@/assets/images/bg/02.jpg'
import hero03 from '@/assets/images/bg/03.jpg'
import hero04 from '@/assets/images/bg/04.jpg'

/** All images under src/assets/images/bg (includes custom 001.webp etc.) */
const BG_GLOB = import.meta.glob('@/assets/images/bg/*.{jpg,jpeg,webp,png,JPG,WEBP,PNG}', {
  eager: true,
  import: 'default',
})

/** Map env paths / filenames → Vite-resolved asset URLs */
const BY_FILENAME = {
  '01.jpg': hero01,
  '02.jpg': hero02,
  '03.jpg': hero03,
  '04.jpg': hero04,
  '001.jpg': hero01,
}

function bundledPosterUrl(filename) {
  if (!filename) return null
  const entry = Object.entries(BG_GLOB).find(([path]) => {
    const base = path.split('/').pop()
    return base === filename
  })
  return entry ? entry[1] : null
}

/**
 * Resolve VITE_HERO_VIDEO_POSTER for dev/build.
 * Raw `/assets/images/...` paths are not served by Vite unless imported.
 */
export function resolveHeroPosterPath(envPath) {
  if (!envPath) return ''
  const trimmed = String(envPath).trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  const file = trimmed.split('/').pop() || trimmed
  return bundledPosterUrl(file) || BY_FILENAME[file] || (trimmed.startsWith('/') ? trimmed : `/${trimmed}`)
}

/** True when VITE_HERO_VIDEO_POSTER is set — never use YouTube frame as poster */
export const HAS_CUSTOM_HERO_POSTER = Boolean(
  String(import.meta.env.VITE_HERO_VIDEO_POSTER || '').trim()
)

/**
 * Small image shown under the WebP/JPG poster until the main file paints (avoids empty hero).
 * Uses VITE_HERO_VIDEO_POSTER_FAST, else a light bundled frame (04.jpg).
 */
export function resolveHeroPosterInstant(resolvedFullUrl) {
  const fast = resolveHeroPosterPath(import.meta.env.VITE_HERO_VIDEO_POSTER_FAST || '')
  if (fast && fast !== resolvedFullUrl) return fast

  if (HAS_CUSTOM_HERO_POSTER && resolvedFullUrl) {
    const light = bundledPosterUrl('04.jpg') || hero04
    if (light && light !== resolvedFullUrl) return light
  }

  return ''
}
