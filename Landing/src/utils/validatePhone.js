import { isValidPhoneNumber } from 'libphonenumber-js'

/**
 * @param {string} value E.164 or international format from vue-tel-input
 * @param {{ required?: boolean }} [opts]
 */
export function validatePhone(value, opts = {}) {
  const trimmed = String(value ?? '').trim()
  if (!trimmed) {
    return opts.required
      ? { valid: false, message: 'Phone number is required' }
      : { valid: true, value: '' }
  }
  if (!isValidPhoneNumber(trimmed)) {
    return { valid: false, message: 'Invalid phone number' }
  }
  return { valid: true, value: trimmed }
}
