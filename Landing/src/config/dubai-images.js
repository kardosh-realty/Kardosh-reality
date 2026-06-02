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
import whyInvestDubaiMobile from '@/assets/images/why-invest-dubai-mobile.webp'
import property1 from '@/assets/images/property/1.jpg'

import downtownDubai from '@/assets/images/communities/downtown-dubai.jpg'
import businessBay from '@/assets/images/communities/business-bay.jpg'
import dubaiHills from '@/assets/images/communities/dubai-hills.jpg'
import palmJumeirah from '@/assets/images/communities/palm-jumeirah.jpg'
import dubaiCreekHarbour from '@/assets/images/communities/dubai-creek-harbour.jpg'
import jvc from '@/assets/images/communities/jvc.jpg'
import dubaiMarina from '@/assets/images/communities/dubai-marina.jpg'

import downtownDubai480 from '@/assets/images/communities/downtown-dubai-480.webp'
import downtownDubai960 from '@/assets/images/communities/downtown-dubai-960.webp'
import businessBay480 from '@/assets/images/communities/business-bay-480.webp'
import businessBay960 from '@/assets/images/communities/business-bay-960.webp'
import dubaiHills480 from '@/assets/images/communities/dubai-hills-480.webp'
import dubaiHills960 from '@/assets/images/communities/dubai-hills-960.webp'
import palmJumeirah480 from '@/assets/images/communities/palm-jumeirah-480.webp'
import palmJumeirah960 from '@/assets/images/communities/palm-jumeirah-960.webp'
import dubaiCreekHarbour480 from '@/assets/images/communities/dubai-creek-harbour-480.webp'
import dubaiCreekHarbour960 from '@/assets/images/communities/dubai-creek-harbour-960.webp'
import jvc480 from '@/assets/images/communities/jvc-480.webp'
import jvc960 from '@/assets/images/communities/jvc-960.webp'
import dubaiMarina480 from '@/assets/images/communities/dubai-marina-480.webp'
import dubaiMarina960 from '@/assets/images/communities/dubai-marina-960.webp'

/** Default when Reelly has no cover image */
export const DUBAI_PROPERTY_FALLBACK = property1

/** Community card srcset — matches 1 / 2 / 4 column grid */
export const COMMUNITY_CARD_SIZES = '(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 320px'

/** Why-invest section image srcset */
export const WHY_INVEST_SRCSET = `${whyInvestDubaiMobile} 768w, ${whyInvestDubai} 1600w`
export const WHY_INVEST_SIZES = '(max-width: 1023px) 92vw, 640px'

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

/** WebP srcset pairs for community cards (mobile loads 480w variant). */
const COMMUNITY_RESPONSIVE = {
  'downtown-dubai': { sm: downtownDubai480, lg: downtownDubai960 },
  'dubai-marina': { sm: dubaiMarina480, lg: dubaiMarina960 },
  'palm-jumeirah': { sm: palmJumeirah480, lg: palmJumeirah960 },
  'dubai-hills': { sm: dubaiHills480, lg: dubaiHills960 },
  'business-bay': { sm: businessBay480, lg: businessBay960 },
  'dubai-creek-harbour': { sm: dubaiCreekHarbour480, lg: dubaiCreekHarbour960 },
  jvc: { sm: jvc480, lg: jvc960 },
}

export function communityHeroImage(slug) {
  return COMMUNITY_IMAGES[slug] || PAGE_HERO_IMAGES.communityDetail
}

/** Responsive WebP src/srcset for community cards and listing grids. */
export function communityHeroImageResponsive(slug) {
  const pair = COMMUNITY_RESPONSIVE[slug]
  const fallback = communityHeroImage(slug)
  if (!pair) {
    return { src: fallback, srcset: '', sizes: COMMUNITY_CARD_SIZES }
  }
  return {
    src: pair.lg,
    srcset: `${pair.sm} 480w, ${pair.lg} 960w`,
    sizes: COMMUNITY_CARD_SIZES,
  }
}
