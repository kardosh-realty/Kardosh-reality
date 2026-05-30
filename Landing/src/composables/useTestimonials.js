import { ref } from 'vue'
import { TESTIMONIALS } from '@/config/testimonials'
import { fetchPublishedTestimonials } from '@/services/testimonials'

/** Published testimonials for home + about (falls back to static config). */
export const testimonials = ref([...TESTIMONIALS])
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
      testimonials.value = [...TESTIMONIALS]
      testimonialsSource.value = 'static'
    }
    testimonialsReady.value = true
    loadPromise = null
  })()

  return loadPromise
}
