<template>
  <div
    class="flex size-14 md:size-16 shrink-0 items-center justify-center rounded-xl border border-slate-100 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/80 p-2 transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 dark:group-hover:bg-slate-600"
  >
    <img
      v-if="dev.logo?.url"
      :src="dev.logo.url"
      :alt="`${dev.name} logo`"
      class="max-h-full max-w-full object-contain"
      loading="lazy"
    />
    <span v-else class="text-xl font-bold text-primary">{{ dev.name?.charAt(0) }}</span>
  </div>
  <div class="min-w-0 flex-1">
    <h3
      class="font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors"
    >
      {{ dev.name }}
    </h3>
    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
      <template v-if="dev.projectCount">
        {{ dev.projectCount }} {{ dev.projectCount === 1 ? 'project' : 'projects' }}
      </template>
      <template v-else>View projects</template>
    </p>
  </div>
  <ChevronRight
    class="size-5 shrink-0 text-slate-300 dark:text-slate-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
    aria-hidden="true"
  />
</template>

<script setup>
import { ChevronRight } from 'lucide-vue-next'

defineProps({
  dev: { type: Object, required: true },
})
</script>
