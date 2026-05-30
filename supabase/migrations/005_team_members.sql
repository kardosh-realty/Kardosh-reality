-- Team members shown on the public About page (admin CRUD)

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text,
  image_url text,
  linkedin text,
  instagram text,
  email text,
  phone text,
  whatsapp text,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.team_members enable row level security;

drop policy if exists team_members_public_read on public.team_members;
create policy team_members_public_read
  on public.team_members
  for select
  using (published = true);

drop policy if exists team_members_admin_all on public.team_members;
create policy team_members_admin_all
  on public.team_members
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Team photos in branding bucket (admin upload — see 004_testimonial_photo_storage.sql)
drop policy if exists branding_team_admin_upload on storage.objects;
create policy branding_team_admin_upload
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'branding'
    and (storage.foldername(name))[1] = 'team'
    and public.is_admin()
  );
