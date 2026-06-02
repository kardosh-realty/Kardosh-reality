import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'
import { HERO_VIDEO } from '@/config/marketing'
import {
  DEFAULT_HERO_POSTER,
  HERO_POSTER_SIZES,
  HERO_POSTER_SRCSET,
} from '@/config/hero-poster'

import './assets/css/tailwind.css'
import { initTheme } from '@/composables/useTheme'
import { initPalette } from '@/composables/usePalette'
import { initLanguage } from '@/composables/useLanguage'

/** Prevent refresh from restoring mid-page scroll (e.g. homepage section 2) */
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
  window.scrollTo(0, 0)
  initTheme()
  initPalette()
  initLanguage()
}

function preloadHeroImage(href, { srcset = '', sizes = '' } = {}) {
  if (!href) return
  if (!document.querySelector(`link[rel="preload"][href="${href}"]`)) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    link.fetchPriority = 'high'
    if (srcset) {
      link.imageSrcset = srcset
      link.imageSizes = sizes || '100vw'
    }
    document.head.appendChild(link)
  }
  const img = new Image()
  img.fetchPriority = 'high'
  if (srcset) {
    img.srcset = srcset
    img.sizes = sizes || '100vw'
  }
  img.src = href
}

/** Preload the hero poster (LCP) — mobile picks 768w variant via srcset */
const posterHref = HERO_VIDEO.poster || DEFAULT_HERO_POSTER
const useResponsivePoster = posterHref === DEFAULT_HERO_POSTER
preloadHeroImage(posterHref, {
  srcset: useResponsivePoster ? HERO_POSTER_SRCSET : '',
  sizes: useResponsivePoster ? HERO_POSTER_SIZES : '',
})

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router)

app.mount('#app')

// Hydrate branding/contact and testimonials from Supabase without blocking first paint.
void import('@/composables/useSiteSettings').then((m) => m.loadSiteSettings())
void import('@/composables/useTestimonials').then((m) => m.loadTestimonials())
void import('@/composables/useTeam').then((m) => m.loadTeam())
