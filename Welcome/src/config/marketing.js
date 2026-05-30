import { resolveHeroPosterPath } from './hero-poster'

/** Parse YouTube watch / youtu.be / embed URLs → 11-char video id */
export function parseYouTubeId(value) {
  if (!value) return null
  const trimmed = String(value).trim()
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed
  try {
    const url = new URL(trimmed)
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.replace(/^\//, '').split('/')[0] || null
    }
    const v = url.searchParams.get('v')
    if (v) return v
    const embed = url.pathname.match(/\/embed\/([^/?]+)/)
    if (embed) return embed[1]
  } catch {
    /* not a URL */
  }
  return null
}

export const HERO_YOUTUBE_ID = parseYouTubeId(
  import.meta.env.VITE_HERO_YOUTUBE_ID ||
    import.meta.env.VITE_HERO_YOUTUBE_URL ||
    'BYygyprG-7M'
)

export function heroYouTubeThumbnailUrl(videoId, quality = 'hqdefault') {
  if (!videoId) return ''
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
}

export const HERO_YOUTUBE_COVER_BLEED = 1.45

export function heroYouTubeEmbedUrl(videoId, options = {}) {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    iv_load_policy: '3',
    cc_load_policy: '0',
    disablekb: '1',
    fs: '0',
    enablejsapi: '1',
  })
  if (options.origin) params.set('origin', options.origin)
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
}

export const HERO_VIDEO = {
  src: import.meta.env.VITE_HERO_VIDEO_URL || '/videos/dubai-hero.mp4',
  poster: resolveHeroPosterPath(import.meta.env.VITE_HERO_VIDEO_POSTER || ''),
  posterFast: resolveHeroPosterPath(import.meta.env.VITE_HERO_VIDEO_POSTER_FAST || ''),
}
