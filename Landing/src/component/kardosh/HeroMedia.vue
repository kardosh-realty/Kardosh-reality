<template>
  <div class="hero-media" :class="[mediaClass, hidePoster && 'hero-media--video-only']">
    <div v-if="youtubeEmbedUrl" ref="youtubeWrapRef" class="hero-youtube-wrap">
      <div
        v-if="!hidePoster"
        class="hero-poster-slot"
        :class="{
          'hero-poster--hidden': heroMediaReady,
          'hero-poster-slot--ready': posterImageReady,
        }"
        :style="posterBackgroundStyle"
        aria-hidden="true"
      />
      <iframe
        v-if="posterGateReady && embedVideo"
        ref="youtubeIframeRef"
        :src="youtubeEmbedUrl"
        title="Dubai hero background video"
        class="hero-youtube-iframe"
        :class="{ 'hero-youtube-iframe--ready': heroMediaReady }"
        :style="youtubeIframeStyle"
        tabindex="-1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerpolicy="strict-origin-when-cross-origin"
        aria-hidden="true"
        @load="onYoutubeIframeLoad"
      />
      <div class="hero-youtube-shield" aria-hidden="true" />
      <div class="hero-youtube-chrome-mask" aria-hidden="true" />
    </div>

    <template v-else-if="useMp4">
      <div
        v-if="!hidePoster"
        class="hero-poster-slot"
        :class="{
          'hero-poster--hidden': heroMediaReady,
          'hero-poster-slot--ready': posterImageReady,
        }"
        :style="posterBackgroundStyle"
        aria-hidden="true"
      />
      <video
        v-if="posterGateReady && embedVideo"
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
        preload="none"
        aria-hidden="true"
        @playing="onVideoPlaying"
        @error="useMp4 = false"
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
import { HERO_VIDEO, HERO_YOUTUBE_ID, heroYouTubeEmbedUrl } from '@/config/marketing'
import { useHeroPosterGate } from '@/composables/useHeroPosterGate'
import { useHeroVideoCover } from '@/composables/useHeroVideoCover'
import {
  deferUntilIdle,
  shouldDeferHeroVideo,
  heroVideoDeferMs,
} from '@/composables/useDeferUntilIdle'

const props = defineProps({
  mediaClass: { type: String, default: '' },
  /** No poster / thumbnail flash — dark fill until video plays (welcome page) */
  hidePoster: { type: Boolean, default: false },
})

const videoEl = ref(null)
const youtubeWrapRef = ref(null)
const youtubeIframeRef = ref(null)
const { iframeStyle: youtubeIframeStyle, updateCover: updateYoutubeCover } =
  useHeroVideoCover(youtubeWrapRef)
const useMp4 = ref(!HERO_YOUTUBE_ID && !!HERO_VIDEO.src)
const heroMediaReady = ref(false)
/** Poster is LCP; video loads after idle so YouTube does not compete on first paint */
const embedVideo = ref(false)

const { posterGateReady, posterImageReady, posterBackgroundStyle, youtubeIframeReady, heroPosterFullUrl } =
  useHeroPosterGate({ hidePoster: props.hidePoster })

const youtubeEmbedUrl = computed(() => {
  if (!HERO_YOUTUBE_ID) return null
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return heroYouTubeEmbedUrl(HERO_YOUTUBE_ID, { origin })
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
  if (youtubeEmbedUrl.value && !youtubeIframeReady.value) return

  clearRevealTimer()
  revealTimer = window.setTimeout(() => {
    heroMediaReady.value = true
  }, 600)
}

function onYoutubeIframeLoad() {
  updateYoutubeCover()
  youtubeIframeReady.value = true
  tryRevealHeroVideo()
}

function onVideoPlaying() {
  tryRevealHeroVideo()
}

watch(posterGateReady, (ready) => {
  if (!ready || !embedVideo.value) return
  if (youtubeEmbedUrl.value) return
  tryRevealHeroVideo()
  startMp4WhenReady()
})

async function startMp4WhenReady() {
  await nextTick()
  const el = videoEl.value
  if (!el) return
  el.play().catch(() => {
    useMp4.value = false
  })
}

function scheduleHeroVideo() {
  if (props.hidePoster) {
    embedVideo.value = true
    return
  }
  if (!youtubeEmbedUrl.value && !useMp4.value) return
  if (shouldDeferHeroVideo()) return

  const { delay, timeout } = heroVideoDeferMs()
  deferUntilIdle(() => {
    embedVideo.value = true
  }, { delay, timeout })
}

watch(embedVideo, (ready) => {
  if (!ready) return
  if (youtubeEmbedUrl.value) return
  tryRevealHeroVideo()
  startMp4WhenReady()
})

onMounted(() => {
  scheduleHeroVideo()
  if (embedVideo.value && posterGateReady.value && !youtubeEmbedUrl.value) {
    startMp4WhenReady()
  }
})
</script>
