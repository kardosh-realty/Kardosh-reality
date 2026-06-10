-- Admin-curated featured off-plan projects (pin order + public read)
-- Run in Supabase SQL Editor after visibility_overrides.

create table if not exists public.project_curation (
  project_id text primary key,
  featured boolean not null default true,
  sort_order int not null default 0,
  label text,
  updated_at timestamptz not null default now()
);

create index if not exists project_curation_featured_sort
  on public.project_curation (featured, sort_order);

alter table public.project_curation enable row level security;

drop policy if exists project_curation_public_read on public.project_curation;
create policy project_curation_public_read
  on public.project_curation
  for select
  using (true);

drop policy if exists project_curation_admin_write on public.project_curation;
create policy project_curation_admin_write
  on public.project_curation
  for all
  using (true)
  with check (true);
