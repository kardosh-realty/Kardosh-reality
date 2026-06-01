<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
  class: { type: String, default: '' },
  reverse: { type: Boolean, default: false },
  pauseOnHover: { type: Boolean, default: false },
  vertical: { type: Boolean, default: false },
  /** Duplicate tracks for seamless loop */
  repeat: { type: Number, default: 2 },
})
</script>

<template>
  <div
    :class="
      cn(
        'marquee group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem]',
        vertical ? 'flex-col' : 'flex-row',
        props.class
      )
    "
  >
    <div
      v-for="i in repeat"
      :key="i"
      :class="
        cn(
          'marquee__track flex shrink-0 justify-around',
          vertical ? 'flex-col animate-marquee-vertical' : 'flex-row animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]'
        )
      "
      :aria-hidden="i > 1 ? true : undefined"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.marquee__track {
   gap: var(--gap, 1rem);
}
</style>
