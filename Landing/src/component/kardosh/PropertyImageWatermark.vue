<template>
  <div
    class="property-image-watermark"
    :class="`property-image-watermark--${size}`"
    aria-hidden="true"
  >
    <img
      :src="markSrc"
      alt=""
      class="property-image-watermark__mark"
      draggable="false"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { BRAND_ICON, BRAND_LOGO } from '@/config/brand-assets'

const props = defineProps({
  /** xs (icon) | sm | md | lg */
  size: { type: String, default: 'md' },
})

const markSrc = computed(() => (props.size === 'xs' || props.size === 'sm' ? BRAND_ICON : BRAND_LOGO))
</script>
