<template>
  <div class="space-y-3 min-w-0">
    <UiLabel :html-for="inputId">{{ label }}</UiLabel>

    <div
      class="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-100 dark:bg-slate-800 shadow-sm"
    >
      <img
        :src="displaySrc"
        :alt="previewAlt"
        class="absolute inset-0 size-full object-cover"
      />
      <div
        v-if="uploading"
        class="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm gap-2"
      >
        <Loader2 class="size-5 animate-spin" />
        Uploading…
      </div>
    </div>

    <UiFileInput
      :id="inputId"
      ref="fileInputRef"
      accept="image/*"
      class="file:border-e"
      :disabled="uploading || disabled"
      @change="onFileChange"
    />

    <p v-if="fileName" class="text-xs text-slate-500 truncate">
      Selected: <span class="font-medium text-slate-700 dark:text-slate-300">{{ fileName }}</span>
    </p>
    <p v-else class="text-xs text-slate-400">
      {{ hint }}
    </p>

    <button
      v-if="modelValue && !uploading"
      type="button"
      class="text-xs text-red-600 hover:underline"
      @click="clearCover"
    >
      Remove cover image
    </button>
  </div>
</template>

<script setup>
import { computed, ref, useId } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import UiLabel from '@/components/ui/Label.vue'
import UiFileInput from '@/components/ui/FileInput.vue'
import { useToast } from '@/composables/useToast'

const toast = useToast()

/** Default hero placeholder (Dubai skyline — Unsplash). */
const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=675&fit=crop&q=80'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: 'Cover image' },
  hint: { type: String, default: 'JPG or PNG, 16:9 recommended for the blog hero.' },
  previewAlt: { type: String, default: 'Blog cover preview' },
  upload: { type: Function, required: true },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const uid = useId()
const inputId = `cover-${uid}`
const fileInputRef = ref(null)
const uploading = ref(false)
const fileName = ref('')

const displaySrc = computed(() => props.modelValue || DEFAULT_COVER)

async function onFileChange(ev) {
  const file = ev.target?.files?.[0]
  if (!file) return
  fileName.value = file.name
  uploading.value = true
  try {
    const url = await props.upload(file)
    emit('update:modelValue', url)
    toast.success('Cover image uploaded.')
  } catch (e) {
    fileName.value = ''
    toast.error(e.message || 'Upload failed')
  } finally {
    uploading.value = false
    const el = fileInputRef.value?.inputRef
    if (el) el.value = ''
  }
}

function clearCover() {
  fileName.value = ''
  emit('update:modelValue', '')
  const el = fileInputRef.value?.inputRef
  if (el) el.value = ''
}
</script>
