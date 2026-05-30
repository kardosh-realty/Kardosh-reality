import { isSupabaseConfigured } from '@/lib/supabase'
import { submitLead } from '@/services/leads'

const NOTIFY_EMAIL =
  import.meta.env.VITE_WELCOME_NOTIFY_EMAIL || 'allan@kardoshrealty.com'

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
}

/** Notify inbox via FormSubmit (no backend required). */
async function sendViaFormSubmit(email) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      subscribe_email: email,
      _subject: 'Kardosh Realty — launch notification signup',
      _template: 'box',
      _captcha: 'false',
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Subscribe failed (${res.status})`)
  }

  return res.json().catch(() => ({}))
}

/**
 * Welcome page email signup — emails Allan + stores in Supabase when configured.
 */
export async function submitWelcomeSubscribe(email) {
  const trimmed = String(email || '').trim().toLowerCase()
  if (!isValidEmail(trimmed)) {
    throw new Error('Please enter a valid email address.')
  }

  let stored = false
  let emailed = false

  if (isSupabaseConfigured()) {
    try {
      await submitLead({
        name: 'Launch subscribe',
        email: trimmed,
        message: 'Welcome page — notify when live',
        listingType: 'newsletter',
      })
      stored = true
    } catch (err) {
      console.warn('[welcome subscribe] Supabase:', err)
    }
  }

  try {
    await sendViaFormSubmit(trimmed)
    emailed = true
  } catch (err) {
    console.warn('[welcome subscribe] FormSubmit:', err)
    if (!stored) throw new Error('Could not subscribe right now. Please try again.')
  }

  return { emailed, stored, notifyEmail: NOTIFY_EMAIL }
}
