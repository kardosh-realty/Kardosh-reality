/** Merge class names (shadcn-style `cn` helper for Vue). */
export function cn(...inputs) {
  return inputs
    .flatMap((item) => {
      if (!item) return []
      if (typeof item === 'string') return item.split(/\s+/)
      if (typeof item === 'object') {
        return Object.entries(item)
          .filter(([, v]) => v)
          .map(([k]) => k)
      }
      return []
    })
    .filter(Boolean)
    .join(' ')
}
