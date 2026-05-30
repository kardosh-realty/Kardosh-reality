import { BRAND } from '@/config/brand'

const WHATSAPP_PHONE =
  import.meta.env.VITE_WHATSAPP_PHONE || import.meta.env.VITE_CONTACT_PHONE || '97141234567'

function waDigits(phone) {
  return String(phone || WHATSAPP_PHONE).replace(/\D/g, '')
}

export function buildLeadMailto(lead) {
  const project = lead.project_name || 'a property'
  const subject = `Re: Your inquiry — ${project}`
  const lines = [
    `Hello ${lead.name || 'there'},`,
    '',
    `Thank you for contacting ${BRAND.name} regarding ${project}.`,
    '',
    '—',
    BRAND.name,
  ]
  if (lead.message) {
    lines.splice(3, 0, '', 'Your message:', lead.message)
  }
  const body = lines.join('\n')
  const to = lead.email || ''
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function buildLeadWhatsApp(lead) {
  const project = lead.project_name || 'a Dubai property'
  const text = [
    `Hello ${lead.name || ''},`.trim(),
    '',
    `Thank you for your inquiry about ${project} with ${BRAND.name}.`,
    lead.message ? `You wrote: "${lead.message}"` : '',
    '',
    'How can we assist you further?',
  ]
    .filter(Boolean)
    .join('\n')

  const phone = waDigits(lead.phone)
  const target = phone || waDigits()
  return `https://wa.me/${target}?text=${encodeURIComponent(text)}`
}

export async function copyToClipboard(text) {
  if (!text) return false
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
