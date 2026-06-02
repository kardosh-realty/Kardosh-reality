<template>
  <button
    type="button"
    class="download-btn"
    :class="{
      'download-btn--downloading': downloadStatus === 'downloading',
      'download-btn--busy': downloadStatus !== 'idle',
      'download-btn--complete': downloadStatus === 'complete',
    }"
    :disabled="downloadStatus !== 'idle' || !url"
    :aria-busy="downloadStatus === 'downloading'"
    @click="handleClick"
  >
    <span class="download-btn__content">
      <template v-if="downloadStatus === 'idle'">
        <Download class="size-4 shrink-0" aria-hidden="true" />
        {{ label }}
      </template>
      <template v-else-if="downloadStatus === 'downloading'">
        <Loader2 class="size-4 shrink-0 animate-spin" aria-hidden="true" />
        {{ progress }}%
      </template>
      <template v-else-if="downloadStatus === 'downloaded'">
        <CheckCircle class="size-4 shrink-0" aria-hidden="true" />
        Downloaded
      </template>
      <template v-else>
        {{ label }}
      </template>
    </span>

    <span
      v-if="downloadStatus === 'downloading'"
      class="download-btn__progress"
      :style="{ width: `${progress}%` }"
      aria-hidden="true"
    />
  </button>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { CheckCircle, Download, Loader2 } from 'lucide-vue-next'

const props = defineProps({
  url: { type: String, required: true },
  filename: { type: String, default: 'document.pdf' },
  label: { type: String, default: 'Download PDF' },
})

const downloadStatus = ref('idle')
const progress = ref(0)

/** @type {number[]} */
const intervals = []
/** @type {number[]} */
const timeouts = []

function clearTimers() {
  intervals.forEach(clearInterval)
  timeouts.forEach(clearTimeout)
  intervals.length = 0
  timeouts.length = 0
}

function resetDownload() {
  clearTimers()
  downloadStatus.value = 'idle'
  progress.value = 0
}

function openPdf() {
  const link = document.createElement('a')
  link.href = props.url
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  link.download = props.filename || 'document.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function handleClick() {
  if (downloadStatus.value !== 'idle' || !props.url) return

  downloadStatus.value = 'downloading'
  progress.value = 0
  openPdf()

  const interval = setInterval(() => {
    progress.value = Math.min(100, progress.value + 5)
    if (progress.value >= 100) {
      clearInterval(interval)
      downloadStatus.value = 'downloaded'

      const completeTimer = setTimeout(() => {
        downloadStatus.value = 'complete'
      }, 1500)
      timeouts.push(completeTimer)

      const resetTimer = setTimeout(resetDownload, 1600)
      timeouts.push(resetTimer)
    }
  }, 200)
  intervals.push(interval)
}

onBeforeUnmount(clearTimers)
</script>
