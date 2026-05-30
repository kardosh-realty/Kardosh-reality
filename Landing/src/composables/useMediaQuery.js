import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Reactive matchMedia helper.
 * @param {string} query
 */
export function useMediaQuery(query) {
  const matches = ref(false)
  let mq = null
  let onChange = null

  onMounted(() => {
    if (typeof window === 'undefined') return
    mq = window.matchMedia(query)
    onChange = () => {
      matches.value = mq.matches
    }
    onChange()
    mq.addEventListener('change', onChange)
  })

  onUnmounted(() => {
    if (mq && onChange) mq.removeEventListener('change', onChange)
  })

  return matches
}
