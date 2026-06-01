import { BRAND } from './brand'
import { resolveHeroPosterPath } from './hero-poster'

const phone = import.meta.env.VITE_WHATSAPP_PHONE || import.meta.env.VITE_CONTACT_PHONE || '97141234567'
const digits = phone.replace(/\D/g, '')

export const WHATSAPP = {
  phone: digits,
  /** wa.me link — no + prefix in path */
  url: `https://wa.me/${digits}`,
  defaultMessage: encodeURIComponent(
    `Hello ${BRAND.name}, I am interested in Dubai off-plan properties. Please contact me.`
  ),
  propertyMessage: (title) =>
    encodeURIComponent(`Hello, I would like more information about: ${title}`),
}

export function whatsAppLink(message) {
  const text = message || WHATSAPP.defaultMessage
  const q = typeof text === 'string' && text.includes('%') ? text : encodeURIComponent(text)
  return `${WHATSAPP.url}?text=${q}`
}

export const ANALYTICS = {
  gtmId: import.meta.env.VITE_GTM_ID || '',
  gaId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID || '',
}

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

/** YouTube only when set in env — no hardcoded default (Vercel does not use .env). */
const HERO_YOUTUBE_ID_FROM_ENV = parseYouTubeId(
  import.meta.env.VITE_HERO_YOUTUBE_ID || import.meta.env.VITE_HERO_YOUTUBE_URL || ''
)

const HERO_FORCE_LOCAL = ['true', '1', 'yes'].includes(
  String(import.meta.env.VITE_HERO_USE_LOCAL_VIDEO || '').toLowerCase()
)

const HERO_FORCE_YOUTUBE = ['false', '0', 'no'].includes(
  String(import.meta.env.VITE_HERO_USE_LOCAL_VIDEO || '').toLowerCase()
)

/**
 * Self-hosted MP4 at public/videos/dubai-hero.mp4 — default when YouTube is not configured.
 * Set VITE_HERO_USE_LOCAL_VIDEO=true on Vercel, or remove VITE_HERO_YOUTUBE_URL there.
 */
export const HERO_USE_LOCAL_VIDEO =
  HERO_FORCE_LOCAL || (!HERO_FORCE_YOUTUBE && !HERO_YOUTUBE_ID_FROM_ENV)

/** Active only when YouTube URL/id is in env and local video is not forced */
export const HERO_YOUTUBE_ID = HERO_USE_LOCAL_VIDEO ? null : HERO_YOUTUBE_ID_FROM_ENV

/** YouTube still frame for hero poster while the embed loads */
export function heroYouTubeThumbnailUrl(videoId, quality = 'hqdefault') {
  if (!videoId) return ''
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
}

/** Extra scale on hero iframe to crop YouTube UI chrome (title, play/pause) */
export const HERO_YOUTUBE_COVER_BLEED = 1.58

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
    /** No playlist= — avoids prev/pause/next playlist controls in the embed */
  })
  if (options.origin) params.set('origin', options.origin)
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
}

/** MP4 fallback when VITE_HERO_YOUTUBE_* is empty — `public/videos/dubai-hero.mp4` */
export const HERO_VIDEO = {
  src: import.meta.env.VITE_HERO_VIDEO_URL || '/videos/dubai-hero.mp4',
  poster: resolveHeroPosterPath(import.meta.env.VITE_HERO_VIDEO_POSTER || ''),
  /** Optional lightweight poster shown while `poster` loads (e.g. WebP ~80kb) */
  posterFast: resolveHeroPosterPath(import.meta.env.VITE_HERO_VIDEO_POSTER_FAST || ''),
}

/** Re-export for convenience — see dubai-images.js for full map */
export { PAGE_HERO_IMAGES, SECTION_IMAGES, communityHeroImage } from './dubai-images'

/** Common developer names for search filter + SEO */
export const DEVELOPER_FILTER_OPTIONS = [
  { value: 'emaar', label: 'Emaar' },
  { value: 'damac', label: 'DAMAC' },
  { value: 'sobha', label: 'Sobha' },
  { value: 'nakheel', label: 'Nakheel' },
  { value: 'meraas', label: 'Meraas' },
  { value: 'azizi', label: 'Azizi' },
  { value: 'binghatti', label: 'Binghatti' },
]

export const BEDROOM_OPTIONS = [
  { value: '1', label: '1 BR' },
  { value: '2', label: '2 BR' },
  { value: '3', label: '3 BR' },
  { value: '4', label: '4 BR' },
  { value: '5', label: '5+ BR' },
]

export const INVESTMENT_ADVANTAGES = [
  { title: '0% income tax', desc: 'Attractive for international dubai property investment and efficient ownership structures.' },
  { title: 'High rental yields', desc: 'High ROI property in Dubai — gross yields often strongest in JVC, Marina, and Business Bay.' },
  { title: 'Golden Visa pathway', desc: 'Dubai golden visa property investment may qualify at AED 2M+ (rules subject to change).' },
  { title: 'Payment plans', desc: 'Off plan projects in Dubai typically offer staged payments through construction milestones.' },
  { title: 'Safe & stable', desc: 'Regulated market with RERA oversight and escrow protections on registered launches.' },
  { title: 'Global hub', desc: 'New launch and upcoming projects dubai pipeline supports long-term investor demand.' },
]
