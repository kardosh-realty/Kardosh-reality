import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

/**
 * Fires when a sentinel element nears the edge of a scroll container — YouTube-style infinite scroll.
 * @param {() => void} onReach
 * @param {{ rootRef?: import('vue').Ref, enabled?: () => boolean, rootMargin?: string }} [options]
 */
export function useScrollSentinel(onReach, options = {}) {
  const { rootRef, enabled = () => true, rootMargin = '120px' } = options
  const sentinel = ref(null)
  let observer

  function disconnect() {
    observer?.disconnect()
    observer = null
  }

  function connect() {
    disconnect()
    const el = sentinel.value
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (!enabled()) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && enabled()) onReach()
      },
      {
        root: rootRef?.value ?? null,
        rootMargin,
        threshold: 0,
      }
    )
    observer.observe(el)
  }

  onMounted(() => nextTick(connect))
  onUnmounted(disconnect)

  watch(
    [sentinel, () => rootRef?.value],
    () => nextTick(connect),
    { flush: 'post' }
  )

  return { sentinel, reconnect: () => nextTick(connect) }
}
