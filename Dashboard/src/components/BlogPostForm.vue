<template>
  <div class="blog-wizard w-full max-w-2xl mx-auto">
    <div class="mb-6">
      <div class="flex justify-between gap-1">
        <button
          v-for="(step, index) in steps"
          :key="step.id"
          type="button"
          class="flex flex-col items-center flex-1 min-w-0"
          :disabled="index > currentStep"
          @click="index <= currentStep && (currentStep = index)"
        >
          <span
            class="size-3 rounded-full transition-all duration-300"
            :class="
              index < currentStep
                ? 'bg-primary'
                : index === currentStep
                  ? 'bg-primary ring-4 ring-primary/20'
                  : 'bg-gray-200 dark:bg-gray-700'
            "
          />
          <span
            class="text-[10px] sm:text-xs mt-1.5 truncate w-full text-center"
            :class="index === currentStep ? 'text-primary font-medium' : 'text-slate-400'"
          >
            {{ step.title }}
          </span>
        </button>
      </div>
      <div class="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-3">
        <div
          class="h-full bg-primary transition-all duration-300 rounded-full"
          :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"
        />
      </div>
    </div>

    <div
      class="blog-wizard__card rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden flex flex-col max-h-[min(85vh,720px)]"
    >
      <Transition name="blog-wizard-slide" mode="out-in">
        <div :key="currentStep" class="flex flex-col min-h-0 flex-1 overflow-hidden">
          <!-- Step 1: Cover -->
          <template v-if="currentStep === 0">
            <div class="shrink-0 p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Cover image</h3>
              <p class="text-sm text-slate-400 mt-1">Hero image shown on the blog list and post header.</p>
            </div>
            <div class="blog-wizard__step-scroll p-6">
              <CoverImagePicker
                v-model="form.coverImage"
                label="Cover image file"
                :upload="uploadCover"
                :disabled="uploadingCover"
              />
            </div>
          </template>

          <!-- Step 2: Details -->
          <template v-else-if="currentStep === 1">
            <div class="shrink-0 p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Post details</h3>
              <p class="text-sm text-slate-400 mt-1">Title, URL, category, and short excerpt.</p>
            </div>
            <div class="blog-wizard__step-scroll p-6 space-y-4">
              <div>
                <UiLabel class="block mb-1.5">Title <span class="text-primary">*</span></UiLabel>
                <input
                  v-model.trim="form.title"
                  type="text"
                  required
                  placeholder="e.g. Dubai off-plan market outlook 2026"
                  class="form-input border border-gray-200! dark:border-gray-800! w-full rounded-lg"
                  @input="onTitleInput"
                />
              </div>
              <div>
                <UiLabel class="block mb-1.5">URL slug <span class="text-primary">*</span></UiLabel>
                <input
                  v-model.trim="form.slug"
                  type="text"
                  required
                  class="form-input border border-gray-200! dark:border-gray-800! w-full rounded-lg font-mono text-sm"
                  @input="slugTouched = true"
                />
                <p class="text-xs text-slate-400 mt-1">Public URL: /blog/{{ form.slug || '…' }}</p>
              </div>
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <UiLabel class="block mb-1.5">Category</UiLabel>
                  <input
                    v-model.trim="form.category"
                    type="text"
                    placeholder="Market insights"
                    class="form-input border border-gray-200! dark:border-gray-800! w-full rounded-lg"
                  />
                </div>
                <div>
                  <UiLabel class="block mb-1.5">Read time (minutes)</UiLabel>
                  <input
                    v-model.number="form.readMinutes"
                    type="number"
                    min="1"
                    max="120"
                    class="form-input border border-gray-200! dark:border-gray-800! w-full rounded-lg"
                  />
                </div>
              </div>
              <div>
                <UiLabel class="block mb-1.5">Excerpt</UiLabel>
                <textarea
                  v-model.trim="form.excerpt"
                  rows="3"
                  placeholder="Short summary for the blog listing card…"
                  class="form-input border border-gray-200! dark:border-gray-800! w-full rounded-lg"
                />
              </div>
            </div>
          </template>

          <!-- Step 3: Content -->
          <template v-else-if="currentStep === 2">
            <div class="shrink-0 p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Article content</h3>
              <p class="text-sm text-slate-400 mt-1">Headings, bold, lists, links, and inline images.</p>
            </div>
            <div class="blog-wizard__step-scroll blog-wizard__step-scroll--content p-6">
              <BlogRichEditor v-model="form.body" :upload-image="uploadCover" />
            </div>
          </template>

          <!-- Step 4: Publish -->
          <template v-else>
            <div class="shrink-0 p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Publish</h3>
              <p class="text-sm text-slate-400 mt-1">Review and go live on the website.</p>
            </div>
            <div class="blog-wizard__step-scroll p-6 space-y-4">
              <div class="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div class="aspect-[16/9] bg-slate-100 dark:bg-slate-800">
                  <img
                    v-if="form.coverImage"
                    :src="form.coverImage"
                    alt=""
                    class="size-full object-cover"
                  />
                  <div v-else class="size-full flex items-center justify-center text-slate-400 text-sm">
                    No cover image
                  </div>
                </div>
                <div class="p-4">
                  <p class="font-semibold">{{ form.title || '—' }}</p>
                  <p class="text-sm text-slate-400 mt-1 line-clamp-2">{{ form.excerpt || 'No excerpt' }}</p>
                  <p class="text-xs text-slate-400 mt-2 font-mono">/blog/{{ form.slug || '…' }}</p>
                </div>
              </div>
              <label class="inline-flex items-center gap-2 cursor-pointer">
                <input v-model="form.published" type="checkbox" class="rounded border-gray-300 text-primary" />
                <span class="text-sm font-medium">Visible on /blogs (public website)</span>
              </label>
              <p v-if="!form.published" class="text-xs text-amber-600 dark:text-amber-400">
                Unchecked posts stay as drafts and will not appear on the blog page.
              </p>
            </div>
          </template>
        </div>
      </Transition>

      <div class="shrink-0 flex justify-between gap-3 p-6 pt-2 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900">
        <button
          type="button"
          class="btn border border-gray-200 dark:border-gray-700 rounded-lg inline-flex items-center gap-1 px-4"
          :disabled="currentStep === 0"
          @click="prevStep"
        >
          <ChevronLeft class="size-4" /> Back
        </button>
        <button
          v-if="currentStep < steps.length - 1"
          type="button"
          class="btn bg-primary hover:bg-primary-dark text-white rounded-lg inline-flex items-center gap-1 px-5"
          :disabled="!canGoNext"
          @click="nextStep"
        >
          Next <ChevronRight class="size-4" />
        </button>
        <button
          v-else
          type="button"
          class="btn bg-primary hover:bg-primary-dark text-white rounded-lg inline-flex items-center gap-1 px-5 disabled:opacity-60"
          :disabled="saving || !canSave"
          @click="emitSave"
        >
          <Loader2 v-if="saving" class="size-4 animate-spin" />
          <Check v-else class="size-4" />
          {{ saving ? 'Saving…' : isEdit ? 'Save changes' : 'Publish post' }}
        </button>
      </div>
    </div>

    <p class="text-center text-xs text-slate-400 mt-4">
      Step {{ currentStep + 1 }} of {{ steps.length }}: {{ steps[currentStep].title }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-vue-next'
import UiLabel from '@/components/ui/Label.vue'
import CoverImagePicker from '@/components/ui/CoverImagePicker.vue'
import BlogRichEditor from '@/components/BlogRichEditor.vue'
import { BLOG_FORM_STEPS } from '@/config/blogForm'
import { slugify } from '@/utils/slugify'
import { blogBodyHasContent } from '@/services/blogs'

const props = defineProps({
  initial: { type: Object, default: null },
  saving: { type: Boolean, default: false },
  uploadCover: { type: Function, required: true },
})

const emit = defineEmits(['save'])

const steps = BLOG_FORM_STEPS
const currentStep = ref(0)
const slugTouched = ref(false)
const uploadingCover = ref(false)

const emptyForm = () => ({
  title: '',
  slug: '',
  excerpt: '',
  body: '',
  category: '',
  coverImage: '',
  authorName: 'Kardosh Realty',
  readMinutes: 5,
  published: true,
  sortOrder: 0,
})

const form = ref(emptyForm())

const isEdit = computed(() => !!props.initial?.id)

const canGoNext = computed(() => {
  if (currentStep.value === 1) return !!form.value.title.trim() && !!form.value.slug.trim()
  if (currentStep.value === 2) return blogBodyHasContent(form.value.body)
  return true
})

const canSave = computed(
  () =>
    !!form.value.title.trim() &&
    !!form.value.slug.trim() &&
    blogBodyHasContent(form.value.body)
)

watch(
  () => props.initial,
  (val) => {
    currentStep.value = 0
    slugTouched.value = false
    if (val) {
      form.value = {
        title: val.title || '',
        slug: val.slug || '',
        excerpt: val.excerpt || '',
        body: val.body || '',
        category: val.category || '',
        coverImage: val.coverImage || '',
        authorName: val.authorName || 'Kardosh Realty',
        readMinutes: val.readMinutes ?? 5,
        published: val.published === true,
        sortOrder: val.sortOrder ?? 0,
      }
      slugTouched.value = true
    } else {
      form.value = emptyForm()
    }
  },
  { immediate: true }
)

function onTitleInput() {
  if (!slugTouched.value) form.value.slug = slugify(form.value.title)
}

function nextStep() {
  if (currentStep.value < steps.length - 1 && canGoNext.value) {
    currentStep.value += 1
  }
}

function prevStep() {
  if (currentStep.value > 0) currentStep.value -= 1
}

function emitSave() {
  const payload = { ...form.value, id: props.initial?.id }
  if (!isEdit.value) payload.published = true
  emit('save', payload)
}
</script>

<style scoped>
.blog-wizard-slide-enter-active,
.blog-wizard-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.blog-wizard-slide-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.blog-wizard-slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

.blog-wizard__step-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.blog-wizard__step-scroll--content {
  max-height: min(52vh, 480px);
}
</style>
