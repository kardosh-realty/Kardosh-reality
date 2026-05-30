<template>
  <Teleport to="body">
    <div
      v-if="open && lead"
      class="fixed inset-0 z-[200] flex justify-end dash-drawer-sheet"
      role="dialog"
      aria-modal="true"
      :aria-label="`Inquiry from ${lead.name}`"
    >
      <button
        type="button"
        class="absolute inset-0 bg-black/40"
        aria-label="Close"
        @click="emit('close')"
      />
      <aside
        class="dash-drawer-panel relative w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-xl border-s border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
      >
        <div class="flex items-start justify-between gap-3 p-5 border-b border-gray-100 dark:border-gray-800">
          <div class="min-w-0">
            <h3 class="text-lg font-semibold truncate">{{ lead.name }}</h3>
            <p class="text-sm text-slate-400 mt-0.5">{{ formatDate(lead.created_at) }}</p>
          </div>
          <button
            type="button"
            class="size-9 shrink-0 inline-flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            @click="emit('close')"
          >
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-5 space-y-5">
          <div>
            <label class="text-xs font-medium text-slate-400 uppercase tracking-wide">Status</label>
            <select
              v-model="localStatus"
              class="form-select form-input border border-gray-200! dark:border-gray-800! mt-1.5 w-full rounded-lg"
              :disabled="saving"
              @change="onStatusChange"
            >
              <option v-for="s in LEAD_STATUSES" :key="s.value" :value="s.value">
                {{ s.label }}
              </option>
            </select>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-if="lead.status === 'new'"
              type="button"
              class="btn bg-primary hover:bg-primary-dark text-white rounded-md text-sm"
              :disabled="saving"
              @click="markContacted"
            >
              Mark contacted
            </button>
            <a
              v-if="lead.phone"
              :href="whatsAppHref"
              target="_blank"
              rel="noopener noreferrer"
              class="btn border border-emerald-600/30 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-md text-sm inline-flex items-center gap-1"
            >
              <i class="ri-whatsapp-line"></i> WhatsApp
            </a>
            <a
              v-if="lead.email"
              :href="mailtoHref"
              class="btn border border-gray-200 dark:border-gray-700 rounded-md text-sm inline-flex items-center gap-1"
            >
              <i class="ri-mail-line"></i> Email
            </a>
          </div>

          <div class="grid grid-cols-1 gap-3 text-sm">
            <div v-if="lead.email" class="flex items-center justify-between gap-2">
              <span class="text-slate-400">Email</span>
              <span class="font-medium truncate">{{ lead.email }}</span>
              <button type="button" class="text-primary text-xs shrink-0" @click="copy(lead.email)">Copy</button>
            </div>
            <div v-if="lead.phone" class="flex items-center justify-between gap-2">
              <span class="text-slate-400">Phone</span>
              <span class="font-medium">{{ lead.phone }}</span>
              <button type="button" class="text-primary text-xs shrink-0" @click="copy(lead.phone)">Copy</button>
            </div>
            <div v-if="lead.listing_type">
              <span class="text-slate-400 block">Interest</span>
              <span class="font-medium capitalize">{{ lead.listing_type }}</span>
            </div>
            <div v-if="lead.source">
              <span class="text-slate-400 block">Source</span>
              <span class="font-medium">{{ sourceLabel(lead.source) }}</span>
            </div>
            <div>
              <span class="text-slate-400 block">Project</span>
              <RouterLink
                v-if="lead.project_id"
                :to="`/off-plan/projects/${lead.project_id}`"
                class="font-medium text-primary hover:underline inline-flex items-center gap-1"
              >
                <i class="ri-building-line"></i>
                {{ lead.project_name || lead.project_id }}
              </RouterLink>
              <span v-else class="font-medium">{{ lead.project_name || 'General inquiry' }}</span>
            </div>
          </div>

          <div>
            <span class="text-xs font-medium text-slate-400 uppercase tracking-wide">Message</span>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap rounded-lg border border-gray-100 dark:border-gray-800 p-3 bg-gray-50/80 dark:bg-slate-800/50">
              {{ lead.message || 'No message provided.' }}
            </p>
          </div>

          <div>
            <label class="text-xs font-medium text-slate-400 uppercase tracking-wide">Internal notes</label>
            <textarea
              v-model="localNotes"
              rows="4"
              placeholder="Follow-up notes (visible to admins only)…"
              class="form-input border border-gray-200! dark:border-gray-800! mt-1.5 w-full rounded-lg text-sm"
            />
            <button
              type="button"
              class="btn bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md text-sm mt-2"
              :disabled="saving"
              @click="saveNotes"
            >
              {{ saving ? 'Saving…' : 'Save notes' }}
            </button>
          </div>

          <div class="pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              class="btn border border-red-200 dark:border-red-900 text-red-600 hover:bg-red-600 hover:text-white rounded-md text-sm w-full"
              :disabled="saving || deleting"
              @click="onDelete"
            >
              {{ deleting ? 'Removing…' : 'Delete inquiry' }}
            </button>
            <p class="text-[11px] text-slate-400 mt-2 text-center">Removes spam or duplicate leads permanently.</p>
          </div>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { LEAD_STATUSES } from '@/config/leads'
import { updateLead, markLeadContacted, deleteLead } from '@/services/leads'
import { buildLeadMailto, buildLeadWhatsApp, copyToClipboard } from '@/utils/inquiryActions'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  open: { type: Boolean, default: false },
  lead: { type: Object, default: null },
})

const emit = defineEmits(['close', 'updated', 'mark-contacted', 'deleted'])

const toast = useToast()
const saving = ref(false)
const deleting = ref(false)
const localStatus = ref('new')
const localNotes = ref('')

const SOURCE_LABELS = {
  property_page: 'Project page',
  contact_page: 'Contact page',
  home_form: 'Home form',
}

const mailtoHref = computed(() => (props.lead ? buildLeadMailto(props.lead) : '#'))
const whatsAppHref = computed(() => (props.lead ? buildLeadWhatsApp(props.lead) : '#'))

watch(
  () => props.lead,
  (l) => {
    if (!l) return
    localStatus.value = l.status || 'new'
    localNotes.value = l.internal_notes || ''
  },
  { immediate: true }
)

function sourceLabel(source) {
  return SOURCE_LABELS[source] || source
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('en-AE', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
}

async function copy(text) {
  const ok = await copyToClipboard(text)
  if (ok) toast.success('Copied.')
  else toast.error('Could not copy.')
}

async function onStatusChange() {
  if (!props.lead?.id) return
  saving.value = true
  try {
    const updated = await updateLead(props.lead.id, { status: localStatus.value })
    emit('updated', updated)
    toast.success('Status updated.')
  } catch (e) {
    localStatus.value = props.lead.status || 'new'
    toast.error(e.message || 'Could not update status')
  } finally {
    saving.value = false
  }
}

async function saveNotes() {
  if (!props.lead?.id) return
  saving.value = true
  try {
    const updated = await updateLead(props.lead.id, { internal_notes: localNotes.value })
    emit('updated', updated)
    toast.success('Notes saved.')
  } catch (e) {
    toast.error(e.message || 'Could not save notes')
  } finally {
    saving.value = false
  }
}

async function markContacted() {
  if (!props.lead?.id) return
  saving.value = true
  try {
    const updated = await markLeadContacted(props.lead.id)
    localStatus.value = 'contacted'
    emit('updated', updated)
    emit('mark-contacted', updated)
    toast.success('Marked as contacted.')
  } catch (e) {
    toast.error(e.message || 'Could not update')
  } finally {
    saving.value = false
  }
}

async function onDelete() {
  if (!props.lead?.id) return
  if (!confirm(`Delete inquiry from ${props.lead.name || 'this visitor'}? This cannot be undone.`)) return
  deleting.value = true
  try {
    await deleteLead(props.lead.id)
    emit('deleted', props.lead.id)
    emit('close')
  } catch (e) {
    toast.error(e.message || 'Could not delete inquiry')
  } finally {
    deleting.value = false
  }
}
</script>
