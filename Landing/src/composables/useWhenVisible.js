import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Fires once when the root element enters (or nears) the viewport — for deferring API / carousel work.
 * @param {{ rootMargin?: string, threshold?: number }} [options]
 */
export function useWhenVisible(options = {}) {
  const root = ref(null)
  const isVisible = ref(false)

  let observer

  onMounted(() => {
    const el = root.value
    if (!el) {
      isVisible.value = true
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      {
        rootMargin: options.rootMargin ?? '280px 0px',
        threshold: options.threshold ?? 0.01,
      }
    )
    observer.observe(el)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { root, isVisible }
}
