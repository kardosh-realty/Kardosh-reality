import { watch } from 'vue'
import { useWhenVisible } from '@/composables/useWhenVisible'

/**
 * Load Reelly catalogue only when a below-fold home section is near the viewport.
 */
export function useDeferredCatalogLoad(loadFn) {
  const { root, isVisible } = useWhenVisible({ rootMargin: '320px 0px' })

  watch(isVisible, (visible) => {
    if (visible) loadFn()
  })

  return { root, isVisible }
}
