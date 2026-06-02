import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'
import { HERO_VIDEO } from '@/config/marketing'

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

function preloadHeroImage(href, priority = 'high') {
  if (!href) return
  if (!document.querySelector(`link[rel="preload"][href="${href}"]`)) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    link.fetchPriority = priority
    document.head.appendChild(link)
  }
  const img = new Image()
  img.fetchPriority = priority
  img.src = href
}

/** Preload the hero poster (LCP) — single brand image, no stock underlay */
if (HERO_VIDEO.poster) {
  preloadHeroImage(HERO_VIDEO.poster, 'high')
}

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router)

app.mount('#app')

// Hydrate branding/contact and testimonials from Supabase without blocking first paint.
void import('@/composables/useSiteSettings').then((m) => m.loadSiteSettings())
void import('@/composables/useTestimonials').then((m) => m.loadTestimonials())
void import('@/composables/useTeam').then((m) => m.loadTeam())
