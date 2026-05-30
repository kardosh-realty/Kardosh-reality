<template>
  <div class="property-overview-faq">
    <h2 class="mb-4">Project details</h2>
    <div class="space-y-2">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="rounded-xl overflow-hidden"
      >
        <button
          type="button"
          class="w-full flex items-center justify-between gap-4 px-5 py-4 text-start transition"
          :aria-expanded="openIndex === index"
          @click="toggle(index)"
        >
          <span class="font-medium">{{ item.title }}</span>
          <ChevronDown
            class="size-5 text-primary shrink-0 transition-transform duration-300"
            :class="openIndex === index ? 'rotate-180' : ''"
          />
        </button>
        <div
          v-show="openIndex === index"
          class="px-5 pb-5 pt-0 text-[15px] leading-relaxed whitespace-pre-line border-t"
        >
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps({
  items: { type: Array, default: () => [] },
})

const openIndex = ref(0)

function toggle(index) {
  openIndex.value = openIndex.value === index ? -1 : index
}

watch(
  () => props.items,
  (list) => {
    openIndex.value = list?.length ? 0 : -1
  },
  { immediate: true }
)
</script>
