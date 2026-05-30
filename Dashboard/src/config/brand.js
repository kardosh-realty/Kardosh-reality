import { BRAND_ICON, BRAND_LOGO } from './brand-assets'

export const BRAND = {
  name: import.meta.env.VITE_APP_NAME || 'Kardosh Realty',
  tagline:
    'Manage listings, leads, and UAE property advisory — aligned with the public Kardosh Realty website.',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'info@kardoshrealty.ae',
  phone: import.meta.env.VITE_CONTACT_PHONE || '+971 4 123 4567',
  phoneTel: `tel:${(import.meta.env.VITE_CONTACT_PHONE || '+97141234567').replace(/\s/g, '')}`,
  reraLicense: import.meta.env.VITE_RERA_LICENSE || '1484387',
}

export const RERA_LICENSE_LABEL = `RERA License No. ${BRAND.reraLicense}`

export const SOCIAL = {
  linkedin:
    import.meta.env.VITE_SOCIAL_LINKEDIN ||
    'https://www.linkedin.com/in/allan-kardosh',
  instagram:
    import.meta.env.VITE_SOCIAL_INSTAGRAM ||
    'https://www.instagram.com/kardoshrealtydubai',
}

export const LISTING_TYPES = {
  SALE: 'sale',
  RENT: 'rent',
  OFF_PLAN: 'off-plan',
}

export { BRAND_ICON, BRAND_LOGO }
