<template>
  <div :class="gridClass">
    <PropertyListingCard
      v-for="(item, index) in paginatedItems"
      :key="`${item.source || 'item'}-${item.id}-${index}`"
      :item="item"
      :variant="cardVariant"
    />
  </div>
  <div v-if="totalPages > 1" class="grid md:grid-cols-12 grid-cols-1 mt-8">
    <div class="md:col-span-12 text-center">
      <nav aria-label="Pagination">
        <ul class="inline-flex flex-wrap items-center justify-center gap-1">
          <li>
            <button
              type="button"
              :disabled="currentPage <= 1"
              class="pagination-btn"
              :aria-label="prevLabel"
              @click="goToPage(currentPage - 1)"
            >
              <ChevronLeft class="text-[20px]" />
            </button>
          </li>
          <li v-for="(item, idx) in pageItems" :key="`${item}-${idx}`">
            <span v-if="item === 'ellipsis'" class="pagination-ellipsis" aria-hidden="true">…</span>
            <button
              v-else
              type="button"
              :class="item === currentPage ? 'pagination-page--active' : 'pagination-btn'"
              class="size-10 inline-flex justify-center items-center rounded-full shadow-xs text-sm font-medium"
              :aria-current="item === currentPage ? 'page' : undefined"
              @click="goToPage(item)"
            >
              {{ item }}
            </button>
          </li>
          <li>
            <button
              type="button"
              :disabled="currentPage >= totalPages"
              class="pagination-btn"
              :aria-label="nextLabel"
              @click="goToPage(currentPage + 1)"
            >
              <ChevronRight class="text-[20px]" />
            </button>
          </li>
        </ul>
        <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">
          {{ summary }}
        </p>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import PropertyListingCard from '@/component/kardosh/PropertyListingCard.vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  items: { type: Array, required: true },
  itemsPerPage: { type: Number, default: 6 },
  gridClass: { type: String, default: '' },
  cardVariant: { type: String, default: 'default' },
  prevLabel: { type: String, default: 'Previous page' },
  nextLabel: { type: String, default: 'Next page' },
  summaryTemplate: { type: String, default: '' },
})

const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(props.items.length / props.itemsPerPage)))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  return props.items.slice(start, start + props.itemsPerPage)
})

const pageItems = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages = new Set([1, total, cur - 1, cur, cur + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const out = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push('ellipsis')
    out.push(sorted[i])
  }
  return out
})

const summary = computed(() => {
  if (!props.items.length) return ''
  const start = (currentPage.value - 1) * props.itemsPerPage + 1
  const end = Math.min(currentPage.value * props.itemsPerPage, props.items.length)
  if (props.summaryTemplate) {
    return props.summaryTemplate
      .replace('{start}', String(start))
      .replace('{end}', String(end))
      .replace('{total}', String(props.items.length))
  }
  return `Showing ${start}–${end} of ${props.items.length}`
})

function goToPage(page) {
  const next = Math.min(Math.max(1, page), totalPages.value)
  currentPage.value = next
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

watch(
  () => [props.items.length, props.itemsPerPage],
  () => {
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
    else currentPage.value = 1
  }
)
</script>

<style scoped>
.pagination-btn {
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  color: #64748b;
  background: #fff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgb(15 23 42 / 0.05);
  transition: border-color 0.15s, color 0.15s;
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--color-primary, #0a0a0a);
  color: var(--color-primary, #0a0a0a);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-ellipsis {
  display: inline-flex;
  width: 2rem;
  justify-content: center;
  color: #94a3b8;
  user-select: none;
}

.pagination-page--active {
  color: #ffffff;
  background: var(--color-primary, #0a0a0a);
  border: 1px solid transparent;
}

.dark .pagination-btn {
  color: #94a3b8;
  background: rgb(30 41 59);
  border-color: rgb(71 85 105);
}

.dark .pagination-page--active {
  color: var(--kardosh-ink, #0a0a0a);
  background: var(--kardosh-paper, #fafafa);
  border-color: var(--kardosh-paper, #fafafa);
}
</style>
