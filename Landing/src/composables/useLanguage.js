import { computed, ref, readonly } from 'vue'
import { DEFAULT_LOCALE, localeFromPath, localePath, stripLocaleFromPath } from '@/config/i18n'

const STORAGE_KEY = 'kardosh-locale'

/** Site languages */
export const LOCALES = [
  { id: 'en', label: 'English', short: 'EN', dir: 'ltr', htmlLang: 'en' },
  { id: 'pt', label: 'Português', short: 'PT', dir: 'ltr', htmlLang: 'pt' },
]

const locale = ref(DEFAULT_LOCALE)

export function getLocaleId() {
  return locale.value
}

export function isRtlLocale(id) {
  return LOCALES.find((l) => l.id === id)?.dir === 'rtl'
}

export function localeDirection(id) {
  return isRtlLocale(id) ? 'rtl' : 'ltr'
}

function applyLocale(id) {
  if (typeof document === 'undefined') return
  const meta = LOCALES.find((l) => l.id === id) || LOCALES[0]
  const root = document.documentElement
  const dir = meta.dir
  root.lang = meta.htmlLang || id
  root.dir = dir
  root.classList.toggle('kardosh-rtl', dir === 'rtl')
}

export function syncLocaleFromRoute(route) {
  const fromUrl = route?.params?.locale === 'pt' ? 'pt' : localeFromPath(route?.path || '/')
  const id = LOCALES.some((l) => l.id === fromUrl) ? fromUrl : DEFAULT_LOCALE
  locale.value = id
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, id)
  }
  applyLocale(id)
}

export function initLanguage(pathname) {
  if (typeof window === 'undefined') return
  const fromUrl = localeFromPath(pathname || window.location.pathname)
  const stored = localStorage.getItem(STORAGE_KEY)
  const fallback = LOCALES.some((l) => l.id === stored) ? stored : DEFAULT_LOCALE
  const id = LOCALES.some((l) => l.id === fromUrl) ? fromUrl : fallback
  locale.value = id
  applyLocale(id)
  if (stored !== id) localStorage.setItem(STORAGE_KEY, id)
}

export function useLanguage() {
  const textDirection = computed(() => localeDirection(locale.value))
  const isRtl = computed(() => isRtlLocale(locale.value))

  function setLocale(id, { router, route } = {}) {
    if (!LOCALES.some((l) => l.id === id)) return
    locale.value = id
    localStorage.setItem(STORAGE_KEY, id)
    applyLocale(id)

    if (router && route) {
      const bare = stripLocaleFromPath(route.fullPath)
      const next = localePath(bare, id)
      if (next !== route.fullPath) {
        router.push(next)
      }
    }
  }

  return {
    locale: readonly(locale),
    locales: LOCALES,
    setLocale,
    textDirection,
    isRtl,
    localePath: (path, targetLocale = locale.value) => localePath(path, targetLocale),
    stripLocaleFromPath,
  }
}
