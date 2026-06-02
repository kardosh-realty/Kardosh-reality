<template>
  <div class="status-btn relative inline-flex">
    <button
      :type="type"
      class="status-btn__control"
      :class="{ 'status-btn__control--busy': status !== 'idle' }"
      :disabled="disabled || status !== 'idle'"
      :aria-busy="status === 'loading'"
    >
      <span class="status-btn__label" aria-live="polite">
        <span
          v-for="(char, index) in labelChars"
          :key="`${status}-${index}`"
          class="status-btn__char"
          :style="{ '--char-delay': `${index * 24}ms` }"
        >{{ char === ' ' ? '\u00a0' : char }}</span>
      </span>
    </button>

    <Transition name="status-btn-badge">
      <div
        v-if="status !== 'idle'"
        class="status-btn__badge"
        :class="status === 'success' ? 'status-btn__badge--success' : 'status-btn__badge--loading'"
        aria-hidden="true"
      >
        <Transition name="status-btn-icon" mode="out-in">
          <span v-if="status === 'loading'" key="loading" class="status-btn__spinner">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                opacity=".45"
              />
              <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                <animateTransform
                  attributeName="transform"
                  dur="0.9s"
                  from="0 12 12"
                  repeatCount="indefinite"
                  to="360 12 12"
                  type="rotate"
                />
              </path>
            </svg>
          </span>
          <Check v-else key="success" class="size-4" />
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'

const props = defineProps({
  status: {
    type: String,
    default: 'idle',
    validator: (v) => ['idle', 'loading', 'success'].includes(v),
  },
  labels: {
    type: Object,
    default: () => ({
      idle: 'Send message',
      loading: 'Sending',
      success: 'Sent',
    }),
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const labelText = computed(() => props.labels[props.status] ?? props.labels.idle)
const labelChars = computed(() => labelText.value.split(''))
</script>
