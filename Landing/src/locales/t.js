/** Resolve dot-path keys on locale message objects. */
export function t(messages, key, params = {}) {
  if (!key) return ''
  const val = String(key)
    .split('.')
    .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), messages)

  if (val === undefined || val === null) return key

  if (typeof val !== 'string') return val

  return Object.entries(params).reduce(
    (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)),
    val
  )
}
