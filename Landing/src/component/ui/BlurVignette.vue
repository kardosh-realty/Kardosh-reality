<template>
  <div
    class="blur-vignette-root relative overflow-hidden"
    :class="rootClass"
    :style="{ borderRadius: radius }"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed, provide } from 'vue'

const props = defineProps({
  rootClass: { type: String, default: '' },
  radius: { type: String, default: '24px' },
  inset: { type: String, default: '20px' },
  transitionLength: { type: String, default: '44px' },
  blur: { type: String, default: '6px' },
})

provide('blurVignette', computed(() => ({
  radius: props.radius,
  inset: props.inset,
  transitionLength: props.transitionLength,
  blur: props.blur,
})))
</script>
