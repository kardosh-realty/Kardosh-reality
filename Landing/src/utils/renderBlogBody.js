import DOMPurify from 'dompurify'

const ALLOWED_TAGS = [
  'h2',
  'h3',
  'h4',
  'p',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'ul',
  'ol',
  'li',
  'a',
  'img',
  'blockquote',
  'br',
  'hr',
  'span',
]

const ALLOWED_ATTR = ['href', 'target', 'rel', 'src', 'alt', 'title', 'class']

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Sanitize admin-authored HTML for public blog pages. */
export function sanitizeBlogHtml(html) {
  return DOMPurify.sanitize(html || '', {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  })
}

/**
 * Render stored body: HTML from the rich editor, or legacy plain text as paragraphs.
 */
export function formatBlogBodyForDisplay(body) {
  const raw = String(body || '').trim()
  if (!raw) return ''

  if (!/<[a-z][\s\S]*>/i.test(raw)) {
    return raw
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join('')
  }

  return sanitizeBlogHtml(raw)
}
