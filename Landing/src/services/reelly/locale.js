import { getLocaleId } from '@/composables/useLanguage'

/** Map site locale → Reelly `language` query param (@see docs.reelly.ai multilingual). */
export function reellyLanguageForAppLocale(locale = getLocaleId()) {
  if (locale === 'pt') return 'pt'
  return 'en-us'
}

export function reellyQueryParams(locale = getLocaleId()) {
  return {
    language: reellyLanguageForAppLocale(locale),
    preferred_currency: 'AED',
    preferred_area_unit: 'm2',
  }
}

export function reellyProjectsCacheKey(locale = getLocaleId()) {
  return `kardosh-reelly-projects-v3-${locale}`
}

export function reellyLogosCacheKey(locale = getLocaleId()) {
  return `kardosh-reelly-logos-v3-${locale}`
}

export function reellyProjectDetailCacheKey(id, locale = getLocaleId()) {
  return `kardosh-reelly-project-${locale}-${id}`
}
