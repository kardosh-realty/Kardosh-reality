<template>
  <div
    class="blur-vignette pointer-events-none absolute bottom-0 left-0 z-[2] h-full w-full"
    :class="articleClass"
    :style="vignetteStyle"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed, inject, unref } from 'vue'

defineProps({
  articleClass: { type: String, default: '' },
})

const ctx = inject('blurVignette', null)

const vignetteStyle = computed(() => {
  const v = unref(ctx) ?? {}
  return {
    '--radius': v?.radius ?? '24px',
    '--inset': v?.inset ?? '20px',
    '--transition-length': v?.transitionLength ?? '44px',
    '--blur': v?.blur ?? '6px',
  }
})
</script>
