import { ref } from 'vue'
import { fetchLeads } from '@/services/leads'
import { fetchAllTestimonials } from '@/services/testimonials'
import { fetchProjects } from '@/services/reelly'
import { isSupabaseConfigured } from '@/lib/supabase'

const query = ref('')
const results = ref([])
const loading = ref(false)
let searchTimer = null
let cache = null

async function loadSearchIndex() {
  if (cache) return cache
  if (!isSupabaseConfigured()) {
    cache = { inquiries: [], projects: [], testimonials: [] }
    return cache
  }

  const [leadsRes, testimonialsRes, projectsRes] = await Promise.allSettled([
    fetchLeads({ limit: 200 }),
    fetchAllTestimonials(),
    fetchProjects({ limit: '80' }),
  ])

  cache = {
    inquiries: leadsRes.status === 'fulfilled' ? leadsRes.value.leads || [] : [],
    testimonials:
      testimonialsRes.status === 'fulfilled' ? testimonialsRes.value.items || [] : [],
    projects: projectsRes.status === 'fulfilled' ? projectsRes.value.results || [] : [],
  }
  return cache
}

function match(hay, q) {
  return hay.toLowerCase().includes(q)
}

export function useHeaderSearch() {
  function runSearch(text) {
    const q = String(text || '').trim().toLowerCase()
    query.value = text
    if (!q) {
      results.value = []
      loading.value = false
      return
    }

    clearTimeout(searchTimer)
    loading.value = true
    searchTimer = setTimeout(async () => {
      try {
        const index = await loadSearchIndex()
        const found = []

        for (const lead of index.inquiries) {
          const hay = [lead.name, lead.email, lead.phone, lead.project_name, lead.message]
            .filter(Boolean)
            .join(' ')
          if (match(hay, q)) {
            found.push({
              type: 'inquiry',
              icon: 'ri-mail-line',
              label: lead.name || 'Inquiry',
              sub: lead.project_name || lead.email || 'Inquiry',
              to: `/inquiries?lead=${lead.id}`,
            })
          }
        }

        for (const p of index.projects) {
          const hay = [p.title, p.developer, p.area, p.locationLabel].filter(Boolean).join(' ')
          if (match(hay, q)) {
            found.push({
              type: 'project',
              icon: 'ri-building-line',
              label: p.title,
              sub: p.locationLabel || p.developer || 'Project',
              to: `/off-plan/projects/${p.id}`,
            })
          }
        }

        for (const t of index.testimonials) {
          const hay = [t.name, t.role, t.text].filter(Boolean).join(' ')
          if (match(hay, q)) {
            found.push({
              type: 'testimonial',
              icon: 'ri-chat-quote-line',
              label: t.name,
              sub: t.pending ? 'Pending review' : 'Testimonial',
              to: '/testimonials',
            })
          }
        }

        results.value = found.slice(0, 12)
      } finally {
        loading.value = false
      }
    }, 200)
  }

  function clearSearch() {
    query.value = ''
    results.value = []
    loading.value = false
    clearTimeout(searchTimer)
  }

  function invalidateSearchCache() {
    cache = null
  }

  return {
    query,
    results,
    loading,
    runSearch,
    clearSearch,
    invalidateSearchCache,
  }
}
