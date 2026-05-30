import { BRAND } from './brand'

export const SITE_TAGLINE = BRAND.tagline

export const CONTACT = {
  address: 'Floor 10, Office 1003, Metropolis Tower, Business Bay, Dubai, UAE',
  addressShort: 'Business Bay, Dubai, UAE',
  email: BRAND.email,
  phone: BRAND.phone,
  phoneTel: BRAND.phoneTel,
  hours: 'Sun – Thu: 9am to 6pm',
}

export const CURRENCY = 'AED'
export const AREA_UNIT = 'sqm'

export function formatAed(amount) {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatArea(sqm) {
  return `${sqm} ${AREA_UNIT}`
}
