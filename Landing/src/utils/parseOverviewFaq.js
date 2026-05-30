/**
 * Turn Reelly-style overview text (##### Section titles) into FAQ accordion items.
 */
export function parseOverviewToFaq(text) {
  if (!text?.trim()) return []

  const normalized = text.replace(/\r\n/g, '\n').trim()

  if (!/#{2,6}\s/.test(normalized)) {
    return [{ id: 'overview', title: 'About this property', content: normalized }]
  }

  const parts = normalized
    .split(/#{5}\s+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return parts
    .map((part, index) => {
      const lines = part.split('\n')
      const title = (lines[0] || '').trim() || `Details ${index + 1}`
      const content = lines
        .slice(1)
        .join('\n')
        .replace(/^\s*\n+/, '')
        .trim()

      return {
        id: title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') || `section-${index}`,
        title,
        content,
      }
    })
    .filter((item) => item.content.length > 0)
}
