-- Blog posts (Landing public read + Dashboard admin CRUD)
-- Realtime: live admin notification bell

-- ——— Realtime ———
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'admin_notifications'
  ) then
    alter publication supabase_realtime add table public.admin_notifications;
  end if;
end $$;

-- ——— Blogs ———
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null default '',
  cover_image_url text,
  category text,
  author_name text not null default 'Kardosh Realty',
  read_minutes smallint not null default 5 check (read_minutes >= 1 and read_minutes <= 120),
  published boolean not null default false,
  published_at timestamptz,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blogs_published_sort_idx
  on public.blogs (published, sort_order asc, published_at desc nulls last);

alter table public.blogs enable row level security;

grant select on table public.blogs to anon;
grant select on table public.blogs to authenticated;
grant insert, update, delete on table public.blogs to authenticated;

drop policy if exists blogs_public_read on public.blogs;
create policy blogs_public_read
  on public.blogs
  for select
  to anon, authenticated
  using (published = true);

drop policy if exists blogs_admin_all on public.blogs;
create policy blogs_admin_all
  on public.blogs
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
