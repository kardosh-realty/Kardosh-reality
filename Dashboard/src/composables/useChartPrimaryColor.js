import { computed } from 'vue'
import { paletteRevision } from '@/composables/usePalette'

function readCssColor(varName, fallback) {
  if (typeof document === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  return value || fallback
}

/**
 * Reactive primary colors for ApexCharts (follows palette + light/dark).
 */
export function useChartPrimaryColor() {
  const primary = computed(() => {
    paletteRevision.value
    return readCssColor('--color-primary', '#00a63e')
  })

  const primaryDark = computed(() => {
    paletteRevision.value
    return readCssColor('--color-primary-dark', '#008f34')
  })

  const colors = computed(() => [primary.value])

  return { primary, primaryDark, colors }
}
