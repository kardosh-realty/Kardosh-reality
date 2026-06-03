<template>
  <div
    class="protected-property-image"
    :class="[
      fill ? 'protected-property-image--fill' : '',
      wrapperClass,
    ]"
    @contextmenu.prevent
  >
    <picture v-if="useGalleryPicture">
      <source
        media="(max-width: 767px)"
        :srcset="mobileSrcSet"
        :sizes="sizes"
      />
      <img
        :src="resolvedSrc"
        :srcset="desktopSrcSet"
        :sizes="sizes"
        :alt="alt"
        :class="imgClass"
        :width="width"
        :height="height"
        :loading="loading"
        :fetchpriority="fetchpriority"
        draggable="false"
        @dragstart.prevent
      />
    </picture>
    <img
      v-else
      :src="resolvedSrc"
      :srcset="resolvedSrcSet || undefined"
      :sizes="sizes"
      :alt="alt"
      :class="imgClass"
      :width="width"
      :height="height"
      :loading="loading"
      :fetchpriority="fetchpriority"
      draggable="false"
      @dragstart.prevent
    />
    <PropertyImageWatermark :size="watermarkSize" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PropertyImageWatermark from '@/component/kardosh/PropertyImageWatermark.vue'
import {
  LISTING_CARD_IMAGE_WIDTH,
  LISTING_GALLERY_DESKTOP_WIDTHS,
  LISTING_GALLERY_IMAGE_WIDTH,
  LISTING_GALLERY_MOBILE_WIDTHS,
  proxyReellyImageSrcSet,
  proxyReellyImageUrl,
} from '@/services/reelly/imageProxy'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  imgClass: { type: String, default: '' },
  wrapperClass: { type: String, default: '' },
  loading: { type: String, default: 'lazy' },
  fetchpriority: { type: String, default: undefined },
  width: { type: [Number, String], default: 560 },
  height: { type: [Number, String], default: 338 },
  sizes: { type: String, default: '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px' },
  /** JPEG/WebP quality passed to the image proxy (lower = smaller files). */
  quality: { type: Number, default: 72 },
  /** When false, only the primary `src` is used (e.g. tiny thumbs). */
  responsive: { type: Boolean, default: true },
  watermarkSize: { type: String, default: 'md' },
  /** Image fills the wrapper (absolute inset-0 cover) */
  fill: { type: Boolean, default: false },
})

const displayWidth = computed(() => Number(props.width) || LISTING_CARD_IMAGE_WIDTH)

const isGallerySize = computed(
  () => props.responsive && displayWidth.value >= LISTING_GALLERY_IMAGE_WIDTH
)

const useGalleryPicture = computed(() => isGallerySize.value && Boolean(mobileSrcSet.value))

const resolvedSrc = computed(() =>
  proxyReellyImageUrl(props.src, {
    width: displayWidth.value,
    quality: props.quality,
  })
)

const mobileSrcSet = computed(() => {
  if (!isGallerySize.value) return ''
  return proxyReellyImageSrcSet(props.src, {
    widths: LISTING_GALLERY_MOBILE_WIDTHS,
    quality: Math.min(props.quality, 70),
  })
})

const desktopSrcSet = computed(() => {
  if (!props.responsive) return ''
  if (isGallerySize.value) {
    return proxyReellyImageSrcSet(props.src, {
      widths: LISTING_GALLERY_DESKTOP_WIDTHS,
      quality: props.quality,
    })
  }
  const w = displayWidth.value
  const widths =
    w <= 200
      ? [120, 160, 200]
      : w >= 900
        ? LISTING_GALLERY_DESKTOP_WIDTHS
        : LISTING_CARD_SRCSET_WIDTHS
  return proxyReellyImageSrcSet(props.src, { widths, quality: props.quality })
})

const resolvedSrcSet = computed(() => desktopSrcSet.value)
</script>
