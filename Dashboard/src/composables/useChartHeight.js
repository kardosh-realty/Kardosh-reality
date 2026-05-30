import { ref, computed, onMounted, onUnmounted } from 'vue'

/** Responsive chart heights for dashboard / reports. */
export function useChartHeight(desktop = 360, tablet = 280, mobile = 220) {
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 1280)

  function update() {
    width.value = window.innerWidth
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  const chartHeight = computed(() => {
    if (width.value < 768) return mobile
    if (width.value < 1024) return tablet
    return desktop
  })

  return { chartHeight }
}
