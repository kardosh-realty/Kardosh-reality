import { DEFAULT_LOCALE, localeFromPath, localePath, stripLocaleFromPath } from '@/config/i18n'
import { getLocaleId } from '@/composables/useLanguage'

export function localeFromRoute(route) {
  if (route?.params?.locale === 'pt') return 'pt'
  return localeFromPath(route?.path || '/')
}

/** Resolve `to` for the active (or target) locale. */
export function localizeRouteTo(to, route, targetLocale) {
  if (to == null) return to

  const locale = targetLocale || localeFromRoute(route)

  if (typeof to === 'string') {
    if (/^(https?:|mailto:|tel:|#)/i.test(to)) return to
    return localePath(to, locale)
  }

  if (typeof to === 'object') {
    if (to.path) {
      return { ...to, path: localePath(to.path, locale) }
    }
    if (to.name) {
      const params = { ...(to.params || {}) }
      if (locale === DEFAULT_LOCALE) {
        delete params.locale
      } else {
        params.locale = locale
      }
      return { ...to, params }
    }
  }

  return to
}

export function useLocalizedPath() {
  function localizedPath(path, targetLocale) {
    const locale = targetLocale || getLocaleId()
    return localePath(path, locale)
  }

  return {
    localizedPath,
    localePath,
    stripLocaleFromPath,
    localeFromPath,
  }
}
