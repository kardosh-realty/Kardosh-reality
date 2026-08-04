<template>
  <div class="hero-media" :class="[mediaClass, hidePoster && 'hero-media--video-only']">
    <div v-if="embedIframeUrl" ref="youtubeWrapRef" class="hero-youtube-wrap">
      <img
        v-if="!hidePoster && heroPosterFullUrl"
        ref="posterImgRef"
        class="hero-poster-slot hero-poster-img"
        :class="{
          'hero-poster--hidden': heroMediaReady,
          'hero-poster-slot--ready': posterImageReady,
        }"
        :src="heroPosterFullUrl"
        :srcset="heroPosterSrcSet || undefined"
        :sizes="heroPosterSrcSet ? HERO_POSTER_SIZES : undefined"
        alt=""
        width="1600"
        height="900"
        fetchpriority="high"
        decoding="async"
        aria-hidden="true"
        @load="onPosterImageLoad"
        @error="onPosterImageError"
      />
      <iframe
        v-if="embedVideo"
        ref="youtubeIframeRef"
        :src="embedIframeUrl"
        title="Dubai hero background video"
        class="hero-youtube-iframe"
        :class="{ 'hero-youtube-iframe--ready': heroMediaReady }"
        :style="youtubeIframeStyle"
        tabindex="-1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerpolicy="strict-origin-when-cross-origin"
        aria-hidden="true"
        @load="onEmbedIframeLoad"
      />
      <div class="hero-youtube-shield" aria-hidden="true" />
    </div>

    <template v-else-if="useMp4">
      <img
        v-if="!hidePoster && heroPosterFullUrl"
        ref="posterImgRef"
        class="hero-poster-slot hero-poster-img"
        :class="{
          'hero-poster--hidden': heroMediaReady,
          'hero-poster-slot--ready': posterImageReady,
        }"
        :src="heroPosterFullUrl"
        :srcset="heroPosterSrcSet || undefined"
        :sizes="heroPosterSrcSet ? HERO_POSTER_SIZES : undefined"
        alt=""
        width="1600"
        height="900"
        fetchpriority="high"
        decoding="async"
        aria-hidden="true"
        @load="onPosterImageLoad"
        @error="onPosterImageError"
      />
      <!-- src on <video> (not <source>) + muted/playsinline attrs: Safari autoplay requirements -->
      <video
        v-if="embedVideo"
        ref="videoEl"
        class="hero-video"
        :class="{ 'hero-video--ready': heroMediaReady }"
        :src="HERO_VIDEO.src"
        :poster="heroPosterFullUrl"
        autoplay
        muted
        defaultmuted
        loop
        playsinline
        webkit-playsinline="true"
        disablepictureinpicture
        disableremoteplayback
        controlslist="nodownload nofullscreen noremoteplayback"
        preload="auto"
        aria-hidden="true"
        @playing="onVideoPlaying"
        @canplay="onVideoCanPlay"
        @loadeddata="onVideoCanPlay"
        @error="onVideoError"
      />
    </template>

    <div
      v-else
      class="image-wrap"
      :style="{ backgroundImage: `url(${heroPosterFullUrl})` }"
      aria-hidden="true"
    />

    <div class="hero-scrim" aria-hidden="true" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import {
  HERO_VIDEO,
  HERO_YOUTUBE_ID,
  HERO_VIMEO_ID,
  heroYouTubeEmbedUrl,
  heroVimeoEmbedUrl,
} from '@/config/marketing'
import { useHeroPosterGate } from '@/composables/useHeroPosterGate'
import { useHeroVideoCover } from '@/composables/useHeroVideoCover'
import {
  deferUntilIdle,
  shouldDeferHeroVideo,
  heroVideoDeferMs,
  isMobileViewport,
} from '@/composables/useDeferUntilIdle'
import {
  DEFAULT_HERO_POSTER,
  HERO_POSTER_SIZES,
  HERO_POSTER_SRCSET,
} from '@/config/hero-poster'

const props = defineProps({
  mediaClass: { type: String, default: '' },
  /** No poster / thumbnail flash — dark fill until video plays (welcome page) */
  hidePoster: { type: Boolean, default: false },
})

const videoEl = ref(null)
const posterImgRef = ref(null)
const youtubeWrapRef = ref(null)
const youtubeIframeRef = ref(null)
const { iframeStyle: youtubeIframeStyle, updateCover: updateYoutubeCover } =
  useHeroVideoCover(youtubeWrapRef)
const useMp4 = ref(!HERO_YOUTUBE_ID && !HERO_VIMEO_ID && !!HERO_VIDEO.src)
const heroMediaReady = ref(false)
/** Video embed loads after idle so it does not compete with poster LCP */
const embedVideo = ref(false)

const { posterGateReady, posterImageReady, youtubeIframeReady, heroPosterFullUrl } =
  useHeroPosterGate({ hidePoster: props.hidePoster })

const heroPosterSrcSet = computed(() =>
  heroPosterFullUrl.value === DEFAULT_HERO_POSTER ? HERO_POSTER_SRCSET : ''
)

const embedIframeUrl = computed(() => {
  if (HERO_YOUTUBE_ID) {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return heroYouTubeEmbedUrl(HERO_YOUTUBE_ID, { origin })
  }
  if (HERO_VIMEO_ID) return heroVimeoEmbedUrl(HERO_VIMEO_ID)
  return null
})

let revealTimer = null
let videoWatchdog = null
let playbackKickTimer = null
let playAttempt = 0

function isAppleSafariFamily() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const isSafariDesktop = /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR|Firefox|CriOS|FxiOS|EdgiOS/.test(ua)
  return isIOS || isSafariDesktop
}

function clearRevealTimer() {
  if (revealTimer) {
    window.clearTimeout(revealTimer)
    revealTimer = null
  }
}

function clearVideoWatchdog() {
  if (videoWatchdog) {
    window.clearTimeout(videoWatchdog)
    videoWatchdog = null
  }
}

function clearPlaybackKickTimer() {
  if (playbackKickTimer) {
    window.clearInterval(playbackKickTimer)
    playbackKickTimer = null
  }
}

function forceRevealHeroVideo() {
  clearRevealTimer()
  clearVideoWatchdog()
  if (!posterGateReady.value) markPosterReady()
  if (embedIframeUrl.value) youtubeIframeReady.value = true
  heroMediaReady.value = true
}

/**
 * Reveal the MP4 layer only when frames are actually painting.
 * iPad Safari (esp. Low Power Mode) often fires canplay but never autoplays —
 * hiding the poster then leaves a frozen/black video instead of the still.
 */
function revealMp4IfPlaying() {
  const el = videoEl.value
  if (!el || el.paused || el.ended) return
  if (el.readyState < 2) return
  tryRevealHeroVideo()
}

function startVideoWatchdog() {
  clearVideoWatchdog()
  // Never force-hide the poster for MP4 when autoplay is blocked.
  if (useMp4.value) return
  const timeoutMs = 8000
  videoWatchdog = window.setTimeout(() => {
    if (!heroMediaReady.value) forceRevealHeroVideo()
  }, timeoutMs)
}

function kickEmbedPlayback() {
  const iframe = youtubeIframeRef.value
  if (!iframe?.contentWindow) return
  try {
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
      '*'
    )
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: 'mute', args: '' }),
      '*'
    )
  } catch {
    /* cross-origin — ignore */
  }
}

function startPlaybackKick() {
  clearPlaybackKickTimer()
  kickEmbedPlayback()
  playbackKickTimer = window.setInterval(kickEmbedPlayback, 2000)
}

function onPageVisible() {
  if (document.visibilityState !== 'visible') return
  if (!embedVideo.value) return
  if (useMp4.value) {
    kickMp4Playback()
    return
  }
  kickEmbedPlayback()
  if (!heroMediaReady.value) tryRevealHeroVideo()
}

function onPosterImageError() {
  markPosterReady()
}

function tryRevealHeroVideo() {
  if (heroMediaReady.value) return
  if (!props.hidePoster && !posterGateReady.value) return
  if (embedIframeUrl.value && !youtubeIframeReady.value) return

  clearRevealTimer()
  revealTimer = window.setTimeout(() => {
    heroMediaReady.value = true
  }, 400)
}

function markPosterReady() {
  posterImageReady.value = true
  posterGateReady.value = true
}

function onPosterImageLoad() {
  markPosterReady()
  afterPosterReady()
}

function afterPosterReady() {
  if (!embedVideo.value) return
  if (embedIframeUrl.value) return
  startMp4WhenReady()
}

function onEmbedIframeLoad() {
  updateYoutubeCover()
  youtubeIframeReady.value = true
  tryRevealHeroVideo()
  startPlaybackKick()
}

function onVideoPlaying() {
  clearPlaybackKickTimer()
  clearVideoWatchdog()
  revealMp4IfPlaying()
}

function onVideoCanPlay() {
  kickMp4Playback()
}

function onVideoError() {
  console.warn('[hero] MP4 failed to load — check VITE_HERO_VIDEO_URL is a direct .mp4 link')
  clearPlaybackKickTimer()
  // Keep the static poster — do NOT fall through to Ken Burns "slideshow"
  embedVideo.value = false
}

watch(posterGateReady, (ready) => {
  if (!ready || !embedVideo.value) return
  afterPosterReady()
})

function prepareMp4Element(el) {
  if (!el) return
  el.muted = true
  el.defaultMuted = true
  el.volume = 0
  el.setAttribute('muted', '')
  el.setAttribute('playsinline', '')
  el.setAttribute('webkit-playsinline', 'true')
  el.playsInline = true
}

async function startMp4WhenReady() {
  await nextTick()
  const el = videoEl.value
  if (!el) return
  prepareMp4Element(el)
  try {
    // Safari often needs an explicit load() after mount before play() succeeds
    if (el.readyState < 2) el.load()
    await el.play()
    revealMp4IfPlaying()
  } catch {
    /* Safari / Low Power Mode may block — gesture + interval retries handle it */
  }
}

function kickMp4Playback() {
  const el = videoEl.value
  if (!el || heroMediaReady.value) return
  prepareMp4Element(el)
  playAttempt += 1
  // Periodic load() helps Safari after deferred mount
  if (playAttempt === 1 || playAttempt % 3 === 0) {
    try {
      if (el.readyState < 2) el.load()
    } catch {
      /* ignore */
    }
  }
  const playPromise = el.play()
  if (playPromise?.then) {
    playPromise.then(() => revealMp4IfPlaying()).catch(() => {})
  }
}

function onUserGestureUnlock() {
  if (!useMp4.value && !embedIframeUrl.value) return
  // If idle defer hasn't enabled the video yet, enable now from the gesture
  if (!embedVideo.value) {
    embedVideo.value = true
  }
  if (heroMediaReady.value) return
  nextTick(() => {
    if (useMp4.value) kickMp4Playback()
    else kickEmbedPlayback()
  })
}

function startMp4PlaybackKick() {
  if (!useMp4.value) return
  clearPlaybackKickTimer()
  kickMp4Playback()
  playbackKickTimer = window.setInterval(kickMp4Playback, 1500)
}

function scheduleHeroVideo() {
  if (props.hidePoster) {
    markPosterReady()
    embedVideo.value = true
    return
  }
  // Phones keep the poster only — the multi-MB hero video is desktop/tablet.
  if (isMobileViewport() || shouldDeferHeroVideo()) return
  if (!embedIframeUrl.value && !useMp4.value) return

  const enableVideo = () => {
    embedVideo.value = true
  }

  // Safari: start sooner — long idle defer makes muted autoplay less reliable
  if (isAppleSafariFamily()) {
    window.setTimeout(enableVideo, 200)
    return
  }

  const { delay, timeout } = heroVideoDeferMs()
  deferUntilIdle(enableVideo, { delay, timeout })
}

watch(embedVideo, (ready) => {
  if (!ready) return
  startVideoWatchdog()
  if (embedIframeUrl.value) return
  afterPosterReady()
  startMp4PlaybackKick()
})

onMounted(async () => {
  await nextTick()
  if (!props.hidePoster && posterImgRef.value?.complete) {
    markPosterReady()
  } else if (props.hidePoster) {
    markPosterReady()
  }

  scheduleHeroVideo()

  if (embedVideo.value) {
    afterPosterReady()
  }

  document.addEventListener('visibilitychange', onPageVisible)
  window.addEventListener('pageshow', onPageVisible)
  // iPad / Safari Low Power Mode: muted autoplay often needs a user gesture
  window.addEventListener('touchstart', onUserGestureUnlock, { passive: true })
  window.addEventListener('pointerdown', onUserGestureUnlock, { passive: true })
  window.addEventListener('scroll', onUserGestureUnlock, { passive: true, once: true })
})

onUnmounted(() => {
  clearRevealTimer()
  clearVideoWatchdog()
  clearPlaybackKickTimer()
  document.removeEventListener('visibilitychange', onPageVisible)
  window.removeEventListener('pageshow', onPageVisible)
  window.removeEventListener('touchstart', onUserGestureUnlock)
  window.removeEventListener('pointerdown', onUserGestureUnlock)
  window.removeEventListener('scroll', onUserGestureUnlock)
})
</script>
