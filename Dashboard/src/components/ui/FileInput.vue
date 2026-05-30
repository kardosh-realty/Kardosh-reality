<template>
  <input
    :id="id"
    ref="inputRef"
    type="file"
    :accept="accept"
    :disabled="disabled"
    :class="inputClass"
    @change="onChange"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  id: { type: String, default: undefined },
  accept: { type: String, default: undefined },
  disabled: { type: Boolean, default: false },
  class: { type: String, default: '' },
})

const emit = defineEmits(['change'])

const inputRef = ref(null)

const inputClass = computed(() =>
  cn(
    'flex h-9 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 px-0 py-0 text-sm text-slate-900 dark:text-slate-100 shadow-sm shadow-black/5 transition-shadow',
    'file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-gray-200 dark:file:border-gray-700 file:bg-transparent file:px-3 file:text-sm file:font-medium file:text-slate-700 dark:file:text-slate-200',
    'italic text-slate-400/80 file:not-italic',
    'focus-visible:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'p-0 pe-3',
    props.class
  )
)

function onChange(ev) {
  emit('change', ev)
}

defineExpose({ inputRef })
</script>
