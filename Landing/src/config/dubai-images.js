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
import about480 from '@/assets/images/about-480.webp'
import about768 from '@/assets/images/about-768.webp'
import whyInvestDubai from '@/assets/images/why-invest-dubai.webp'
import whyInvestDubaiMobile from '@/assets/images/why-invest-dubai-mobile.webp'
import property1 from '@/assets/images/property/1.jpg'

import hero01Mobile from '@/assets/images/bg/01-768.webp'
import hero01Desktop from '@/assets/images/bg/01-1280.webp'
import hero02Mobile from '@/assets/images/bg/02-768.webp'
import hero02Desktop from '@/assets/images/bg/02-1280.webp'
import hero03Mobile from '@/assets/images/bg/03-768.webp'
import hero03Desktop from '@/assets/images/bg/03-1280.webp'
import hero04Mobile from '@/assets/images/bg/04-768.webp'
import hero04Desktop from '@/assets/images/bg/04-1280.webp'

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

/** Full-bleed page hero / cover backgrounds */
export const PAGE_HERO_SIZES = '100vw'

/** About section image on home */
export const ABOUT_SECTION_SIZES = '(max-width: 1023px) 92vw, 640px'

/** Why-invest section image srcset */
export const WHY_INVEST_SRCSET = `${whyInvestDubaiMobile} 768w, ${whyInvestDubai} 1600w`
export const WHY_INVEST_SIZES = '(max-width: 1023px) 92vw, 640px'

const PAGE_HERO_BG_RESPONSIVE = {
  [heroSkyline]: {
    src: hero01Desktop,
    srcset: `${hero01Mobile} 768w, ${hero01Desktop} 1280w`,
    sizes: PAGE_HERO_SIZES,
  },
  [heroMarina]: {
    src: hero02Desktop,
    srcset: `${hero02Mobile} 768w, ${hero02Desktop} 1280w`,
    sizes: PAGE_HERO_SIZES,
  },
  [heroDistrict]: {
    src: hero03Desktop,
    srcset: `${hero03Mobile} 768w, ${hero03Desktop} 1280w`,
    sizes: PAGE_HERO_SIZES,
  },
  [heroTwilight]: {
    src: hero04Desktop,
    srcset: `${hero04Mobile} 768w, ${hero04Desktop} 1280w`,
    sizes: PAGE_HERO_SIZES,
  },
  [aboutEditorial]: {
    src: about768,
    srcset: `${about480} 480w, ${about768} 768w`,
    sizes: ABOUT_SECTION_SIZES,
  },
  [downtownDubai]: {
    src: downtownDubai960,
    srcset: `${downtownDubai480} 480w, ${downtownDubai960} 960w`,
    sizes: PAGE_HERO_SIZES,
  },
}

/**
 * Responsive WebP for page heroes and cover backgrounds.
 * Accepts a resolved asset URL from PAGE_HERO_IMAGES / SECTION_IMAGES.
 */
export function pageHeroImage(src) {
  if (!src) return { src: '', srcset: '', sizes: PAGE_HERO_SIZES }
  return (
    PAGE_HERO_BG_RESPONSIVE[src] || {
      src,
      srcset: '',
      sizes: PAGE_HERO_SIZES,
    }
  )
}

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
