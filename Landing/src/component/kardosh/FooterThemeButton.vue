<template>
  <button
    type="button"
    class="footer-pref-btn"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <Sun v-if="isDark" class="size-4 shrink-0" aria-hidden="true" />
    <Moon v-else class="size-4 shrink-0" aria-hidden="true" />
    <span>{{ isDark ? 'Light mode' : 'Dark mode' }}</span>
  </button>
</template>

<script setup>
import { Moon, Sun } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>
