/**
 * Dubai / UAE photography used site-wide for brand authenticity.
 * Community cards use curated Dubai/UAE stock — replace with client shots when ready.
 */
import heroSkyline from '@/assets/images/bg/01.jpg'
import heroMarina from '@/assets/images/bg/02.jpg'
import heroDistrict from '@/assets/images/bg/03.jpg'
import heroTwilight from '@/assets/images/bg/04.jpg'
import { DEFAULT_HERO_POSTER } from '@/config/hero-poster'
import aboutEditorial from '@/assets/images/about.jpg'
import whyInvestDubai from '@/assets/images/why-invest-dubai.webp'
import property1 from '@/assets/images/property/1.jpg'

import downtownDubai from '@/assets/images/communities/downtown-dubai.jpg'
import businessBay from '@/assets/images/communities/business-bay.jpg'
import dubaiHills from '@/assets/images/communities/dubai-hills.jpg'
import palmJumeirah from '@/assets/images/communities/palm-jumeirah.jpg'
import dubaiCreekHarbour from '@/assets/images/communities/dubai-creek-harbour.jpg'
import jvc from '@/assets/images/communities/jvc.jpg'
import dubaiMarina from '@/assets/images/communities/dubai-marina.jpg'

/** Default when Reelly has no cover image */
export const DUBAI_PROPERTY_FALLBACK = property1

/** Inner-page heroes (full-bleed banner like About) */
export const PAGE_HERO_IMAGES = {
  default: heroSkyline,
  about: heroSkyline,
  offPlan: heroTwilight,
  rent: heroMarina,
  communities: downtownDubai,
  developers: heroSkyline,
  whyDubai: heroMarina,
  map: heroDistrict,
  contact: heroSkyline,
  sell: heroSkyline,
  privacy: heroSkyline,
  terms: heroSkyline,
  communityDetail: downtownDubai,
  developerDetail: heroSkyline,
}

/** Section imagery on home & about blocks */
export const SECTION_IMAGES = {
  about: aboutEditorial,
  whyInvest: whyInvestDubai,
  cta: heroTwilight,
  homeHeroPoster: DEFAULT_HERO_POSTER,
}

/** Per-community card & detail hero — Dubai corridors use location-specific photography */
export const COMMUNITY_IMAGES = {
  'downtown-dubai': downtownDubai,
  'dubai-marina': dubaiMarina,
  'palm-jumeirah': palmJumeirah,
  'dubai-hills': dubaiHills,
  'business-bay': businessBay,
  'dubai-creek-harbour': dubaiCreekHarbour,
  jvc,
  'yas-island': dubaiMarina,
  'saadiyat-island': dubaiMarina,
  'al-reem-island': downtownDubai,
  aljada: downtownDubai,
  'ajman-corniche': dubaiMarina,
  'mina-al-arab': dubaiMarina,
  'al-marjan-island': palmJumeirah,
}

export function communityHeroImage(slug) {
  return COMMUNITY_IMAGES[slug] || PAGE_HERO_IMAGES.communityDetail
}
