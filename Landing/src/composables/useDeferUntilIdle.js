/**
 * Run work after first paint / idle so hero LCP (poster + copy) is not competing with heavy scripts.
 * @param {() => void} callback
 * @param {{ timeout?: number, delay?: number }} [options]
 */
export function deferUntilIdle(callback, options = {}) {
  const timeout = options.timeout ?? 3500
  const delay = options.delay ?? 0

  const run = () => {
    if (delay > 0) {
      window.setTimeout(callback, delay)
    } else {
      callback()
    }
  }

  const schedule = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(run, { timeout })
    } else {
      window.setTimeout(run, Math.min(timeout, 2000))
    }
  }

  if (document.readyState === 'complete') {
    schedule()
  } else {
    window.addEventListener('load', schedule, { once: true })
  }
}

/** Skip autoplay video on save-data / very slow connections. */
export function shouldDeferHeroVideo() {
  if (typeof window === 'undefined') return true
  const conn = navigator.connection
  if (conn?.saveData) return true
  if (conn?.effectiveType && ['slow-2g', '2g'].includes(conn.effectiveType)) return true
  return false
}

/** Phones keep the poster only — the multi-MB hero video is desktop-only (LCP + data win). */
export function isMobileViewport() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 767px)').matches
}

/** Longer defer on narrow viewports (Lighthouse mobile). */
export function heroVideoDeferMs() {
  if (typeof window === 'undefined') return { delay: 800, timeout: 3000 }
  const mobile = window.matchMedia('(max-width: 767px)').matches
  return mobile
    ? { delay: 2000, timeout: 6000 }
    : { delay: 900, timeout: 3500 }
}
