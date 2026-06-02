<template>
  <img
    v-if="!failed"
    :src="src"
    :alt="alt || BRAND.name"
    :class="['kardosh-brand-img', variantClass, imgClass, { 'kardosh-brand-img--loaded': loaded }]"
    :width="width"
    :height="height"
    :loading="size === 'nav' ? 'eager' : 'lazy'"
    :fetchpriority="size === 'nav' ? 'high' : 'auto'"
    @load="loaded = true"
    @error="failed = true"
  />
</template>

<script setup>
import { ref, computed } from 'vue'

const loaded = ref(false)
const failed = ref(false)
import { BRAND } from '@/config/brand'
import { BRAND_ICON } from '@/config/brand-assets'
import { site } from '@/composables/useSiteSettings'

const props = defineProps({
  /** full = wordmark, icon = mark only */
  variant: { type: String, default: 'full' },
  /** nav | footer | inline | hero */
  size: { type: String, default: 'nav' },
  alt: { type: String, default: '' },
  imgClass: { type: String, default: '' },
  invertOnDark: { type: Boolean, default: false },
})

const src = computed(() => (props.variant === 'icon' ? BRAND_ICON : (site.logo || BRAND_ICON)))

const height = computed(() => {
  if (props.variant === 'icon') {
    if (props.size === 'sm') return 32
    if (props.size === 'lg') return 48
    return 40
  }
  if (props.size === 'footer') return 68
  if (props.size === 'hero') return 72
  if (props.size === 'inline') return 36
  if (props.size === 'nav') return 48
  return 40
})

/** Wordmark aspect ratio from kardosh-logo.png (1831×632) */
const width = computed(() => {
  if (props.variant === 'icon') return height.value
  return Math.round(height.value * (1831 / 632))
})

const variantClass = computed(() => {
  const parts = [`kardosh-brand-img--${props.size}`]
  if (props.variant === 'icon') parts.push('kardosh-brand-img--icon')
  if (props.invertOnDark) parts.push('kardosh-brand-img--invert-dark')
  return parts.join(' ')
})
</script>
