<template>
  <div class="toast-viewport fixed bottom-4 end-4 z-[9999] w-[min(420px,calc(100vw-2rem))] pointer-events-none">
    <div
      class="relative w-full pointer-events-auto"
      :style="{ height: containerHeight + 'px' }"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      <TransitionGroup name="toast">
        <div
          v-for="(toast, index) in toasts"
          :key="toast.id"
          class="toast-item absolute end-0 bottom-0 w-full rounded-xl p-4 shadow-lg border text-sm leading-relaxed"
          :class="typeClass(toast.type)"
          :style="itemStyle(index)"
        >
          <div class="flex items-center justify-between gap-4">
            <span class="flex items-start gap-2 min-w-0">
              <i :class="['mt-0.5 shrink-0', iconClass(toast.type)]"></i>
              <span class="break-words">{{ toast.text }}</span>
            </span>

            <div v-if="!toast.action" class="flex items-center gap-1 shrink-0">
              <button
                v-if="toast.onUndo"
                type="button"
                class="toast-btn"
                aria-label="Undo"
                @click="undo(toast)"
              >
                <i class="ri-arrow-go-back-line"></i>
              </button>
              <button
                type="button"
                class="toast-btn"
                aria-label="Dismiss"
                @click="remove(toast.id)"
              >
                <i class="ri-close-line"></i>
              </button>
            </div>
          </div>

          <div v-if="toast.action" class="flex items-center justify-end gap-2 mt-3">
            <button type="button" class="toast-action toast-action--ghost" @click="remove(toast.id)">Dismiss</button>
            <button type="button" class="toast-action toast-action--primary" @click="runAction(toast)">
              {{ toast.action }}
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { toasts, remove, pauseAll, resumeAll } from '@/composables/useToast'

const hovered = ref(false)

const ROW = 64 // estimated single toast height
const GAP = 12
const COLLAPSED_PEEK = 16
const MAX_VISIBLE = 3

const containerHeight = computed(() => {
  const n = Math.min(toasts.length, MAX_VISIBLE)
  if (n === 0) return 0
  return hovered.value ? toasts.length * (ROW + GAP) : ROW + (n - 1) * COLLAPSED_PEEK
})

function onEnter() {
  hovered.value = true
  pauseAll()
}

function onLeave() {
  hovered.value = false
  resumeAll()
}

// index 0 = oldest (top/back); last = newest (front/bottom)
function itemStyle(index) {
  const offsetFromEnd = toasts.length - 1 - index
  if (hovered.value) {
    const y = offsetFromEnd * (ROW + GAP)
    return {
      transform: `translate3d(0, -${y}px, 0) scale(1)`,
      zIndex: 1000 - offsetFromEnd,
      opacity: 1,
    }
  }
  const y = offsetFromEnd * COLLAPSED_PEEK
  const scale = 1 - 0.05 * offsetFromEnd
  return {
    transform: `translate3d(0, -${y}px, 0) scale(${scale})`,
    zIndex: 1000 - offsetFromEnd,
    opacity: offsetFromEnd >= MAX_VISIBLE ? 0 : 1,
  }
}

function typeClass(type) {
  return {
    message: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-gray-200 dark:border-slate-700',
    success: 'bg-primary text-white border-primary-dark',
    warning: 'bg-amber-500 text-white border-amber-600',
    error: 'bg-red text-white border-red',
  }[type]
}

function iconClass(type) {
  return {
    message: 'ri-information-line text-slate-400',
    success: 'ri-checkbox-circle-line',
    warning: 'ri-error-warning-line',
    error: 'ri-close-circle-line',
  }[type]
}

function undo(toast) {
  toast.onUndo?.()
  remove(toast.id)
}

function runAction(toast) {
  toast.onAction?.()
  remove(toast.id)
}
</script>

<style scoped>
.toast-item {
  transition: transform 0.35s cubic-bezier(0.25, 0.75, 0.6, 0.98), opacity 0.3s ease;
  will-change: transform, opacity;
}

.toast-enter-from {
  opacity: 0;
  transform: translate3d(0, 100%, 0) scale(0.98);
}
.toast-leave-to {
  opacity: 0;
  transform: translate3d(120%, 0, 0) scale(0.98);
}
.toast-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.toast-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.5rem;
  opacity: 0.8;
  transition: background-color 0.15s ease, opacity 0.15s ease;
}
.toast-btn:hover {
  opacity: 1;
  background-color: rgb(0 0 0 / 0.12);
}

.toast-action {
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.8125rem;
  transition: background-color 0.15s ease;
}
.toast-action--ghost:hover {
  background-color: rgb(0 0 0 / 0.12);
}
.toast-action--primary {
  background-color: rgb(255 255 255 / 0.2);
}
.toast-action--primary:hover {
  background-color: rgb(255 255 255 / 0.32);
}

@media (prefers-reduced-motion: reduce) {
  .toast-item,
  .toast-leave-active {
    transition: none;
  }
}
</style>
