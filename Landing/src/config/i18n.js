/** Default locale — no URL suffix (e.g. `/off-plan`). */
export const DEFAULT_LOCALE = 'en'

/** Trailing segment for non-default locales (`/off-plan/pt`). */
export const LOCALE_URL_SEGMENT = 'pt'

export const SUPPORTED_LOCALES = ['en', 'pt']

export function isSupportedLocale(id) {
  return SUPPORTED_LOCALES.includes(id)
}

function splitPathAndTail(raw) {
  const str = String(raw || '/')
  const q = str.indexOf('?')
  const h = str.indexOf('#')
  const cut =
    q === -1 ? (h === -1 ? -1 : h) : h === -1 ? q : Math.min(q, h)
  if (cut === -1) {
    return { pathname: str.startsWith('/') ? str : `/${str}`, tail: '' }
  }
  return {
    pathname: (str.slice(0, cut) || '/').startsWith('/')
      ? str.slice(0, cut) || '/'
      : `/${str.slice(0, cut)}`,
    tail: str.slice(cut),
  }
}

/** Read locale from pathname (`/off-plan/pt` → pt, `/` → en). */
export function localeFromPath(pathname = '/') {
  const { pathname: pathOnly } = splitPathAndTail(pathname)
  const segments = pathOnly.split('/').filter(Boolean)
  if (segments.length && segments[segments.length - 1] === LOCALE_URL_SEGMENT) {
    return 'pt'
  }
  return DEFAULT_LOCALE
}

/** Remove trailing `/pt` (`/off-plan/pt` → `/off-plan`, `/pt` → `/`). */
export function stripLocaleFromPath(path) {
  const { pathname, tail } = splitPathAndTail(path)
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length && segments[segments.length - 1] === LOCALE_URL_SEGMENT) {
    segments.pop()
  }

  const nextPath = segments.length ? `/${segments.join('/')}` : '/'
  return `${nextPath}${tail}`
}

/** Build locale-aware path (`/off-plan` + pt → `/off-plan/pt`, home → `/pt`). */
export function localePath(path, locale = DEFAULT_LOCALE) {
  const bare = stripLocaleFromPath(String(path || '/'))
  const { pathname, tail } = splitPathAndTail(bare)

  if (!isSupportedLocale(locale) || locale === DEFAULT_LOCALE) {
    return `${pathname}${tail}`
  }

  if (pathname === '/') {
    return `/${LOCALE_URL_SEGMENT}${tail}`
  }

  return `${pathname}/${LOCALE_URL_SEGMENT}${tail}`
}

export function ogLocaleTag(locale) {
  if (locale === 'pt') return 'pt_PT'
  return 'en_AE'
}

/** Legacy prefix URLs (`/pt/off-plan`) → suffix (`/off-plan/pt`). */
export function migrateLegacyLocalePrefix(path) {
  const { pathname, tail } = splitPathAndTail(path)
  if (pathname === '/pt') return localePath('/', 'pt') + tail
  if (!pathname.startsWith('/pt/')) return null
  const rest = pathname.slice(3) || '/'
  return localePath(rest, 'pt') + tail
}
