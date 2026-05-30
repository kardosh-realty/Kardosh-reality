import { ref } from 'vue'
import { teamdata as STATIC_TEAM } from '@/component/data/data'
import { fetchPublishedTeam } from '@/services/team'

/** Team for About page carousel (falls back to static data.js). */
export const teamMembers = ref([...STATIC_TEAM])

let loadPromise = null

export async function loadTeam() {
  if (loadPromise) return loadPromise

  loadPromise = (async () => {
    const fromDb = await fetchPublishedTeam()
    if (fromDb?.length) {
      teamMembers.value = fromDb
    } else {
      teamMembers.value = [...STATIC_TEAM]
    }
    loadPromise = null
  })()

  return loadPromise
}
