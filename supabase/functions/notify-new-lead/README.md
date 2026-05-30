# notify-new-lead

Sends an email to admins when a row is inserted into `public.leads`.

## Setup

1. [Resend](https://resend.com) — verify domain **bookly.my** and use sender `kardosh@bookly.my`.

2. Set secrets (Supabase Dashboard → **Edge Functions** → `notify-new-lead` → **Secrets**, or CLI):

```bash
supabase secrets set RESEND_API_KEY=re_xxxx
supabase secrets set RESEND_FROM="Kardosh Realty <kardosh@bookly.my>"
supabase secrets set ADMIN_NOTIFY_EMAILS=allan@kardoshrealty.com
supabase secrets set DASHBOARD_URL=https://your-dashboard-url.com
```

`RESEND_FROM` is optional if you keep the default (`kardosh@bookly.my`).

If `ADMIN_NOTIFY_EMAILS` is omitted, the function reads emails from the `admins` table (requires `SUPABASE_SERVICE_ROLE_KEY` in the function environment — provided automatically when deployed).

3. Deploy:

```bash
supabase functions deploy notify-new-lead
```

4. In Supabase Dashboard → **Database** → **Webhooks** → **Create hook**:
   - Table: `leads`
   - Events: `INSERT`
   - Type: Supabase Edge Function
   - Function: `notify-new-lead`

Run migrations `008_leads_crm.sql` and `009_admin_notifications.sql` first.
