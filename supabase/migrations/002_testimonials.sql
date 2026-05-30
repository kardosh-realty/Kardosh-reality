-- Kardosh Realty — testimonials (dashboard CRUD, public read when published)
-- Run in Supabase SQL Editor after 001_leads.sql

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote_text text not null,
  image_url text,
  rating smallint not null default 5 check (rating >= 1 and rating <= 5),
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

-- Helper: true when the signed-in user's email is in admins
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where email = (auth.jwt() ->> 'email')
  );
$$;

-- Public website: read published testimonials only
drop policy if exists testimonials_public_read on public.testimonials;
create policy testimonials_public_read
  on public.testimonials
  for select
  using (published = true);

-- Dashboard admins: full CRUD (including drafts)
drop policy if exists testimonials_admin_all on public.testimonials;
create policy testimonials_admin_all
  on public.testimonials
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
