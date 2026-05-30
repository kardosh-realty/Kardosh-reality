<template>
  <div class="space-y-3">
    <a
      v-for="doc in documents"
      :key="doc.id || doc.url"
      :href="doc.url"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-primary transition group"
    >
      <span
        class="size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
      >
        <FileText class="size-5 text-primary" />
      </span>
      <div class="min-w-0 flex-1">
        <p class="font-medium text-slate-900 dark:text-white group-hover:text-primary transition truncate">
          {{ doc.name }}
        </p>
        <p v-if="doc.description" class="text-sm text-slate-500 mt-0.5 line-clamp-2">
          {{ doc.description }}
        </p>
      </div>
      <span class="text-primary text-sm font-medium shrink-0 flex items-center gap-1">
        <Download class="size-4" />
        Open PDF
      </span>
    </a>
    <p v-if="!documents?.length" class="text-slate-400 text-sm">{{ emptyText }}</p>
  </div>
</template>

<script setup>
import { FileText, Download } from 'lucide-vue-next'

defineProps({
  documents: { type: Array, default: () => [] },
  emptyText: { type: String, default: 'No documents available.' },
})
</script>
