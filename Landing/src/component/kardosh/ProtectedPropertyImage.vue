<template>
  <div
    class="protected-property-image"
    :class="[
      fill ? 'protected-property-image--fill' : '',
      wrapperClass,
    ]"
    @contextmenu.prevent
  >
    <img
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
  width: { type: [Number, String], default: 651 },
  height: { type: [Number, String], default: 394 },
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

const resolvedSrc = computed(() =>
  proxyReellyImageUrl(props.src, {
    width: displayWidth.value,
    quality: props.quality,
  })
)

const resolvedSrcSet = computed(() => {
  if (!props.responsive) return ''
  const w = displayWidth.value
  const widths =
    w <= 200
      ? [120, 160, 200]
      : w >= 900
        ? [480, 720, 960, 1280]
        : [320, 480, 651, 800]
  return proxyReellyImageSrcSet(props.src, { widths, quality: props.quality })
})
</script>
