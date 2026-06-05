import { computed, ref, readonly } from 'vue'

const STORAGE_KEY = 'kardosh-locale'

/** English only — language switcher temporarily disabled. */
export const LOCALES = [
  { id: 'en', label: 'English', short: 'EN', dir: 'ltr' },
]

const RTL_IDS = new Set(LOCALES.filter((l) => l.dir === 'rtl').map((l) => l.id))

export function isRtlLocale(id) {
  return RTL_IDS.has(id)
}

export function localeDirection(id) {
  return isRtlLocale(id) ? 'rtl' : 'ltr'
}

function applyLocale(id) {
  const root = document.documentElement
  const dir = localeDirection(id)
  root.lang = id
  root.dir = dir
  root.classList.toggle('kardosh-rtl', dir === 'rtl')
}

const locale = ref('en')

export function initLanguage() {
  if (typeof window === 'undefined') return
  locale.value = 'en'
  localStorage.setItem(STORAGE_KEY, 'en')
  applyLocale('en')
}

export function useLanguage() {
  const textDirection = computed(() => localeDirection(locale.value))
  const isRtl = computed(() => isRtlLocale(locale.value))

  function setLocale(id) {
    if (!LOCALES.some((l) => l.id === id)) return
    locale.value = id
    localStorage.setItem(STORAGE_KEY, id)
    applyLocale(id)
  }

  return {
    locale: readonly(locale),
    locales: LOCALES,
    setLocale,
    textDirection,
    isRtl,
  }
}
