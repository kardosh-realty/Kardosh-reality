<template>
  <div class="overflow-x-auto" aria-busy="true" aria-label="Loading table">
    <table class="w-full text-start">
      <thead v-if="showHeader" class="border-b border-gray-100 dark:border-gray-800">
        <tr>
          <th v-for="c in columns" :key="c" class="p-4">
            <SkeletonBlock width="4.5rem" height="0.875rem" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="r in rows"
          :key="r"
          class="border-b border-gray-50 dark:border-gray-800/80"
        >
          <td v-for="c in columns" :key="`${r}-${c}`" class="p-4">
            <SkeletonBlock
              :width="cellWidths[(r + c) % cellWidths.length]"
              :height="c === 1 ? '2.25rem' : '0.875rem'"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import SkeletonBlock from '@/components/ui/SkeletonBlock.vue'

defineProps({
  rows: { type: Number, default: 6 },
  columns: { type: Number, default: 5 },
  showHeader: { type: Boolean, default: true },
})

const cellWidths = ['70%', '55%', '80%', '45%', '60%', '50%']
</script>
