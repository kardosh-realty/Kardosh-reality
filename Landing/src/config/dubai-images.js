/**
 * Dubai / UAE photography used site-wide for brand authenticity.
 * Swap files under src/assets/images when client provides final shots.
 */
import heroSkyline from '@/assets/images/bg/01.jpg'
import heroMarina from '@/assets/images/bg/02.jpg'
import heroDistrict from '@/assets/images/bg/03.jpg'
import heroTwilight from '@/assets/images/bg/04.jpg'
import { DEFAULT_HERO_POSTER } from '@/config/hero-poster'
import aboutEditorial from '@/assets/images/about.jpg'
import whyInvestDubai from '@/assets/images/Why invest in Dubai.jpg'
import property1 from '@/assets/images/property/1.jpg'
import property2 from '@/assets/images/property/2.jpg'
import property3 from '@/assets/images/property/3.jpg'
import property4 from '@/assets/images/property/4.jpg'
import property5 from '@/assets/images/property/5.jpg'
import property6 from '@/assets/images/property/6.jpg'

/** Default when Reelly has no cover image */
export const DUBAI_PROPERTY_FALLBACK = property1

/** Inner-page heroes (full-bleed banner like About) */
export const PAGE_HERO_IMAGES = {
  default: heroSkyline,
  about: heroSkyline,
  offPlan: heroTwilight,
  rent: heroMarina,
  communities: heroDistrict,
  developers: heroSkyline,
  whyDubai: heroMarina,
  map: heroDistrict,
  contact: heroSkyline,
  sell: heroSkyline,
  privacy: heroSkyline,
  terms: heroSkyline,
  communityDetail: heroDistrict,
  developerDetail: heroSkyline,
}

/** Section imagery on home & about blocks */
export const SECTION_IMAGES = {
  about: aboutEditorial,
  whyInvest: whyInvestDubai,
  cta: heroTwilight,
  homeHeroPoster: DEFAULT_HERO_POSTER,
}

/** Per-community card & detail hero */
export const COMMUNITY_IMAGES = {
  'downtown-dubai': heroSkyline,
  'dubai-marina': heroMarina,
  'palm-jumeirah': property2,
  'dubai-hills': property4,
  'business-bay': heroDistrict,
  'dubai-creek-harbour': heroSkyline,
  jvc: property5,
  'yas-island': heroMarina,
  'saadiyat-island': property3,
  'al-reem-island': heroTwilight,
  aljada: property6,
  'ajman-corniche': heroDistrict,
  'mina-al-arab': property1,
  'al-marjan-island': property2,
}

export function communityHeroImage(slug) {
  return COMMUNITY_IMAGES[slug] || PAGE_HERO_IMAGES.communityDetail
}
