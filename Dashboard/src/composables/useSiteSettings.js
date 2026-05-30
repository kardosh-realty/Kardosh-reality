import { reactive, computed } from 'vue'
import { BRAND, SOCIAL } from '@/config/brand'
import { BRAND_LOGO } from '@/config/brand-assets'
import { CONTACT } from '@/config/uae'
import { fetchSiteSettings } from '@/services/siteSettings'

/**
 * Reactive site-wide branding/contact settings.
 * Seeded from static config; hydrated from Supabase `site_settings` at startup.
 * Components read from `site` so a save in the dashboard reflects everywhere.
 */
export const site = reactive({
  logo: BRAND_LOGO,
  companyName: BRAND.name,
  tagline: BRAND.tagline,
  email: BRAND.email,
  phone: BRAND.phone,
  address: CONTACT.address,
  addressShort: CONTACT.addressShort,
  reraLicense: BRAND.reraLicense,
  whatsappPhone: '',
  socials: [
    { platform: 'linkedin', url: SOCIAL.linkedin },
    { platform: 'instagram', url: SOCIAL.instagram },
  ],
})

export const reraLabel = computed(() => `RERA License No. ${site.reraLicense}`)

let loadPromise = null

export function applySettings(patch) {
  if (!patch) return
  for (const key of Object.keys(site)) {
    if (key === 'socials') {
      if (Array.isArray(patch.socials)) site.socials = patch.socials
      continue
    }
    if (patch[key] !== undefined && patch[key] !== null && patch[key] !== '') {
      site[key] = patch[key]
    }
  }
}

export function loadSiteSettings() {
  if (loadPromise) return loadPromise
  loadPromise = (async () => {
    try {
      const remote = await fetchSiteSettings()
      applySettings(remote)
    } catch {
      /* keep defaults */
    }
  })()
  return loadPromise
}

export function useSiteSettings() {
  return { site, reraLabel, loadSiteSettings, applySettings }
}
