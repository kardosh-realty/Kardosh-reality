<template>
  <div :class="gridClass">
    <PropertyListingCard
      v-for="(item, index) in paginatedItems"
      :key="`${item.source || 'item'}-${item.id}-${index}`"
      :item="item"
      :variant="cardVariant"
    />
  </div>
  <div class="grid md:grid-cols-12 grid-cols-1 mt-8">
    <div class="md:col-span-12 text-center">
      <nav>
        <ul class="inline-flex items-center -space-x-px">
          <li>
            <button
              type="button"
              :disabled="currentPage <= 1"
              class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-primary hover:text-primary dark:hover:text-primary shadow-xs disabled:opacity-40"
              @click="currentPage--"
            >
              <ChevronLeft class="text-[20px]" />
            </button>
          </li>
          <li v-for="page in totalPages" :key="page">
            <button
              type="button"
              :class="
                page === currentPage
                  ? 'pagination-page--active'
                  : 'text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-primary hover:text-primary dark:hover:text-primary'
              "
              class="size-10 inline-flex justify-center items-center mx-1 rounded-full shadow-xs"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </li>
          <li>
            <button
              type="button"
              :disabled="currentPage >= totalPages"
              class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-primary hover:text-primary dark:hover:text-primary shadow-xs disabled:opacity-40"
              @click="currentPage++"
            >
              <ChevronRight class="text-[20px]" />
            </button>
          </li>
        </ul>
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
  /** default | luxury — passed to PropertyListingCard */
  cardVariant: { type: String, default: 'default' },
})

const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(props.items.length / props.itemsPerPage)))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  return props.items.slice(start, start + props.itemsPerPage)
})

watch(
  () => props.items,
  () => {
    currentPage.value = 1
  }
)
</script>

<style scoped>
.pagination-page--active {
  color: #ffffff;
  background: var(--color-primary, #0a0a0a);
  border: 1px solid transparent;
}

.dark .pagination-page--active {
  color: var(--kardosh-ink, #0a0a0a);
  background: var(--kardosh-paper, #fafafa);
  border-color: var(--kardosh-paper, #fafafa);
}
</style>
