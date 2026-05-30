<template>
  <div class="property-floor-plan-groups space-y-2">
    <div
      v-for="group in groups"
      :key="group.key"
      class="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between gap-4 px-5 py-4 text-start hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
        :aria-expanded="isOpen(group.key)"
        @click="toggle(group.key)"
      >
        <div class="min-w-0">
          <span class="font-semibold text-slate-900 dark:text-white">{{ group.label }}</span>
          <p v-if="group.summary" class="text-sm text-slate-500 mt-0.5 truncate">{{ group.summary }}</p>
          <p
            v-if="group.priceLabel"
            class="text-sm text-primary font-medium mt-1"
          >
            {{ group.priceLabel }}
          </p>
        </div>
        <ChevronDown
          class="size-5 text-primary shrink-0 transition-transform duration-300"
          :class="isOpen(group.key) ? 'rotate-180' : ''"
        />
      </button>

      <div
        v-show="isOpen(group.key)"
        class="px-5 pb-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40"
      >
        <div
          v-if="group.floorPlans.length"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-4"
        >
          <button
            v-for="(plan, pi) in group.floorPlans"
            :key="plan.url + pi"
            type="button"
            class="group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-primary transition text-start"
            @click="emit('open-plan', group.floorPlans, pi)"
          >
            <ProtectedPropertyImage
              :src="plan.url"
              :alt="plan.name"
              img-class="w-full aspect-[4/3] object-contain bg-slate-100 dark:bg-slate-800 p-2"
              watermark-size="thumb"
            />
            <div class="px-2 py-1.5 min-w-0">
              <p class="text-xs text-slate-500 truncate group-hover:text-primary">{{ plan.name }}</p>
              <p
                v-if="group.showPlanPrices && plan.priceLabel"
                class="text-[10px] text-primary font-medium mt-0.5 truncate"
              >
                {{ plan.priceLabel }}
              </p>
            </div>
          </button>
        </div>
        <p v-else class="text-sm text-slate-400 py-4">No floor plan images for this configuration.</p>
      </div>
    </div>

    <div
      v-if="projectPlans?.length"
      class="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 mt-6"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between gap-4 px-5 py-4 text-start hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
        :aria-expanded="isOpen('project')"
        @click="toggle('project')"
      >
        <div>
          <span class="font-semibold text-slate-900 dark:text-white">Project floor plans</span>
          <p class="text-sm text-slate-500 mt-0.5">
            {{ projectPlans.length }} floor plan{{ projectPlans.length === 1 ? '' : 's' }}
          </p>
        </div>
        <ChevronDown
          class="size-5 text-primary shrink-0 transition-transform duration-300"
          :class="isOpen('project') ? 'rotate-180' : ''"
        />
      </button>
      <div
        v-show="isOpen('project')"
        class="px-5 pb-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40"
      >
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
          <button
            v-for="(fp, i) in projectPlans"
            :key="fp.id || fp.url + i"
            type="button"
            class="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-primary transition text-start"
            @click="emit('open-plan', projectPlanItems, i)"
          >
            <ProtectedPropertyImage
              :src="fp.url"
              :alt="fp.name"
              img-class="w-full aspect-[4/3] object-contain bg-slate-100 dark:bg-slate-800 p-2"
              watermark-size="thumb"
            />
            <p class="text-xs text-slate-500 px-2 py-1.5 truncate">{{ fp.name }}</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import ProtectedPropertyImage from '@/component/kardosh/ProtectedPropertyImage.vue'

const props = defineProps({
  groups: { type: Array, default: () => [] },
  projectPlans: { type: Array, default: () => [] },
})

const emit = defineEmits(['open-plan'])

const expandedKeys = ref(new Set())

const projectPlanItems = computed(() =>
  props.projectPlans.map((p) => ({ url: p.url, name: p.name }))
)

function isOpen(key) {
  return expandedKeys.value.has(key)
}

function toggle(key) {
  const next = new Set(expandedKeys.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  expandedKeys.value = next
}
</script>
