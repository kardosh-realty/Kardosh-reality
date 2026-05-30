<template>
  <ul
    class="dash-lead-cards list-none p-0 m-0"
    :class="compact ? 'space-y-2 p-3' : 'divide-y divide-gray-100 dark:divide-gray-800'"
  >
    <li v-if="!leads.length" class="p-6 text-center text-sm text-slate-400">
      {{ emptyText }}
    </li>
    <li
      v-for="lead in leads"
      :key="lead.id"
      :class="[
        compact
          ? 'rounded-lg border border-gray-100 dark:border-gray-800 bg-slate-50/50 dark:bg-slate-800/30 p-3'
          : 'p-4',
        interactive ? 'cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 active:bg-slate-100' : '',
        selectedId === lead.id ? 'bg-primary/5' : '',
      ]"
      @click="interactive && $emit('select', lead)"
    >
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0 flex-1">
          <p class="font-semibold text-[15px] truncate">{{ lead.name }}</p>
          <p v-if="compact" class="text-xs text-slate-400 mt-0.5">
            {{ lead.date }}
            <span v-if="lead.interest"> · {{ lead.interest }}</span>
          </p>
          <template v-else>
            <p v-if="lead.email" class="text-xs text-slate-500 truncate mt-0.5">{{ lead.email }}</p>
            <p v-if="lead.phone" class="text-xs text-slate-500 truncate">{{ lead.phone }}</p>
          </template>
        </div>
        <span
          v-if="statusText(lead)"
          class="inline-flex shrink-0 text-xs font-medium px-2 py-0.5 rounded-sm border"
          :class="statusClass(lead)"
        >
          {{ statusText(lead) }}
        </span>
      </div>

      <p v-if="compact && lead.project" class="text-sm font-medium mt-2 truncate">
        {{ lead.project }}
      </p>

      <template v-else>
        <div class="mt-2 text-sm" @click.stop>
          <template v-if="lead.project_name || lead.project_id">
            <RouterLink
              v-if="lead.project_id"
              :to="`/off-plan/projects/${lead.project_id}`"
              class="inline-flex items-center gap-1 font-medium text-primary hover:underline truncate max-w-full"
            >
              <i class="ri-building-line shrink-0"></i>
              <span class="truncate">{{ lead.project_name || `#${lead.project_id}` }}</span>
            </RouterLink>
            <span v-else class="font-medium text-slate-600 dark:text-slate-300 truncate block">
              {{ lead.project_name }}
            </span>
            <span v-if="lead.source && sourceLabel" class="block text-[11px] text-slate-400 mt-0.5">
              {{ sourceLabel(lead.source) }}
            </span>
          </template>
          <span v-else class="text-slate-400">General inquiry</span>
        </div>

        <p v-if="lead.message" class="text-xs text-slate-500 mt-2 line-clamp-2">
          {{ lead.message }}
        </p>

        <p class="text-[11px] text-slate-400 mt-2">
          {{ formatDate(lead.created_at) }}
        </p>
      </template>
    </li>
  </ul>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { LEAD_STATUS_STYLES } from '@/config/leads'
import { leadStatusLabel } from '@/utils/leadFilters'

defineProps({
  leads: { type: Array, default: () => [] },
  selectedId: { type: [String, Number], default: null },
  compact: { type: Boolean, default: false },
  interactive: { type: Boolean, default: true },
  emptyText: { type: String, default: 'No inquiries to show.' },
  sourceLabel: { type: Function, default: null },
  formatDate: {
    type: Function,
    default: (iso) => {
      if (!iso) return '—'
      return new Intl.DateTimeFormat('en-AE', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(iso))
    },
  },
})

defineEmits(['select'])

function statusText(lead) {
  if (lead.status != null) return leadStatusLabel(lead.status)
  return lead.statusLabel || lead.status || ''
}

function statusClass(lead) {
  if (lead.statusClass) return lead.statusClass
  return LEAD_STATUS_STYLES[lead.status] || LEAD_STATUS_STYLES.new
}
</script>
