/** Shared Swiper breakpoints for home page property-style carousels */

export const HOME_PROPERTY_CAROUSEL = {
  mobile: { slidesPerView: 1.08, spaceBetween: 14 },
  480: { slidesPerView: 1.2, spaceBetween: 16 },
  640: { slidesPerView: 2.05, spaceBetween: 18 },
  1024: { slidesPerView: 3, spaceBetween: 22 },
  1280: { slidesPerView: 4, spaceBetween: 24 },
}

export const HOME_STRIP_CAROUSEL = {
  mobile: { slidesPerView: 1.12, spaceBetween: 12 },
  400: { slidesPerView: 1.35, spaceBetween: 14 },
  640: { slidesPerView: 2.1, spaceBetween: 16 },
}

export function toSwiperBreakpoints(map) {
  return Object.fromEntries(
    Object.entries(map).map(([key, val]) => [
      key === 'mobile' ? 0 : Number(key),
      { ...val, slidesPerGroup: 1 },
    ])
  )
}
