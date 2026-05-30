import { computed, ref, readonly } from 'vue'

const STORAGE_KEY = 'kardosh-locale'

/** ISO-style ids; `dir` is applied to `<html dir="...">` */
export const LOCALES = [
  { id: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { id: 'ar', label: 'العربية', short: 'AR', dir: 'rtl' },
  { id: 'pt', label: 'Português', short: 'PT', dir: 'ltr' },
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

export function initLanguage() {
  if (typeof window === 'undefined') return
  const stored = localStorage.getItem(STORAGE_KEY) || 'en'
  const id = LOCALES.some((l) => l.id === stored) ? stored : 'en'
  locale.value = id
  applyLocale(id)
}

const locale = ref(
  typeof localStorage !== 'undefined'
    ? localStorage.getItem(STORAGE_KEY) || 'en'
    : 'en'
)

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
