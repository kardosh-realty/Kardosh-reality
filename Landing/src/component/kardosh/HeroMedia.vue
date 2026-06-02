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
      />
      <video
        v-if="embedVideo"
        ref="videoEl"
        class="hero-video"
        :class="{ 'hero-video--ready': heroMediaReady }"
        :poster="heroPosterFullUrl"
        autoplay
        muted
        loop
        playsinline
        disablepictureinpicture
        disableremoteplayback
        controlslist="nodownload nofullscreen noremoteplayback"
        preload="auto"
        aria-hidden="true"
        @playing="onVideoPlaying"
        @canplay="onVideoCanPlay"
        @error="onVideoError"
      >
        <source :src="HERO_VIDEO.src" type="video/mp4" />
      </video>
    </template>

    <div
      v-else
      class="image-wrap kenburn"
      :style="{ backgroundImage: `url(${heroPosterFullUrl})` }"
      aria-hidden="true"
    />

    <div class="hero-scrim" aria-hidden="true" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
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

function clearRevealTimer() {
  if (revealTimer) {
    window.clearTimeout(revealTimer)
    revealTimer = null
  }
}

function tryRevealHeroVideo() {
  if (heroMediaReady.value) return
  if (!props.hidePoster && !posterGateReady.value) return
  if (embedIframeUrl.value && !youtubeIframeReady.value) return

  clearRevealTimer()
  revealTimer = window.setTimeout(() => {
    heroMediaReady.value = true
  }, 600)
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
  tryRevealHeroVideo()
  startMp4WhenReady()
}

function onEmbedIframeLoad() {
  updateYoutubeCover()
  youtubeIframeReady.value = true
  tryRevealHeroVideo()
}

function onVideoPlaying() {
  tryRevealHeroVideo()
}

function onVideoCanPlay() {
  tryRevealHeroVideo()
}

function onVideoError() {
  console.warn('[hero] MP4 failed to load — check VITE_HERO_VIDEO_URL is a direct .mp4 link')
  useMp4.value = false
}

watch(posterGateReady, (ready) => {
  if (!ready || !embedVideo.value) return
  afterPosterReady()
})

async function startMp4WhenReady() {
  await nextTick()
  const el = videoEl.value
  if (!el) return
  el.play().catch(() => {
    /* autoplay blocked — poster remains visible */
  })
}

function scheduleHeroVideo() {
  if (props.hidePoster) {
    markPosterReady()
    embedVideo.value = true
    return
  }
  if (!embedIframeUrl.value && !useMp4.value) return

  const enableVideo = () => {
    embedVideo.value = true
  }

  if (shouldDeferHeroVideo()) {
    enableVideo()
    return
  }

  const { delay, timeout } = heroVideoDeferMs()
  deferUntilIdle(enableVideo, { delay, timeout })
}

watch(embedVideo, (ready) => {
  if (!ready) return
  if (embedIframeUrl.value) return
  afterPosterReady()
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
})
</script>
