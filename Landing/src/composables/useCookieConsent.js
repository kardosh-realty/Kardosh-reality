import { ref, computed } from 'vue'

const STORAGE_KEY = 'kardosh-cookie-consent'

/** @type {import('vue').Ref<'accepted' | 'declined' | null>} */
const consent = ref(null)

function syncBannerClass(show) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('has-cookie-banner', show)
}

export function initCookieConsent() {
  if (typeof window === 'undefined') return
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'accepted' || stored === 'declined') {
      consent.value = stored
    }
  } catch {
    /* private mode */
  }
  syncBannerClass(consent.value === null)
}

export function acceptCookies() {
  consent.value = 'accepted'
  try {
    localStorage.setItem(STORAGE_KEY, 'accepted')
  } catch {
    /* ignore */
  }
  syncBannerClass(false)
}

export function declineCookies() {
  consent.value = 'declined'
  try {
    localStorage.setItem(STORAGE_KEY, 'declined')
  } catch {
    /* ignore */
  }
  syncBannerClass(false)
}

export const hasAnalyticsConsent = computed(() => consent.value === 'accepted')

export const showConsentBanner = computed(() => consent.value === null)

export function useCookieConsent() {
  return {
    consent,
    hasAnalyticsConsent,
    showConsentBanner,
    acceptCookies,
    declineCookies,
  }
}
