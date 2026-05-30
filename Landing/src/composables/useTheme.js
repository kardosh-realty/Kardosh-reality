import { ref, readonly } from 'vue'

const STORAGE_KEY = 'kardosh-theme'

function applyTheme(dark) {
  const root = document.documentElement
  root.classList.toggle('dark', dark)
  root.classList.toggle('light', !dark)
}

export function initTheme() {
  if (typeof window === 'undefined') return
  const stored = localStorage.getItem(STORAGE_KEY)
  const dark = stored === 'dark'
  applyTheme(dark)
  isDark.value = dark
}

const isDark = ref(
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
)

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  }

  return {
    isDark: readonly(isDark),
    toggleTheme,
  }
}
