import { useMessages } from '@/composables/useMessages'
import { t as translate } from '@/locales/t'

/** Reactive translator — `t('nav.home')` returns copy for the active locale. */
export function useT() {
  const messages = useMessages()
  return (key, params) => translate(messages.value, key, params)
}
