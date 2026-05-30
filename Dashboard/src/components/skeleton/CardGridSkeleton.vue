<template>
  <div
    class="grid gap-6 mt-6"
    :class="gridClass"
    aria-busy="true"
    aria-label="Loading cards"
  >
    <article
      v-for="i in count"
      :key="i"
      class="rounded-md shadow-sm bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col"
    >
      <SkeletonBlock
        v-if="hasMedia"
        :height="mediaHeight"
        width="100%"
        rounded="none"
        class="block w-full"
      />
      <div class="p-5 flex flex-col flex-1 gap-3">
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1 space-y-2 min-w-0">
            <template v-if="variant === 'compact'">
              <div class="flex items-center justify-between">
                <SkeletonBlock width="2.5rem" height="2.5rem" rounded="md" />
                <SkeletonBlock width="3rem" height="1.25rem" rounded="sm" />
              </div>
              <SkeletonBlock width="70%" height="1.125rem" class="mt-3" />
              <SkeletonBlock width="45%" height="0.75rem" />
              <SkeletonBlock width="100%" height="2.25rem" rounded="md" class="mt-4" />
            </template>
            <template v-else-if="variant === 'testimonial'">
              <div class="flex items-center gap-3">
                <SkeletonBlock width="3rem" height="3rem" rounded="full" class="shrink-0" />
                <div class="flex-1 space-y-2">
                  <SkeletonBlock width="55%" height="1rem" />
                  <SkeletonBlock width="40%" height="0.75rem" />
                </div>
              </div>
            </template>
            <template v-else>
              <SkeletonBlock width="75%" height="1rem" />
              <SkeletonBlock width="50%" height="0.75rem" />
            </template>
          </div>
          <SkeletonBlock width="3.5rem" height="1.25rem" rounded="sm" class="shrink-0" />
        </div>
        <template v-if="variant !== 'compact'">
          <SkeletonBlock width="100%" height="0.75rem" />
          <SkeletonBlock width="88%" height="0.75rem" />
          <div class="mt-auto pt-3 flex justify-end gap-2">
            <SkeletonBlock width="2rem" height="2rem" rounded="md" />
            <SkeletonBlock width="2rem" height="2rem" rounded="md" />
          </div>
        </template>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SkeletonBlock from '@/components/ui/SkeletonBlock.vue'

const props = defineProps({
  count: { type: Number, default: 6 },
  variant: {
    type: String,
    default: 'blog',
    validator: (v) => ['blog', 'team', 'project', 'testimonial', 'compact'].includes(v),
  },
  gridClass: { type: String, default: '' },
})

const hasMedia = computed(() => !['testimonial', 'compact'].includes(props.variant))

const mediaHeight = computed(() => {
  if (props.variant === 'team') return '12rem'
  if (props.variant === 'project') return '10.5rem'
  return '9.5rem'
})

const gridClass = computed(() => {
  if (props.gridClass) return props.gridClass
  if (props.variant === 'compact') {
    return 'xl:grid-cols-4 md:grid-cols-2 grid-cols-1'
  }
  if (props.variant === 'testimonial') {
    return 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1'
  }
  if (props.variant === 'team') {
    return 'lg:grid-cols-2 xl:grid-cols-3 grid-cols-1'
  }
  if (props.variant === 'project') {
    return 'xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'
  }
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
})
</script>
