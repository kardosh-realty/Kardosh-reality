import { computed } from 'vue'
import en from '@/locales/en.js'
import pt from '@/locales/pt.js'

const catalogs = { en, pt }

export function getMessages(locale) {
  return catalogs[locale] || catalogs.en
}

export { t } from '@/locales/t'
