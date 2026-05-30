<template>
  <div class="container-fluid relative px-3 dash-page">
    <div class="layout-specing">
      <div class="md:flex justify-between items-center gap-4">
        <PageHeader title="Team" crumb="Our Team section on the About page" />
        <button
          type="button"
          class="btn bg-primary hover:bg-primary-dark text-white rounded-md inline-flex items-center gap-2 mt-3 md:mt-0 shrink-0"
          :disabled="!configured"
          @click="openCreate"
        >
          <i class="ri-add-line" /> Add team member
        </button>
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
      </div>

      <CardGridSkeleton v-else-if="loading" variant="team" :count="6" />

      <div
        v-else-if="!items.length"
        class="mt-8 rounded-md border border-dashed border-gray-200 dark:border-gray-700 p-10 text-center text-slate-400"
      >
        <p>No team members yet. Add members to show them on the About page.</p>
        <button type="button" class="btn bg-primary hover:bg-primary-dark text-white rounded-md mt-4" @click="openCreate">
          Add team member
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mt-6">
        <article
          v-for="item in items"
          :key="item.id"
          class="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900 overflow-hidden flex flex-col"
        >
          <div class="aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover object-top"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
              <i class="ri-user-line text-4xl"></i>
            </div>
          </div>
          <div class="p-5 flex flex-col flex-1">
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <h6 class="font-semibold truncate">{{ item.name }}</h6>
                <p class="text-sm text-slate-400 truncate">{{ item.designation || '—' }}</p>
              </div>
              <span
                class="text-xs font-medium px-2 py-0.5 rounded-sm shrink-0"
                :class="item.published ? 'bg-emerald-600/10 text-emerald-600' : 'bg-slate-500/10 text-slate-500'"
              >
                {{ item.published ? 'Published' : 'Hidden' }}
              </span>
            </div>
            <ul v-if="item.links?.length" class="mt-3 space-y-1 text-xs text-slate-500 list-none p-0 m-0">
              <li v-for="link in item.links" :key="link.platform + link.url">
                <i class="ri-link me-1 text-primary"></i>
                {{ linkLabel(link.platform) }}
              </li>
            </ul>
            <p v-else class="mt-3 text-xs text-slate-400">No social links</p>
            <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-1">
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
        </article>
      </div>
    </div>

    <div
      v-if="modalOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      @click.self="closeModal"
    >
      <div
        class="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-gray-800 p-4 md:p-6"
        role="dialog"
        aria-modal="true"
      >
        <div class="flex items-start justify-between gap-3 mb-2">
          <div>
            <h6 class="text-lg font-semibold">{{ editingItem ? 'Edit team member' : 'Add team member' }}</h6>
            <p class="text-sm text-slate-400">Shown in the Our Team carousel on the About page.</p>
          </div>
          <button
            type="button"
            class="size-8 inline-flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0"
            aria-label="Close"
            @click="closeModal"
          >
            <i class="ri-close-line text-lg"></i>
          </button>
        </div>
        <TeamMemberForm :initial="editingItem" :saving="saving" @save="onSave" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import CardGridSkeleton from '@/components/skeleton/CardGridSkeleton.vue'
import TeamMemberForm from '@/components/TeamMemberForm.vue'
import { TEAM_PLATFORM_OPTIONS } from '@/config/teamPlatforms'
import { useToast } from '@/composables/useToast'
import { isSupabaseConfigured } from '@/lib/supabase'
import {
  fetchAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '@/services/team'

const toast = useToast()
const configured = isSupabaseConfigured()

const items = ref([])
const loading = ref(true)
const loadError = ref('')
const modalOpen = ref(false)
const editingItem = ref(null)
const saving = ref(false)

const platformLabels = Object.fromEntries(TEAM_PLATFORM_OPTIONS.map((o) => [o.value, o.label]))

function linkLabel(platform) {
  return platformLabels[platform] || platform
}

const setupSql = `create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text,
  image_url text,
  links jsonb default '[]'::jsonb,
  linkedin text,
  instagram text,
  email text,
  phone text,
  whatsapp text,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.team_members enable row level security;
drop policy if exists team_members_public_read on public.team_members;
create policy team_members_public_read on public.team_members for select using (published = true);
drop policy if exists team_members_admin_all on public.team_members;
create policy team_members_admin_all on public.team_members for all to authenticated using (public.is_admin()) with check (public.is_admin());`

async function load() {
  if (!configured) {
    loading.value = false
    return
  }
  loading.value = true
  loadError.value = ''
  try {
    const result = await fetchAllTeamMembers()
    items.value = result.items
  } catch (e) {
    loadError.value = e.message || 'Could not load team'
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingItem.value = null
  modalOpen.value = true
}

function openEdit(item) {
  editingItem.value = item
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
  editingItem.value = null
}

async function onSave(payload) {
  saving.value = true
  try {
    if (payload.id) {
      await updateTeamMember(payload.id, payload)
      toast.success('Team member updated.')
    } else {
      await createTeamMember(payload)
      toast.success('Team member added.')
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
  if (!confirm(`Remove ${item.name} from the team?`)) return
  try {
    await deleteTeamMember(item.id)
    toast.success('Team member removed.')
    await load()
  } catch (e) {
    toast.error(e.message || 'Could not delete')
  }
}

onMounted(load)
</script>
