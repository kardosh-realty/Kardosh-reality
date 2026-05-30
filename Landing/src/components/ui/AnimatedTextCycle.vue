<template>
  <span
    class="animated-text-cycle"
    :class="[customClass, { 'animated-text-cycle--fade': motion === 'fade' }]"
    aria-live="polite"
  >
    <!-- Hidden measurement — same typography as visible word -->
    <span
      ref="measureRef"
      class="animated-text-cycle__measure"
      aria-hidden="true"
    >
      <span
        v-for="(word, i) in words"
        :key="`measure-${i}`"
        class="animated-text-cycle__word animated-text-cycle__word--measure"
        :class="wordClass"
      >
        {{ word }}
      </span>
    </span>

    <span
      class="animated-text-cycle__slot"
      :style="slotStyle"
    >
      <Transition
        name="animated-text-cycle"
        mode="out-in"
      >
        <span
          :key="currentIndex"
          class="animated-text-cycle__word"
          :class="wordClass"
        >
          {{ words[currentIndex] }}
        </span>
      </Transition>
    </span>
  </span>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  /** Words to cycle through (required) */
  words: {
    type: Array,
    required: true,
  },
  /** Ms between word changes (default 5000, matches shadcn snippet) */
  interval: {
    type: Number,
    default: 5000,
  },
  /** Extra classes on the wrapper (React `className` on root) */
  customClass: {
    type: String,
    default: '',
  },
  /** Classes applied to each word (React `className` on word spans) */
  wordClass: {
    type: String,
    default: '',
  },
  /** `fade` = opacity/blur only (keeps baseline stable); `slide` = vertical motion */
  motion: {
    type: String,
    default: 'slide',
    validator: (v) => ['slide', 'fade'].includes(v),
  },
})

const currentIndex = ref(0)
const slotWidth = ref('auto')
const measureRef = ref(null)
let timerId = null

const slotStyle = computed(() => ({
  width: slotWidth.value,
}))

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function updateWidth() {
  const el = measureRef.value
  if (!el?.children?.length) return
  const child = el.children[currentIndex.value]
  if (!child) return
  const w = child.getBoundingClientRect().width
  slotWidth.value = `${Math.ceil(w + 10)}px`
}

watch(currentIndex, async () => {
  await nextTick()
  updateWidth()
})

onMounted(async () => {
  await nextTick()
  updateWidth()

  if (prefersReducedMotion() || props.words.length < 2) return

  timerId = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.words.length
  }, props.interval)
})

onUnmounted(() => {
  if (timerId) window.clearInterval(timerId)
})
</script>

<style scoped>
.animated-text-cycle {
  position: relative;
  display: inline;
  vertical-align: baseline;
}

.animated-text-cycle__measure {
  position: absolute;
  left: -9999px;
  top: 0;
  visibility: hidden;
  pointer-events: none;
  opacity: 0;
  height: 0;
  width: 0;
  overflow: hidden;
  white-space: nowrap;
}

.animated-text-cycle__measure .animated-text-cycle__word--measure {
  display: inline-block;
}

.animated-text-cycle__slot {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: baseline;
  transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: width;
}

.animated-text-cycle__word {
  display: inline-block;
  white-space: nowrap;
}

/* Framer-motion-style enter / exit (blur + slide) */
.animated-text-cycle-enter-active {
  transition:
    opacity 0.4s ease-out,
    transform 0.4s ease-out,
    filter 0.4s ease-out;
}

.animated-text-cycle-leave-active {
  transition:
    opacity 0.3s ease-in,
    transform 0.3s ease-in,
    filter 0.3s ease-in;
}

.animated-text-cycle-enter-from {
  opacity: 0;
  transform: translateY(-20px);
  filter: blur(8px);
}

.animated-text-cycle-leave-to {
  opacity: 0;
  transform: translateY(20px);
  filter: blur(8px);
}

.animated-text-cycle--fade .animated-text-cycle-enter-from,
.animated-text-cycle--fade .animated-text-cycle-leave-to {
  transform: none;
  filter: blur(6px);
}

.animated-text-cycle--fade .animated-text-cycle-enter-active,
.animated-text-cycle--fade .animated-text-cycle-leave-active {
  transition:
    opacity 0.35s ease,
    filter 0.35s ease;
}

@media (prefers-reduced-motion: reduce) {
  .animated-text-cycle__slot {
    transition: none;
  }

  .animated-text-cycle-enter-active,
  .animated-text-cycle-leave-active {
    transition: opacity 0.15s ease;
  }

  .animated-text-cycle-enter-from,
  .animated-text-cycle-leave-to {
    transform: none;
    filter: none;
  }
}
</style>
