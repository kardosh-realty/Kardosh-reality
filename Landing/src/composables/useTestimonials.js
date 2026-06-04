import { ref } from 'vue'
import { TESTIMONIALS } from '@/config/testimonials'
import { fetchPublishedTestimonials } from '@/services/testimonials'
import { getMessages } from '@/locales'
import { getLocaleId } from '@/composables/useLanguage'

/** Merge locale copy with portrait URLs from static config. */
function localizedStaticTestimonials() {
  const items = getMessages(getLocaleId()).testimonials?.items || []
  return items.map((item, i) => ({
    ...item,
    image:
      TESTIMONIALS[i]?.image ||
      TESTIMONIALS.find((t) => t.name === item.name)?.image ||
      TESTIMONIALS[0]?.image,
  }))
}

/** Published testimonials for home + about (falls back to static config). */
export const testimonials = ref([...localizedStaticTestimonials()])
export const testimonialsReady = ref(false)
export const testimonialsSource = ref('static') // 'supabase' | 'static'

let loadPromise = null

export async function loadTestimonials() {
  if (loadPromise) return loadPromise

  loadPromise = (async () => {
    const fromDb = await fetchPublishedTestimonials()
    if (fromDb?.length) {
      testimonials.value = fromDb
      testimonialsSource.value = 'supabase'
    } else {
      testimonials.value = localizedStaticTestimonials()
      testimonialsSource.value = 'static'
    }
    testimonialsReady.value = true
    loadPromise = null
  })()

  return loadPromise
}
