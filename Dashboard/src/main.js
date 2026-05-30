import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initLanguage } from '@/composables/useLanguage'
import { loadSiteSettings } from '@/composables/useSiteSettings'

import './assets/css/tailwind.css';

initLanguage()
loadSiteSettings()

const app = createApp(App)

app.use(router)

app.mount('#app')
