<template>
  <form class="property-lead-form space-y-4" @submit.prevent="onSubmit">
    <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
    <p v-if="success" class="text-slate-700 dark:text-slate-200 text-sm">{{ success }}</p>
    <div>
      <label class="form-label font-medium text-sm">Name *</label>
      <input v-model="form.name" type="text" required class="form-input w-full mt-1 border border-slate-200 dark:border-slate-700" />
    </div>
    <div>
      <label class="form-label font-medium text-sm">Email</label>
      <input v-model="form.email" type="email" class="form-input w-full mt-1 border border-slate-200 dark:border-slate-700" />
    </div>
    <div>
      <label class="form-label font-medium text-sm">Phone / WhatsApp</label>
      <input v-model="form.phone" type="tel" class="form-input w-full mt-1 border border-slate-200 dark:border-slate-700" />
    </div>
    <div>
      <label class="form-label font-medium text-sm">Message</label>
      <textarea
        v-model="form.message"
        rows="3"
        class="form-input w-full mt-1 border border-slate-200 dark:border-slate-700"
        :placeholder="messagePlaceholder"
      />
    </div>
    <button type="submit" class="btn bg-primary text-white w-full rounded-lg" :disabled="sending">
      {{ sending ? 'Sending…' : 'Send inquiry' }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { submitLead } from '@/services/leads'

const props = defineProps({
  projectId: { type: [String, Number], default: null },
  projectTitle: { type: String, default: '' },
  listingType: { type: String, default: 'off-plan' },
})

const form = ref({ name: '', email: '', phone: '', message: '' })
const sending = ref(false)
const error = ref('')
const success = ref('')

const messagePlaceholder = `I am interested in ${props.projectTitle || 'this property'}…`

watch(
  () => props.projectTitle,
  (t) => {
    if (t && !form.value.message) form.value.message = `I would like information about: ${t}`
  },
  { immediate: true }
)

async function onSubmit() {
  error.value = ''
  success.value = ''
  sending.value = true
  try {
    await submitLead({
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      message: form.value.message,
      listingType: props.listingType,
      projectId: props.projectId,
    })
    success.value = 'Thank you — we will contact you shortly.'
    form.value = { name: '', email: '', phone: '', message: '' }
  } catch (e) {
    error.value = e.message || 'Could not submit. Please try WhatsApp or call us.'
  } finally {
    sending.value = false
  }
}
</script>
