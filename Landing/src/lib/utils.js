/**
 * Merge class names (shadcn-style `cn` helper for Vue).
 * @param  {...(string | Record<string, boolean> | undefined | null | false)} inputs
 */
export function cn(...inputs) {
  const out = []
  for (const input of inputs) {
    if (!input) continue
    if (typeof input === 'string') out.push(input)
    else if (typeof input === 'object') {
      for (const [key, val] of Object.entries(input)) {
        if (val) out.push(key)
      }
    }
  }
  return out.join(' ')
}
