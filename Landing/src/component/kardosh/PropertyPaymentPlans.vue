<template>
  <div class="property-payment-plans space-y-3">
    <article
      v-for="(plan, pi) in plans"
      :key="planKey(plan, pi)"
      class="property-payment-plans__card rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden"
    >
      <button
        type="button"
        class="property-payment-plans__trigger w-full flex items-start justify-between gap-4 p-5 md:p-6 text-start hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        :aria-expanded="isOpen(plan, pi)"
        :aria-controls="`payment-plan-panel-${planKey(plan, pi)}`"
        @click="toggle(plan, pi)"
      >
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <h5 class="text-lg font-semibold text-slate-900 dark:text-white">
              {{ plan.name }}
            </h5>

            <div
              v-if="plan.showSplitRatio"
              class="flex items-center gap-2 shrink-0"
              :title="plan.hasPostHandover ? 'Before handover / Post-handover' : 'Before handover / On handover'"
            >
              <span
                class="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-semibold tabular-nums"
              >
                {{ plan.splitBefore }}%
              </span>
              <span class="text-slate-400 text-sm font-medium">/</span>
              <span
                class="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-semibold tabular-nums"
              >
                {{ plan.splitAfter }}%
              </span>
            </div>
            <span
              v-else-if="plan.steps.length === 1 && plan.steps[0].percentage >= 99"
              class="inline-flex px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-semibold shrink-0"
            >
              100% on booking
            </span>
          </div>

          <p
            v-if="plan.description && !isOpen(plan, pi)"
            class="text-sm text-slate-500 mt-1 line-clamp-2"
          >
            {{ plan.description }}
          </p>

          <ul
            v-if="planMeta(plan).length && !isOpen(plan, pi)"
            class="flex flex-wrap gap-2 mt-3 list-none p-0 m-0"
          >
            <li
              v-for="(item, i) in planMeta(plan)"
              :key="i"
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300"
            >
              <component :is="item.icon" class="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
              <span>{{ item.label }}</span>
            </li>
          </ul>
        </div>

        <ChevronDown
          class="property-payment-plans__chevron size-5 text-primary shrink-0 mt-1 transition-transform duration-300"
          :class="isOpen(plan, pi) ? 'rotate-180' : ''"
          aria-hidden="true"
        />
      </button>

      <div
        v-show="isOpen(plan, pi)"
        :id="`payment-plan-panel-${planKey(plan, pi)}`"
        class="property-payment-plans__panel border-t border-slate-100 dark:border-slate-800"
      >
        <div v-if="plan.description" class="px-5 md:px-6 pt-4 pb-0">
          <p class="text-sm text-slate-500 whitespace-pre-line">{{ plan.description }}</p>
        </div>

        <ul
          v-if="planMeta(plan).length"
          class="flex flex-wrap gap-2 px-5 md:px-6 pt-4 list-none p-0 m-0"
          :class="plan.description ? 'pb-0' : 'pb-4'"
        >
          <li
            v-for="(item, i) in planMeta(plan)"
            :key="i"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300"
          >
            <component :is="item.icon" class="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
            <span>{{ item.label }}</span>
          </li>
        </ul>

        <div v-if="plan.steps.length" class="overflow-x-auto">
          <table class="property-payment-plans__table w-full text-sm text-start">
            <thead>
              <tr class="border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40">
                <th class="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300">Stage</th>
                <th class="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300 w-24">Share</th>
                <th class="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300 hidden sm:table-cell">Timing</th>
                <th class="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300 hidden md:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(row, ri) in flatSteps(plan.steps)" :key="row.id ?? ri">
                <tr class="border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <td class="px-5 py-3.5">
                    <span class="font-medium text-slate-900 dark:text-white">{{ row.name }}</span>
                    <span
                      v-if="row.stageType"
                      class="block text-xs text-slate-400 mt-0.5 capitalize"
                    >{{ row.stageLabel }}</span>
                  </td>
                  <td class="px-5 py-3.5 font-semibold text-primary tabular-nums">
                    {{ row.percentage != null ? `${row.percentage}%` : '—' }}
                  </td>
                  <td class="px-5 py-3.5 text-slate-500 hidden sm:table-cell">
                    {{ timingLabel(row) }}
                  </td>
                  <td class="px-5 py-3.5 text-slate-500 hidden md:table-cell max-w-xs">
                    <span class="line-clamp-2">{{ row.notes || '—' }}</span>
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot v-if="plan.totalPercentage">
              <tr class="bg-slate-50/50 dark:bg-slate-800/30">
                <td class="px-5 py-3 font-semibold text-slate-700 dark:text-slate-200">Total</td>
                <td class="px-5 py-3 font-semibold text-slate-900 dark:text-white tabular-nums">{{ plan.totalPercentage }}%</td>
                <td colspan="2" class="hidden sm:table-cell" />
              </tr>
            </tfoot>
          </table>
        </div>

        <p v-else class="px-5 py-4 text-sm text-slate-400">No payment stages listed for this plan.</p>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Calendar, ChevronDown, Clock, Coins, HandCoins } from 'lucide-vue-next'
import { formatAed } from '@/config/uae'

const props = defineProps({
  plans: { type: Array, default: () => [] },
})

const expandedKeys = ref(new Set())

function planKey(plan, index) {
  return String(plan.id ?? `plan-${index}`)
}

function defaultExpandedKeys(plans) {
  if (!plans?.length) return new Set()
  return new Set([planKey(plans[0], 0)])
}

expandedKeys.value = defaultExpandedKeys(props.plans)

watch(
  () => props.plans,
  (plans) => {
    expandedKeys.value = defaultExpandedKeys(plans)
  }
)

function isOpen(plan, index) {
  return expandedKeys.value.has(planKey(plan, index))
}

function toggle(plan, index) {
  const key = planKey(plan, index)
  const next = new Set(expandedKeys.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  expandedKeys.value = next
}

function planMeta(plan) {
  const items = []
  if (plan.eoi) {
    items.push({ icon: HandCoins, label: `EOI from ${formatAed(plan.eoi)}` })
  }
  if (plan.durationMonths > 0) {
    items.push({ icon: Clock, label: `${plan.durationMonths} month plan` })
  }
  if (plan.monthsAfterHandover > 0) {
    items.push({
      icon: Calendar,
      label: `${plan.monthsAfterHandover} months post-handover`,
    })
  }
  if (plan.onHandover > 0 && plan.postHandover > 0) {
    items.push({
      icon: Coins,
      label: `${Math.round(plan.onHandover)}% at handover · ${Math.round(plan.postHandover)}% after`,
    })
  }
  return items
}

function flatSteps(steps) {
  const rows = []
  for (const s of steps) {
    rows.push(s)
    if (s.children?.length) {
      rows.push(...flatSteps(s.children))
    }
  }
  return rows
}

function timingLabel(row) {
  if (row.start && row.end) return `${row.start} – ${row.end}`
  if (row.start) return `From ${row.start}`
  if (row.end) return `Until ${row.end}`
  return row.stageLabel || '—'
}
</script>
