<script setup>
import { computed } from 'vue'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import { cn } from '@/lib/utils'

const model = defineModel({ type: String, default: '' })

const props = defineProps({
  id: { type: String, default: '' },
  placeholder: { type: String, default: 'Enter phone number' },
  defaultCountry: { type: String, default: 'AE' },
  disabled: { type: Boolean, default: false },
  invalid: { type: Boolean, default: false },
  inputClass: { type: String, default: '' },
})

const emit = defineEmits(['validate'])

const inputOptions = computed(() => ({
  id: props.id,
  placeholder: props.placeholder,
  autocomplete: 'tel',
  type: 'tel',
  styleClasses: cn('kardosh-phone-input__field', props.inputClass),
}))

function onValidate(payload) {
  emit('validate', payload)
}
</script>

<template>
  <VueTelInput
    v-model="model"
    mode="international"
    :default-country="defaultCountry"
    :auto-default-country="false"
    :disabled="disabled"
    :input-options="inputOptions"
    :dropdown-options="{ showFlags: true, showSearchBox: true }"
    :class="cn('kardosh-phone-input w-full', invalid && 'kardosh-phone-input--invalid')"
    @validate="onValidate"
  />
</template>
