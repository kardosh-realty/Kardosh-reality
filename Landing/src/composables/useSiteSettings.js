import { reactive, computed } from 'vue'
import { Facebook, Globe, Instagram, Linkedin, Mail, MessageCircle, Music2, Phone, Twitter, Youtube } from 'lucide-vue-next'
import { BRAND, SOCIAL } from '@/config/brand'
import { BRAND_LOGO } from '@/config/brand-assets'
import { CONTACT } from '@/config/uae'
import { fetchSiteSettings } from '@/services/siteSettings'

/** platform key → { label, icon } for rendering social links */
export const SOCIAL_PLATFORMS = {
  linkedin: { label: 'LinkedIn', icon: Linkedin },
  instagram: { label: 'Instagram', icon: Instagram },
  facebook: { label: 'Facebook', icon: Facebook },
  x: { label: 'X', icon: Twitter },
  youtube: { label: 'YouTube', icon: Youtube },
  tiktok: { label: 'TikTok', icon: Music2 },
  whatsapp: { label: 'WhatsApp', icon: MessageCircle },
  email: { label: 'Email', icon: Mail },
  phone: { label: 'Phone', icon: Phone },
  website: { label: 'Website', icon: Globe },
}

export function socialMeta(platform) {
  return SOCIAL_PLATFORMS[platform] || SOCIAL_PLATFORMS.website
}

/**
 * Reactive site-wide branding/contact settings for the public site.
 * Seeded from static config, hydrated (read-only) from Supabase `site_settings`
 * which the dashboard writes. Components read from `site` so admin edits appear here.
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

/** Socials with resolved label + icon, ready for rendering. */
export const socialLinks = computed(() =>
  (site.socials || [])
    .filter((s) => s && s.url)
    .map((s) => ({ ...s, ...socialMeta(s.platform) }))
)

export const reraLabel = computed(() => `RERA License No. ${site.reraLicense}`)

/** wa.me link from whatsapp phone (falls back to contact phone). */
export const whatsappHref = computed(() => {
  const digits = String(site.whatsappPhone || site.phone || '').replace(/\D/g, '')
  return `https://wa.me/${digits}`
})

let loadPromise = null

export function loadSiteSettings() {
  if (loadPromise) return loadPromise
  loadPromise = (async () => {
    try {
      const remote = await fetchSiteSettings()
      if (!remote) return
      for (const key of Object.keys(site)) {
        if (key === 'socials') {
          if (Array.isArray(remote.socials) && remote.socials.length) site.socials = remote.socials
          continue
        }
        if (remote[key] !== undefined && remote[key] !== null && remote[key] !== '') {
          site[key] = remote[key]
        }
      }
      // Mirror into static config objects so non-reactive consumers (read on next
      // render/route mount) also reflect the latest values.
      BRAND.name = site.companyName
      BRAND.tagline = site.tagline
      BRAND.email = site.email
      BRAND.phone = site.phone
      BRAND.phoneTel = `tel:${String(site.phone).replace(/\s/g, '')}`
      BRAND.reraLicense = site.reraLicense
      CONTACT.email = site.email
      CONTACT.phone = site.phone
      CONTACT.phoneTel = BRAND.phoneTel
      CONTACT.address = site.address
      CONTACT.addressShort = site.addressShort
      const findSocial = (p) => (site.socials.find((s) => s.platform === p) || {}).url
      if (findSocial('linkedin')) SOCIAL.linkedin = findSocial('linkedin')
      if (findSocial('instagram')) SOCIAL.instagram = findSocial('instagram')
    } catch {
      /* keep defaults */
    }
  })()
  return loadPromise
}

export function useSiteSettings() {
  return { site, reraLabel, whatsappHref, loadSiteSettings }
}
