-- Kardosh Realty — run in Supabase SQL Editor
-- https://supabase.com/docs/guides/database

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  message text,
  listing_type text,
  project_id text,
  project_name text,
  source text,
  created_at timestamptz not null default now()
);

-- Existing installs: add the new columns if the table predates them
alter table public.leads add column if not exists project_name text;
alter table public.leads add column if not exists source text;

alter table public.leads enable row level security;

-- Allow anonymous visitors to submit contact forms (insert only)
drop policy if exists anon_insert_leads on public.leads;
create policy anon_insert_leads
  on public.leads
  for insert
  to anon
  with check (true);

-- Optional: allow authenticated staff to read leads
-- create policy "authenticated_read_leads"
--   on public.leads for select to authenticated using (true);
