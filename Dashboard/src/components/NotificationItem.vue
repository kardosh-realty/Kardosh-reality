<template>
  <component
    :is="asLink ? RouterLink : 'div'"
    :to="asLink ? item.href : undefined"
    class="flex items-start gap-4 p-5 border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors"
    :class="[
      !item.read ? 'bg-primary/5' : '',
      asLink ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer' : '',
    ]"
    @click="onClick"
  >
    <span
      class="size-10 min-w-10 flex items-center justify-center rounded-md bg-primary/10 text-primary"
    >
      <i :class="`${item.icon} text-xl`" />
    </span>
    <div class="flex-1 min-w-0">
      <p class="font-medium">{{ item.title }}</p>
      <p class="text-slate-400 text-sm mt-0.5 line-clamp-2">{{ item.detail }}</p>
    </div>
    <span class="text-slate-400 text-xs whitespace-nowrap shrink-0">{{ timeLabel }}</span>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { formatRelativeTime } from '@/services/notifications'

const props = defineProps({
  item: { type: Object, required: true },
  asLink: { type: Boolean, default: true },
})

const emit = defineEmits(['activate'])

const timeLabel = computed(() => formatRelativeTime(props.item.createdAt))

function onClick() {
  emit('activate', props.item)
}
</script>
