-- Customer shareable review links → pending testimonials for admin approval

alter table public.testimonials add column if not exists source text not null default 'admin';
alter table public.testimonials add column if not exists invite_id uuid;

create table if not exists public.testimonial_invites (
  id uuid primary key default gen_random_uuid(),
  token text not null unique default encode(gen_random_bytes(16), 'hex'),
  label text,
  active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

-- Link testimonials to the invite used (optional FK after both exist)
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'testimonials_invite_id_fkey'
  ) then
    alter table public.testimonials
      add constraint testimonials_invite_id_fkey
      foreign key (invite_id) references public.testimonial_invites (id)
      on delete set null;
  end if;
end $$;

alter table public.testimonial_invites enable row level security;

-- Public: validate an active invite by token (read-only)
drop policy if exists testimonial_invites_public_read on public.testimonial_invites;
create policy testimonial_invites_public_read
  on public.testimonial_invites
  for select
  using (
    active = true
    and (expires_at is null or expires_at > now())
  );

-- Admins: create and manage invite links
drop policy if exists testimonial_invites_admin_all on public.testimonial_invites;
create policy testimonial_invites_admin_all
  on public.testimonial_invites
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Public: customers submit a review via a valid invite (pending until admin publishes)
drop policy if exists testimonials_customer_insert on public.testimonials;
create policy testimonials_customer_insert
  on public.testimonials
  for insert
  to anon, authenticated
  with check (
    source = 'customer'
    and published = false
    and invite_id is not null
    and exists (
      select 1 from public.testimonial_invites i
      where i.id = invite_id
        and i.active = true
        and (i.expires_at is null or i.expires_at > now())
    )
  );
