import { reactive } from 'vue'

/**
 * Lightweight toast store (Vue port of the stacked bottom-right toaster).
 * Toasts auto-dismiss after `duration` unless `preserve` is set, and pause
 * while the stack is hovered. Render once via <ToastContainer /> in App.vue.
 */
export const toasts = reactive([])

let nextId = 0
const timers = new Map() // id -> { handle, remaining, start }

const DEFAULT_DURATION = 4000

function scheduleClose(id, duration) {
  const state = { remaining: duration, start: Date.now(), handle: null }
  state.handle = setTimeout(() => remove(id), duration)
  timers.set(id, state)
}

export function remove(id) {
  const i = toasts.findIndex((t) => t.id === id)
  if (i !== -1) toasts.splice(i, 1)
  const state = timers.get(id)
  if (state?.handle) clearTimeout(state.handle)
  timers.delete(id)
}

export function pauseAll() {
  for (const [, state] of timers) {
    if (!state.handle) continue
    clearTimeout(state.handle)
    state.remaining -= Date.now() - state.start
    state.handle = null
  }
}

export function resumeAll() {
  for (const [id, state] of timers) {
    if (state.handle) continue
    state.start = Date.now()
    state.handle = setTimeout(() => remove(id), Math.max(0, state.remaining))
  }
}

function add(text, type = 'message', opts = {}) {
  const id = nextId++
  toasts.push({
    id,
    text,
    type,
    action: opts.action || null,
    onAction: opts.onAction || null,
    onUndo: opts.onUndo || null,
    preserve: Boolean(opts.preserve),
  })
  if (!opts.preserve) scheduleClose(id, opts.duration ?? DEFAULT_DURATION)
  return id
}

export function useToast() {
  return {
    message: (text, opts) => add(text, 'message', opts),
    success: (text, opts) => add(text, 'success', opts),
    warning: (text, opts) => add(text, 'warning', opts),
    error: (text, opts) => add(text, 'error', opts),
    remove,
  }
}
