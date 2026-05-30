import { ref, onMounted, onUnmounted, watch } from 'vue'

/**
 * @param {number} threshold — px scrolled before `scrolled` is true
 */
export function useScroll(threshold = 10) {
  const scrolled = ref(false)

  function onScroll() {
    scrolled.value = window.scrollY > threshold
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return scrolled
}
