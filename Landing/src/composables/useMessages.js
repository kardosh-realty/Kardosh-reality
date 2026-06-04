import { computed } from 'vue'
import { getMessages } from '@/locales'
import { useLanguage } from '@/composables/useLanguage'

/** UI messages for the active locale (content translation fills in later). */
export function useMessages() {
  const { locale } = useLanguage()
  return computed(() => getMessages(locale.value))
}
