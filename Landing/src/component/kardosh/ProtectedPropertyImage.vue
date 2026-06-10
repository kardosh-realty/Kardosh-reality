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
        :src="displaySrc"
        :srcset="desktopSrcSet"
        :sizes="sizes"
        :alt="alt"
        :class="imgClass"
        :width="width"
        :height="height"
        :loading="loading"
        :fetchpriority="fetchpriority"
        draggable="false"
        @error="onError"
        @dragstart.prevent
      />
    </picture>
    <img
      v-else
      :src="displaySrc"
      :srcset="simple ? undefined : resolvedSrcSet || undefined"
      :sizes="simple ? undefined : sizes"
      :alt="alt"
      :class="imgClass"
      :width="width"
      :height="height"
      :loading="loading"
      :fetchpriority="fetchpriority"
      draggable="false"
      @error="onError"
      @dragstart.prevent
    />
    <PropertyImageWatermark :size="watermarkSize" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import PropertyImageWatermark from '@/component/kardosh/PropertyImageWatermark.vue'
import { DUBAI_PROPERTY_FALLBACK } from '@/config/dubai-images'
import {
  LISTING_CARD_IMAGE_WIDTH,
  LISTING_CARD_SRCSET_WIDTHS,
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
  quality: { type: Number, default: 72 },
  responsive: { type: Boolean, default: true },
  /** Single proxy URL only — avoids heavy srcset (map list, thumbs). */
  simple: { type: Boolean, default: false },
  watermarkSize: { type: String, default: 'md' },
  fill: { type: Boolean, default: false },
})

const failed = ref(false)

watch(
  () => props.src,
  () => {
    failed.value = false
  }
)

const displayWidth = computed(() => Number(props.width) || LISTING_CARD_IMAGE_WIDTH)

const isGallerySize = computed(
  () => !props.simple && props.responsive && displayWidth.value >= LISTING_GALLERY_IMAGE_WIDTH
)

const resolvedSrc = computed(() =>
  proxyReellyImageUrl(props.src, {
    width: displayWidth.value,
    quality: props.quality,
  })
)

const displaySrc = computed(() =>
  failed.value ? DUBAI_PROPERTY_FALLBACK : resolvedSrc.value || DUBAI_PROPERTY_FALLBACK
)

function onError() {
  if (!failed.value) failed.value = true
}

const useGalleryPicture = computed(() => isGallerySize.value && Boolean(mobileSrcSet.value))

const mobileSrcSet = computed(() => {
  if (!isGallerySize.value) return ''
  return proxyReellyImageSrcSet(props.src, {
    widths: LISTING_GALLERY_MOBILE_WIDTHS,
    quality: Math.min(props.quality, 70),
  })
})

const desktopSrcSet = computed(() => {
  if (!props.responsive || props.simple) return ''
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
