// Supabase Edge Function: email admins when a new lead is inserted.
// Deploy: supabase functions deploy notify-new-lead
// Secrets: RESEND_API_KEY, ADMIN_NOTIFY_EMAILS (comma-separated), optional RESEND_FROM
// Database Webhook: INSERT on public.leads → this function

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const FROM_EMAIL = Deno.env.get('RESEND_FROM') ?? 'Kardosh Realty <kardosh@bookly.my>'
const FALLBACK_EMAILS = Deno.env.get('ADMIN_NOTIFY_EMAILS') ?? ''

interface LeadRecord {
  id?: string
  name?: string
  email?: string
  phone?: string
  message?: string
  listing_type?: string
  project_id?: string
  project_name?: string
  source?: string
  created_at?: string
}

function parseBody(req: Request): LeadRecord {
  return req.json().catch(() => ({}))
}

async function resolveAdminEmails(supabaseUrl: string, serviceKey: string): Promise<string[]> {
  const fromEnv = FALLBACK_EMAILS.split(',').map((e) => e.trim()).filter(Boolean)
  if (fromEnv.length) return fromEnv

  if (!supabaseUrl || !serviceKey) return []

  const supabase = createClient(supabaseUrl, serviceKey)
  const { data, error } = await supabase.from('admins').select('email')
  if (error || !data?.length) return []
  return data.map((r: { email: string }) => r.email).filter(Boolean)
}

function buildEmailHtml(lead: LeadRecord, dashboardUrl: string) {
  const rows = [
    ['Name', lead.name || '—'],
    ['Email', lead.email || '—'],
    ['Phone', lead.phone || '—'],
    ['Project', lead.project_name || lead.project_id || 'General'],
    ['Interest', lead.listing_type || '—'],
    ['Source', lead.source || '—'],
    ['Message', lead.message || '—'],
  ]
  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#64748b;">${k}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${String(v).replace(/</g, '&lt;')}</td></tr>`
    )
    .join('')

  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#00a63e;margin:0 0 12px;">New website inquiry</h2>
      <p style="color:#475569;">A contact form was submitted on Kardosh Realty.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">${tableRows}</table>
      <p><a href="${dashboardUrl}/inquiries" style="display:inline-block;background:#00a63e;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;">Open in dashboard</a></p>
    </div>
  `
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const payload = await parseBody(req)
    const lead: LeadRecord = (payload as { record?: LeadRecord }).record ?? payload

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ ok: false, skipped: 'RESEND_API_KEY not set' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const dashboardUrl = Deno.env.get('DASHBOARD_URL') ?? 'http://localhost:5176'
    const recipients = await resolveAdminEmails(supabaseUrl, serviceKey)

    if (!recipients.length) {
      return new Response(JSON.stringify({ ok: false, skipped: 'No admin emails configured' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const subject = lead.project_name
      ? `New inquiry: ${lead.name} — ${lead.project_name}`
      : `New inquiry from ${lead.name || 'website visitor'}`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: recipients,
        subject,
        html: buildEmailHtml(lead, dashboardUrl.replace(/\/$/, '')),
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Resend error', errText)
      return new Response(JSON.stringify({ ok: false, error: errText }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ ok: true, sent: recipients.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
