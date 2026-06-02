import { ref, computed } from 'vue'
import { HERO_VIDEO, HERO_YOUTUBE_ID, heroYouTubeThumbnailUrl } from '@/config/marketing'
import { HAS_CUSTOM_HERO_POSTER } from '@/config/hero-poster'
import { SECTION_IMAGES } from '@/config/dubai-images'

/**
 * Hero poster: `<img fetchpriority="high">` paints LCP immediately.
 * Video embed waits until posterGateReady (set when poster loads).
 * @param {{ hidePoster?: boolean }} options — welcome page: no poster flash, video only
 */
export function useHeroPosterGate(options = {}) {
  const hidePoster = Boolean(options.hidePoster)

  const posterGateReady = ref(hidePoster)
  const posterImageReady = ref(hidePoster)
  const youtubeIframeReady = ref(false)

  const heroPosterFullUrl = computed(() => {
    if (hidePoster) return ''
    if (HERO_VIDEO.poster) return HERO_VIDEO.poster
    if (!HAS_CUSTOM_HERO_POSTER && HERO_YOUTUBE_ID) {
      return heroYouTubeThumbnailUrl(HERO_YOUTUBE_ID)
    }
    return SECTION_IMAGES.homeHeroPoster
  })

  if (!hidePoster) {
    window.setTimeout(() => {
      if (!posterGateReady.value) posterGateReady.value = true
    }, 3000)
  }

  return {
    posterGateReady,
    posterImageReady,
    youtubeIframeReady,
    heroPosterFullUrl,
  }
}
