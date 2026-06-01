export const BRAND = {
  name: import.meta.env.VITE_APP_NAME || 'Kardosh Realty',
  tagline:
    'Buy off plan property in Dubai and across the UAE — new launch and upcoming projects from leading developers, with licensed advisory from Kardosh Realty.',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'info@kardoshrealty.ae',
  phone: import.meta.env.VITE_CONTACT_PHONE || '+971 4 123 4567',
  phoneTel: `tel:${(import.meta.env.VITE_CONTACT_PHONE || '+97141234567').replace(/\s/g, '')}`,
  reraLicense: import.meta.env.VITE_RERA_LICENSE || '1484387',
}

/** Display label for footer, contact, and trust sections */
export const RERA_LICENSE_LABEL = `RERA License No. ${BRAND.reraLicense}`

/** Official social profiles */
export const SOCIAL = {
  linkedin:
    import.meta.env.VITE_SOCIAL_LINKEDIN ||
    'https://www.linkedin.com/in/allan-kardosh',
  instagram:
    import.meta.env.VITE_SOCIAL_INSTAGRAM ||
    'https://www.instagram.com/kardoshrealtydubai',
}

/** Client palette — wired via `tailwind.css` @theme */
export const BRAND_COLORS = {
  primary: '#0a0a0a',
  primaryDark: '#000000',
  accent: '#ffffff',
  muted: '#737373',
}

export const LISTING_TYPES = {
  SALE: 'sale',
  RENT: 'rent',
  OFF_PLAN: 'off-plan',
}

export { BRAND_ICON, BRAND_LOGO } from './brand-assets'
