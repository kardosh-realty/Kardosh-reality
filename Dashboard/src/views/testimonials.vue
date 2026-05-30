<template>
  <div class="container-fluid relative px-3 dash-page">
    <div class="layout-specing">
      <div class="md:flex justify-between items-center gap-4">
        <PageHeader title="Testimonials" crumb="Client reviews on the home and about pages" />
        <div class="flex flex-wrap items-center gap-2 mt-3 md:mt-0 shrink-0">
          <button
            type="button"
            class="btn border border-gray-200 dark:border-gray-700 rounded-md inline-flex items-center gap-2"
            :disabled="!configured || creatingLink"
            @click="onCreateShareLink"
          >
            <i class="ri-link"></i>
            {{ creatingLink ? 'Creating…' : (shareLinks.length ? 'Create another link' : 'Get customer link') }}
          </button>
          <button
            type="button"
            class="btn bg-primary hover:bg-primary-dark text-white rounded-md inline-flex items-center gap-2"
            :disabled="!configured"
            @click="openCreate"
          >
            <i class="ri-add-line" /> Add testimonial
          </button>
        </div>
      </div>

      <!-- Shareable customer review links -->
      <div
        v-if="configured && shareLinks.length"
        class="mt-6 rounded-md border border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
      >
        <h6 class="text-sm font-semibold text-slate-700 dark:text-slate-200">Customer review links</h6>
        <p class="text-xs text-slate-400 mt-1">
          One link can be shared with <strong>any number of clients</strong> — each person submits their own review.
          New entries appear as <strong>Pending</strong> until you publish them. Keep the link <strong>Active</strong> while collecting reviews.
        </p>
        <ul class="mt-4 space-y-3 list-none p-0 m-0">
          <li
            v-for="link in shareLinks"
            :key="link.id"
            class="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border border-gray-100 dark:border-gray-800 p-3"
          >
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium truncate">{{ link.label || 'Review link' }}</p>
              <p class="text-xs text-slate-400 truncate mt-0.5 font-mono">{{ shareReviewUrl(link.token) }}</p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <span
                class="text-xs font-medium px-2 py-0.5 rounded-sm"
                :class="link.active ? 'bg-emerald-600/10 text-emerald-600' : 'bg-slate-500/10 text-slate-500'"
              >
                {{ link.active ? 'Active' : 'Disabled' }}
              </span>
              <button
                type="button"
                class="btn bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md text-sm px-3 py-1.5"
                @click="copyShareLink(link.token)"
              >
                Copy link
              </button>
              <button
                type="button"
                class="btn border border-gray-200 dark:border-gray-700 rounded-md text-sm px-3 py-1.5"
                :title="link.active ? 'Disable link' : 'Enable link'"
                @click="toggleInvite(link)"
              >
                {{ link.active ? 'Disable' : 'Enable' }}
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div
        v-if="!configured"
        class="mt-6 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 p-4 text-sm text-amber-800 dark:text-amber-200"
      >
        Supabase is not configured. Add <code class="text-xs">VITE_SUPABASE_URL</code> and
        <code class="text-xs">VITE_SUPABASE_ANON_KEY</code> to <code class="text-xs">.env</code>, then run the SQL below.
        <pre class="mt-3 p-3 rounded bg-slate-900 text-slate-100 text-xs overflow-x-auto max-h-48"><code>{{ setupSql }}</code></pre>
      </div>

      <div
        v-else-if="loadError"
        class="mt-6 rounded-md border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40 p-4 text-sm text-red-700 dark:text-red-200"
      >
        {{ loadError }}
        <p class="text-xs mt-2 opacity-80">If the table is missing, run the SQL from the banner above in Supabase.</p>
      </div>

      <CardGridSkeleton v-else-if="loading" variant="testimonial" :count="6" />

      <div
        v-else-if="!items.length"
        class="mt-8 rounded-md border border-dashed border-gray-200 dark:border-gray-700 p-10 text-center text-slate-400"
      >
        <p>No testimonials yet. Add one to show it on the website.</p>
        <button
          type="button"
          class="btn bg-primary hover:bg-primary-dark text-white rounded-md mt-4"
          @click="openCreate"
        >
          Add testimonial
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-4 md:gap-6">
        <div
          v-for="item in items"
          :key="item.id"
          class="relative rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900 p-4 md:p-6 flex flex-col"
        >
          <div class="flex items-start gap-3">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.name"
              class="size-12 rounded-full object-cover shrink-0 border border-gray-100 dark:border-gray-800"
            />
            <div
              v-else
              class="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-400"
            >
              <i class="ri-user-line text-xl"></i>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1 text-amber-400">
                <i v-for="n in item.rating" :key="n" class="ri-star-fill text-sm" />
              </div>
              <p class="font-medium mt-1 truncate">{{ item.name }}</p>
              <p class="text-slate-400 text-sm truncate">{{ item.role || '—' }}</p>
            </div>
          </div>

          <p class="text-slate-500 dark:text-slate-300 mt-4 text-sm leading-relaxed flex-1 line-clamp-4">
            "{{ item.text }}"
          </p>

          <div class="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800 pt-4">
            <span
              class="text-xs font-medium px-2.5 py-0.5 rounded-sm"
              :class="statusClass(item)"
            >
              {{ statusLabel(item) }}
            </span>
            <div class="flex items-center gap-1">
              <button
                v-if="item.pending"
                type="button"
                class="text-xs font-medium px-2.5 py-1 rounded-md bg-primary text-white hover:bg-primary-dark"
                @click="onApprove(item)"
              >
                Approve
              </button>
              <button
                type="button"
                class="size-8 inline-flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Edit"
                @click="openEdit(item)"
              >
                <i class="ri-edit-line"></i>
              </button>
              <button
                type="button"
                class="size-8 inline-flex items-center justify-center rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                title="Delete"
                @click="onDelete(item)"
              >
                <i class="ri-delete-bin-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add / edit modal -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      @click.self="closeModal"
    >
      <div
        class="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="editingId ? 'edit-testimonial-title' : 'add-testimonial-title'"
      >
        <h6 :id="editingId ? 'edit-testimonial-title' : 'add-testimonial-title'" class="text-lg font-semibold">
          {{ editingId ? 'Edit testimonial' : 'Add testimonial' }}
        </h6>
        <p class="text-sm text-slate-400 mt-1">Published reviews appear on the home and about pages.</p>

        <form class="mt-6 space-y-4" @submit.prevent="onSave">
          <div class="flex items-center gap-4">
            <div class="size-16 rounded-full border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <img v-if="form.image" :src="form.image" alt="" class="size-full object-cover" />
              <i v-else class="ri-user-line text-2xl text-slate-400"></i>
            </div>
            <div class="min-w-0 flex-1">
              <input ref="photoInput" type="file" accept="image/*" class="hidden" @change="onPhotoChange" />
              <button
                type="button"
                class="btn bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md text-sm"
                :disabled="uploadingPhoto"
                @click="photoInput?.click()"
              >
                {{ uploadingPhoto ? 'Uploading…' : 'Upload photo' }}
              </button>
              <p class="text-xs text-slate-400 mt-2">Optional · JPG, PNG or WebP</p>
            </div>
          </div>

          <div>
            <label class="font-medium text-sm">Client name <span class="text-primary">*</span></label>
            <input v-model.trim="form.name" type="text" required class="form-input border border-gray-200! dark:border-gray-800! mt-1.5 w-full rounded-md" />
          </div>

          <div>
            <label class="font-medium text-sm">Role / title</label>
            <input
              v-model.trim="form.role"
              type="text"
              placeholder="e.g. UK Investor"
              class="form-input border border-gray-200! dark:border-gray-800! mt-1.5 w-full rounded-md"
            />
          </div>

          <div>
            <label class="font-medium text-sm">Review <span class="text-primary">*</span></label>
            <textarea
              v-model.trim="form.text"
              rows="4"
              required
              class="form-input border border-gray-200! dark:border-gray-800! mt-1.5 w-full rounded-md"
              placeholder="What the client said about Kardosh Realty…"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="font-medium text-sm">Rating</label>
              <select v-model.number="form.rating" class="form-select form-input border border-gray-200! dark:border-gray-800! mt-1.5 w-full rounded-md">
                <option v-for="n in 5" :key="n" :value="n">{{ n }} star{{ n > 1 ? 's' : '' }}</option>
              </select>
            </div>
            <div>
              <label class="font-medium text-sm">Sort order</label>
              <input
                v-model.number="form.sortOrder"
                type="number"
                min="0"
                class="form-input border border-gray-200! dark:border-gray-800! mt-1.5 w-full rounded-md"
              />
              <p class="text-xs text-slate-400 mt-1">Lower numbers appear first.</p>
            </div>
          </div>

          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input v-model="form.published" type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary/30" />
            <span class="text-sm font-medium">Published on website</span>
          </label>

          <div class="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              class="btn bg-primary hover:bg-primary-dark text-white rounded-md px-6"
              :disabled="saving"
            >
              {{ saving ? 'Saving…' : editingId ? 'Save changes' : 'Add testimonial' }}
            </button>
            <button type="button" class="btn border border-gray-200 dark:border-gray-700 rounded-md px-6" @click="closeModal">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import CardGridSkeleton from '@/components/skeleton/CardGridSkeleton.vue'
import { useToast } from '@/composables/useToast'
import { isSupabaseConfigured } from '@/lib/supabase'
import {
  fetchAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  uploadTestimonialPhoto,
  approveTestimonial,
} from '@/services/testimonials'
import {
  fetchInvites,
  createInvite,
  setInviteActive,
  shareReviewUrl,
} from '@/services/testimonialInvites'

const toast = useToast()
const configured = isSupabaseConfigured()

const items = ref([])
const shareLinks = ref([])
const loading = ref(true)
const loadError = ref('')
const creatingLink = ref(false)
const modalOpen = ref(false)
const editingId = ref(null)
const saving = ref(false)
const uploadingPhoto = ref(false)
const photoInput = ref(null)

const emptyForm = () => ({
  name: '',
  role: '',
  text: '',
  image: '',
  rating: 5,
  published: true,
  sortOrder: 0,
})

const form = ref(emptyForm())

const setupSql = `create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote_text text not null,
  image_url text,
  rating smallint not null default 5 check (rating >= 1 and rating <= 5),
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.testimonials enable row level security;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where email = (auth.jwt() ->> 'email'));
$$;
drop policy if exists testimonials_public_read on public.testimonials;
create policy testimonials_public_read on public.testimonials for select using (published = true);
drop policy if exists testimonials_admin_all on public.testimonials;
create policy testimonials_admin_all on public.testimonials for all to authenticated using (public.is_admin()) with check (public.is_admin());`

function statusLabel(item) {
  if (item.pending) return 'Pending approval'
  if (item.published) return 'Published'
  return 'Hidden'
}

function statusClass(item) {
  if (item.pending) return 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
  if (item.published) return 'bg-emerald-600/10 text-emerald-600'
  return 'bg-slate-500/10 text-slate-500'
}

async function loadInvites() {
  if (!configured) return
  try {
    shareLinks.value = await fetchInvites()
  } catch {
    shareLinks.value = []
  }
}

async function load() {
  if (!configured) {
    loading.value = false
    return
  }
  loading.value = true
  loadError.value = ''
  try {
    const [result] = await Promise.all([fetchAllTestimonials(), loadInvites()])
    items.value = result.items
  } catch (e) {
    loadError.value = e.message || 'Could not load testimonials'
  } finally {
    loading.value = false
  }
}

async function onCreateShareLink() {
  const label = window.prompt('Link label (optional)', 'Customer review')
  if (label === null) return
  creatingLink.value = true
  try {
    const invite = await createInvite({ label })
    await loadInvites()
    await copyShareLink(invite.token)
    toast.success('Share link created and copied.')
  } catch (e) {
    toast.error(e.message || 'Could not create link')
  } finally {
    creatingLink.value = false
  }
}

async function copyShareLink(token) {
  const url = shareReviewUrl(token)
  try {
    await navigator.clipboard.writeText(url)
    toast.success('Link copied to clipboard.')
  } catch {
    window.prompt('Copy this link:', url)
  }
}

async function toggleInvite(link) {
  try {
    await setInviteActive(link.id, !link.active)
    link.active = !link.active
    toast.success(link.active ? 'Link enabled.' : 'Link disabled.')
  } catch (e) {
    toast.error(e.message || 'Could not update link')
  }
}

async function onApprove(item) {
  try {
    await approveTestimonial(item.id)
    toast.success(`${item.name} is now published on the website.`)
    await load()
  } catch (e) {
    toast.error(e.message || 'Could not approve')
  }
}

function openCreate() {
  editingId.value = null
  form.value = emptyForm()
  modalOpen.value = true
}

function openEdit(item) {
  editingId.value = item.id
  form.value = {
    name: item.name,
    role: item.role,
    text: item.text,
    image: item.image,
    rating: item.rating,
    published: item.published,
    sortOrder: item.sortOrder,
  }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
  editingId.value = null
}

async function onPhotoChange(ev) {
  const file = ev.target?.files?.[0]
  if (!file) return
  uploadingPhoto.value = true
  try {
    form.value.image = await uploadTestimonialPhoto(file)
    toast.success('Photo uploaded.')
  } catch (e) {
    toast.error(e.message || 'Upload failed')
  } finally {
    uploadingPhoto.value = false
    if (photoInput.value) photoInput.value.value = ''
  }
}

async function onSave() {
  saving.value = true
  try {
    if (editingId.value) {
      await updateTestimonial(editingId.value, form.value)
      toast.success('Testimonial updated.')
    } else {
      await createTestimonial(form.value)
      toast.success('Testimonial added.')
    }
    closeModal()
    await load()
  } catch (e) {
    toast.error(e.message || 'Could not save')
  } finally {
    saving.value = false
  }
}

async function onDelete(item) {
  if (!confirm(`Delete testimonial from ${item.name}?`)) return
  try {
    await deleteTestimonial(item.id)
    toast.success('Testimonial deleted.')
    await load()
  } catch (e) {
    toast.error(e.message || 'Could not delete')
  }
}

onMounted(load)
</script>
