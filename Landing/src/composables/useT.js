import { useMessages } from '@/composables/useMessages'
import { BRAND } from '@/config/brand'
import { t as translate } from '@/locales/t'

/** Reactive translator — `t('nav.home')` returns copy for the active locale. */
export function useT() {
  const messages = useMessages()
  return (key, params = {}) => translate(messages.value, key, { brand: BRAND.name, ...params })
}
