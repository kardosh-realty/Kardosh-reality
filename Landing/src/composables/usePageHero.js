import { computed, unref, toValue } from 'vue'
import { useT } from '@/composables/useT'

/** PageHero title + subtitle for a named page key under `heroes.*`. */
export function usePageHero(key) {
  const t = useT()
  return computed(() => {
    const k = toValue(key)
    return {
      title: t(`heroes.${k}.title`),
      subtitle: t(`heroes.${k}.subtitle`),
    }
  })
}

/** Lookup nested locale arrays/objects reactively. */
export function useLocaleSection(sectionKey) {
  const t = useT()
  return computed(() => {
    const parts = String(sectionKey).split('.')
    let val = unref(t(parts[0]))
    for (let i = 1; i < parts.length; i++) {
      val = val?.[parts[i]]
    }
    return val
  })
}
