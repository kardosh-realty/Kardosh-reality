<template>
  <div class="space-y-3">
    <div
      v-for="doc in documents"
      :key="doc.id || doc.url"
      class="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
    >
      <span
        class="size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
      >
        <FileText class="size-5 text-primary" />
      </span>
      <div class="min-w-0 flex-1">
        <p class="font-medium text-slate-900 dark:text-white truncate">
          {{ doc.name }}
        </p>
        <p v-if="doc.description" class="text-sm text-slate-500 mt-0.5 line-clamp-2">
          {{ doc.description }}
        </p>
      </div>
      <DownloadButton
        v-if="allowDownload"
        :url="doc.url"
        :filename="doc.name"
        class="shrink-0"
      />
      <p v-else class="text-xs text-slate-400 shrink-0 text-right max-w-[9rem] leading-snug">
        {{ lockedText }}
      </p>
    </div>
    <p v-if="!documents?.length" class="text-slate-400 text-sm">{{ emptyText }}</p>
  </div>
</template>

<script setup>
import { FileText } from 'lucide-vue-next'
import DownloadButton from '@/components/ui/DownloadButton.vue'

defineProps({
  documents: { type: Array, default: () => [] },
  emptyText: { type: String, default: 'No documents available.' },
  /** When false, PDFs are listed but not downloadable on the public site. */
  allowDownload: { type: Boolean, default: false },
  lockedText: { type: String, default: 'Available on request' },
})
</script>
