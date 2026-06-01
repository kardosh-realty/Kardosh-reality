<template>
  <div v-if="offices.length" class="developer-offices">
    <h3 class="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-5">
      Offices
    </h3>
    <div class="grid md:grid-cols-2 gap-5">
      <article
        v-for="office in offices"
        :key="office.id"
        class="developer-offices__card rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 md:p-6"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p
              v-if="office.isMain"
              class="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1"
            >
              Main office
            </p>
            <h4 class="font-semibold text-slate-900 dark:text-white">
              {{ office.name || office.address || 'Office' }}
            </h4>
            <p
              v-if="officeLocation(office)"
              class="text-sm text-slate-500 dark:text-slate-400 mt-1"
            >
              {{ officeLocation(office) }}
            </p>
          </div>
        </div>

        <p
          v-if="office.address && office.name"
          class="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed"
        >
          {{ office.address }}
        </p>
        <a
          v-else-if="office.address && !office.name"
          :href="mapsLink(office)"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-primary mt-3 inline-block hover:underline"
        >
          {{ office.address }}
        </a>

        <a
          v-if="office.email"
          :href="`mailto:${office.email}`"
          class="text-sm text-primary mt-2 inline-block hover:underline"
        >
          {{ office.email }}
        </a>

        <ul
          v-if="office.workingHours?.length"
          class="mt-4 space-y-1.5 list-none p-0 text-sm text-slate-500 dark:text-slate-400"
        >
          <li
            v-for="(wh, i) in office.workingHours"
            :key="i"
            class="flex justify-between gap-4"
          >
            <span>{{ wh.days }}</span>
            <span class="text-slate-700 dark:text-slate-300 shrink-0">{{ wh.timeRange }}</span>
          </li>
        </ul>

      </article>
    </div>
  </div>
</template>

<script setup>
defineProps({
  offices: { type: Array, default: () => [] },
})

function officeLocation(office) {
  return [office.city, office.region, office.country].filter(Boolean).join(', ')
}

function mapsLink(office) {
  const q = encodeURIComponent(office.address || '')
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}
</script>
