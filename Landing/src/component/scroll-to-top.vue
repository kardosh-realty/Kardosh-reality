<template>
  <button
    v-if="visible"
    id="back-to-top"
    type="button"
    class="back-to-top"
    aria-label="Scroll to top"
    @click="scrollToTop"
  >
    <ArrowUp class="back-to-top__icon" aria-hidden="true" />
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'
import { smoothScrollToTop } from '@/utils/smoothScroll'

const visible = ref(false)

function toggleVisible() {
  visible.value = document.documentElement.scrollTop > 300
}

function scrollToTop() {
  smoothScrollToTop()
}

onMounted(() => {
  window.addEventListener('scroll', toggleVisible, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', toggleVisible)
})
</script>
