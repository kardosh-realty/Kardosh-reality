import { ref, computed } from 'vue'
import { HERO_VIDEO, HERO_YOUTUBE_ID, heroYouTubeThumbnailUrl } from '@/config/marketing'
import { HAS_CUSTOM_HERO_POSTER, resolveHeroPosterInstant } from '@/config/hero-poster'
import { SECTION_IMAGES } from '@/config/dubai-images'

function preloadImage(url) {
  if (!url) return Promise.resolve(false)
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

/**
 * Hero poster: show instant + full backgrounds immediately; gate video until full poster loads.
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

  const heroPosterInstantUrl = computed(() => {
    if (hidePoster) return ''
    return resolveHeroPosterInstant(heroPosterFullUrl.value)
  })

  /** CSS backgrounds: full on top, instant underneath (visible until WebP paints) */
  const posterBackgroundStyle = computed(() => {
    if (hidePoster) return undefined
    const full = heroPosterFullUrl.value
    const instant = heroPosterInstantUrl.value
    const layers = []
    if (full) layers.push(`url(${full})`)
    if (instant && instant !== full) layers.push(`url(${instant})`)
    return layers.length ? { backgroundImage: layers.join(', ') } : undefined
  })

  async function initPosterGate() {
    if (hidePoster) return

    const full = heroPosterFullUrl.value
    const instant = heroPosterInstantUrl.value

    if (instant && instant !== full) {
      preloadImage(instant)
    }

    const fullOk = await preloadImage(full)
    posterImageReady.value = fullOk
    posterGateReady.value = true
    window.setTimeout(() => {
      if (!posterGateReady.value) posterGateReady.value = true
    }, 12_000)
  }

  initPosterGate()

  return {
    posterGateReady,
    posterImageReady,
    posterBackgroundStyle,
    youtubeIframeReady,
    heroPosterFullUrl,
  }
}
