import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initLanguage } from '@/composables/useLanguage'
import { loadSiteSettings } from '@/composables/useSiteSettings'
import { initTheme } from '@/composables/useTheme'
import { initPalette } from '@/composables/usePalette'

import './assets/css/tailwind.css'

if (typeof window !== 'undefined') {
  initTheme()
  initPalette()
}

initLanguage()
loadSiteSettings()

const app = createApp(App)

app.use(router)

app.mount('#app')
