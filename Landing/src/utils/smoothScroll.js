/** @returns {'smooth' | 'auto'} */
export function scrollBehaviorOption() {
  if (typeof window === 'undefined') return 'auto'
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

export function smoothScrollTo(top = 0, left = 0) {
  window.scrollTo({
    top,
    left,
    behavior: scrollBehaviorOption(),
  })
}

export function smoothScrollToTop() {
  smoothScrollTo(0, 0)
}
