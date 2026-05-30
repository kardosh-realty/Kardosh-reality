<template>
  <img
    :src="src"
    :alt="alt || BRAND.name"
    :class="['kardosh-brand-img', sizeClass, imgClass]"
    :height="height"
    loading="eager"
  />
</template>

<script setup>
import { computed } from 'vue'
import { BRAND, BRAND_ICON, BRAND_LOGO } from '@/config/brand'
import { site } from '@/composables/useSiteSettings'

const props = defineProps({
  variant: { type: String, default: 'full' },
  size: { type: String, default: 'nav' },
  alt: { type: String, default: '' },
  imgClass: { type: String, default: '' },
})

const src = computed(() => (props.variant === 'icon' ? BRAND_ICON : (site.logo || BRAND_LOGO)))

const height = computed(() => {
  if (props.variant === 'icon') return props.size === 'lg' ? 48 : 36
  if (props.size === 'auth') return 56
  if (props.size === 'sidebar') return 44
  return 40
})

const sizeClass = computed(() => `kardosh-brand-img--${props.size}`)
</script>
