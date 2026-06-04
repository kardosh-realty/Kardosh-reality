import { getMessages } from '@/locales'
import { getLocaleId } from '@/composables/useLanguage'
import { formatAed, formatAedInMillions } from '@/config/uae'
import { REELLY_TERMS } from '@/services/reelly/terms'

function normalizeKey(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[\s-/]+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
}

function lookupTerm(dict, value) {
  if (!value || !dict || !Object.keys(dict).length) return value
  const raw = String(value).trim()
  const key = normalizeKey(raw)
  return dict[key] || dict[raw.toLowerCase()] || value
}

export function localizePriceLabel(label, locale = getLocaleId()) {
  const common = getMessages(locale).common || {}
  const onRequest = common.priceOnRequest || 'Price on request'
  if (!label || label === 'Price on request') return onRequest

  const fromMatch = String(label).match(/^From\s+(.+)$/i)
  if (fromMatch) {
    return `${common.from || 'From'} ${fromMatch[1]}`
  }

  const rentMatch = String(label).match(/^(.+)\/year$/i)
  if (rentMatch) {
    return `${rentMatch[1]}${common.perYear || '/year'}`
  }

  return label
}

export function formatReellyPriceFrom(minPrice, maxPrice, locale = getLocaleId()) {
  const common = getMessages(locale).common || {}
  const min = Math.round(Number(minPrice) || 0)
  const max = Math.round(Number(maxPrice) || 0)
  if (!min && !max) return common.priceOnRequest || 'Price on request'
  const compact = formatAedInMillions(min || max)
  if (!compact) return common.priceOnRequest || 'Price on request'
  return `${common.from || 'From'} ${compact}`
}

export function localizeBedroomsLabel(label, locale = getLocaleId()) {
  if (!label) return label
  const studio =
    getMessages(locale).reelly?.studio ||
    getMessages(locale).search?.propertyTypes?.studio ||
    'Studio'
  return String(label)
    .split(',')
    .map((part) => {
      const p = part.trim()
      return /^studio$/i.test(p) ? studio : p
    })
    .join(', ')
}

export function localizeUnitType(value, locale = getLocaleId()) {
  const terms = REELLY_TERMS[locale]?.unitTypes || {}
  return lookupTerm(terms, value)
}

export function localizeStatusValue(value, locale = getLocaleId(), kind = 'sale') {
  if (!value) return value
  const terms = REELLY_TERMS[locale] || REELLY_TERMS.en
  const dict =
    kind === 'construction' ? terms.constructionStatuses : terms.saleStatuses
  const translated = lookupTerm(dict, value)
  if (translated !== value) return translated
  // Humanize snake_case when no dictionary hit
  return String(value).replace(/_/g, ' ')
}

/** Apply locale-specific labels to a mapped listing, marker, or detail object. */
export function localizeCatalogItem(item, locale = getLocaleId()) {
  if (!item) return item

  const terms = REELLY_TERMS[locale] || REELLY_TERMS.en
  const out = { ...item }

  if (out.saleStatus) {
    out.saleStatus = localizeStatusValue(out.saleStatus, locale, 'sale')
  }
  if (out.constructionStatus) {
    out.constructionStatus = localizeStatusValue(out.constructionStatus, locale, 'construction')
  }

  if (Array.isArray(out.amenities) && out.amenities.length) {
    out.amenities = out.amenities.map((a) => lookupTerm(terms.amenities, a))
  }

  if (out.priceLabel) {
    out.priceLabel = localizePriceLabel(out.priceLabel, locale)
  } else if (out.minPrice != null || out.maxPrice != null || out.price != null) {
    out.priceLabel = formatReellyPriceFrom(
      out.minPrice ?? out.price,
      out.maxPrice,
      locale
    )
  }

  if (out.bedroomsLabel) {
    out.bedroomsLabel = localizeBedroomsLabel(out.bedroomsLabel, locale)
  }

  if (Array.isArray(out.availableUnitTypes) && out.availableUnitTypes.length) {
    out.availableUnitTypes = out.availableUnitTypes.map((entry) => {
      if (typeof entry === 'string') return localizeUnitType(entry, locale)
      if (entry && typeof entry === 'object') {
        const name = entry.name || entry.label || entry.unit_type
        const localized = name ? localizeUnitType(name, locale) : name
        return localized ? { ...entry, name: localized, label: localized } : entry
      }
      return entry
    })
  }

  return out
}

export function localizeLocalListing(item, locale = getLocaleId()) {
  if (!item) return item
  const common = getMessages(locale).common || {}
  const out = { ...item, title: item.name }

  if (item.listingType === 'rent') {
    out.priceLabel = item.price
      ? `${formatAed(item.price)}${common.perYear || '/year'}`
      : common.priceOnRequest || 'Price on request'
  } else {
    out.priceLabel = formatReellyPriceFrom(item.price, null, locale)
  }

  return out
}
