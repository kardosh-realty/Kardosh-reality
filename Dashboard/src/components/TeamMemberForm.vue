<template>
  <div class="team-wizard w-full max-w-lg mx-auto">
    <!-- Progress -->
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

    <!-- Card -->
    <div class="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden">
      <Transition name="team-wizard-slide" mode="out-in">
        <div :key="currentStep">
          <!-- Step 1: Profile -->
          <template v-if="currentStep === 0">
            <div class="p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Team member profile</h3>
              <p class="text-sm text-slate-400 mt-1">Name, role, and photo for the About page carousel.</p>
            </div>
            <div class="p-6 space-y-4">
              <div class="flex items-center gap-4">
                <div class="size-20 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <img v-if="form.image" :src="form.image" alt="" class="size-full object-cover" />
                  <i v-else class="ri-user-line text-2xl text-slate-400"></i>
                </div>
                <div>
                  <input ref="photoInput" type="file" accept="image/*" class="hidden" @change="onPhotoChange" />
                  <button
                    type="button"
                    class="btn bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md text-sm"
                    :disabled="uploadingPhoto"
                    @click="photoInput?.click()"
                  >
                    {{ uploadingPhoto ? 'Uploading…' : 'Upload photo' }}
                  </button>
                  <p class="text-xs text-slate-400 mt-2">Portrait recommended</p>
                </div>
              </div>
              <div>
                <label class="text-sm font-medium">Full name <span class="text-primary">*</span></label>
                <input
                  v-model.trim="form.name"
                  type="text"
                  required
                  placeholder="e.g. Omar Al Hashimi"
                  class="form-input border border-gray-200! dark:border-gray-800! mt-1.5 w-full rounded-lg"
                />
              </div>
              <div>
                <label class="text-sm font-medium">Designation</label>
                <input
                  v-model.trim="form.designation"
                  type="text"
                  placeholder="e.g. Senior Broker"
                  class="form-input border border-gray-200! dark:border-gray-800! mt-1.5 w-full rounded-lg"
                />
              </div>
            </div>
          </template>

          <!-- Step 2: Social links -->
          <template v-else-if="currentStep === 1">
            <div class="p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Social & contact</h3>
              <p class="text-sm text-slate-400 mt-1">Add any profiles or ways to reach this team member.</p>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <div
                  v-for="(link, i) in form.links"
                  :key="i"
                  class="grid grid-cols-[1fr_auto] sm:grid-cols-[11rem_minmax(0,1fr)_auto] gap-3 items-center"
                >
                  <select
                    v-model="link.platform"
                    class="form-select form-input border border-gray-200! dark:border-gray-800! w-full min-w-0 col-span-2 sm:col-span-1 rounded-lg"
                  >
                    <option v-for="opt in platformOptions" :key="opt.value" :value="opt.value">
                      {{ opt.label }}
                    </option>
                  </select>
                  <input
                    v-model.trim="link.url"
                    :type="link.platform === 'email' ? 'email' : link.platform === 'phone' || link.platform === 'whatsapp' ? 'tel' : 'url'"
                    :placeholder="urlPlaceholder(link.platform)"
                    class="form-input border border-gray-200! dark:border-gray-800! w-full min-w-0 rounded-lg"
                  />
                  <button
                    type="button"
                    class="inline-flex items-center justify-center size-10 rounded-md border border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 shrink-0"
                    aria-label="Remove link"
                    @click="removeLink(i)"
                  >
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </div>
                <p v-if="!form.links.length" class="text-sm text-slate-400 py-2">No links yet — add LinkedIn, email, WhatsApp, etc.</p>
              </div>
              <button
                type="button"
                class="btn bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md text-sm mt-4 w-full sm:w-auto"
                @click="addLink"
              >
                <i class="ri-add-line me-1"></i> Add social
              </button>
            </div>
          </template>

          <!-- Step 3: Publish -->
          <template v-else>
            <div class="p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Publish settings</h3>
              <p class="text-sm text-slate-400 mt-1">Control visibility on the public About page.</p>
            </div>
            <div class="p-6 space-y-4">
              <div class="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-slate-800/50">
                <div class="size-14 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
                  <img v-if="form.image" :src="form.image" alt="" class="size-full object-cover" />
                </div>
                <div class="min-w-0">
                  <p class="font-semibold truncate">{{ form.name || '—' }}</p>
                  <p class="text-sm text-slate-400 truncate">{{ form.designation || 'No designation' }}</p>
                  <p class="text-xs text-slate-400 mt-1">{{ form.links.filter((l) => l.url).length }} link(s)</p>
                </div>
              </div>
              <div>
                <label class="text-sm font-medium">Sort order</label>
                <input
                  v-model.number="form.sortOrder"
                  type="number"
                  min="0"
                  class="form-input border border-gray-200! dark:border-gray-800! mt-1.5 w-full rounded-lg"
                />
                <p class="text-xs text-slate-400 mt-1">Lower numbers appear first in the carousel.</p>
              </div>
              <label class="inline-flex items-center gap-2 cursor-pointer">
                <input v-model="form.published" type="checkbox" class="rounded border-gray-300 text-primary" />
                <span class="text-sm font-medium">Published on About page</span>
              </label>
            </div>
          </template>
        </div>
      </Transition>

      <div class="flex justify-between gap-3 p-6 pt-2 border-t border-gray-100 dark:border-gray-800">
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
          :disabled="saving || !form.name.trim()"
          @click="emitSave"
        >
          <Loader2 v-if="saving" class="size-4 animate-spin" />
          <Check v-else class="size-4" />
          {{ saving ? 'Saving…' : isEdit ? 'Save changes' : 'Add member' }}
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
import { TEAM_FORM_STEPS, TEAM_PLATFORM_OPTIONS } from '@/config/teamPlatforms'
import { useToast } from '@/composables/useToast'
import { uploadTeamPhoto } from '@/services/team'
import { normalizeLinks } from '@/utils/teamLinks'

const toast = useToast()

const props = defineProps({
  initial: { type: Object, default: null },
  saving: { type: Boolean, default: false },
})

const emit = defineEmits(['save', 'cancel'])

const steps = TEAM_FORM_STEPS
const platformOptions = TEAM_PLATFORM_OPTIONS
const currentStep = ref(0)
const uploadingPhoto = ref(false)
const photoInput = ref(null)

const emptyForm = () => ({
  name: '',
  designation: '',
  image: '',
  links: [],
  published: true,
  sortOrder: 0,
})

const form = ref(emptyForm())

const isEdit = computed(() => !!props.initial?.id)

const canGoNext = computed(() => {
  if (currentStep.value === 0) return !!form.value.name.trim()
  return true
})

watch(
  () => props.initial,
  (val) => {
    currentStep.value = 0
    if (val) {
      form.value = {
        name: val.name || '',
        designation: val.designation || '',
        image: val.image || '',
        links: normalizeLinks(val.links).map((l) => ({ ...l })),
        published: val.published !== false,
        sortOrder: val.sortOrder ?? 0,
      }
    } else {
      form.value = emptyForm()
    }
  },
  { immediate: true }
)

function urlPlaceholder(platform) {
  if (platform === 'email') return 'name@kardoshrealty.ae'
  if (platform === 'phone' || platform === 'whatsapp') return '+971 50 …'
  return 'https://…'
}

function addLink() {
  form.value.links.push({ platform: 'linkedin', url: '' })
}

function removeLink(i) {
  form.value.links.splice(i, 1)
}

function nextStep() {
  if (currentStep.value < steps.length - 1 && canGoNext.value) {
    currentStep.value += 1
  }
}

function prevStep() {
  if (currentStep.value > 0) currentStep.value -= 1
}

async function onPhotoChange(ev) {
  const file = ev.target?.files?.[0]
  if (!file) return
  uploadingPhoto.value = true
  try {
    form.value.image = await uploadTeamPhoto(file)
    toast.success('Photo uploaded.')
  } catch (e) {
    toast.error(e.message || 'Upload failed')
  } finally {
    uploadingPhoto.value = false
    if (photoInput.value) photoInput.value.value = ''
  }
}

function emitSave() {
  emit('save', { ...form.value, id: props.initial?.id })
}
</script>

<style scoped>
.team-wizard-slide-enter-active,
.team-wizard-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.team-wizard-slide-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.team-wizard-slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>
