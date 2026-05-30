-- Persisted notifications + per-admin read state (syncs across devices)

create table if not exists public.admin_notifications (
  id uuid primary key default gen_random_uuid(),
  notification_key text not null unique,
  type text not null,
  title text not null,
  detail text,
  href text not null default '/inquiries',
  entity_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.notification_reads (
  notification_key text not null,
  admin_email text not null,
  read_at timestamptz not null default now(),
  primary key (notification_key, admin_email)
);

alter table public.admin_notifications enable row level security;
alter table public.notification_reads enable row level security;

drop policy if exists admin_notifications_admin_read on public.admin_notifications;
create policy admin_notifications_admin_read
  on public.admin_notifications
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists notification_reads_admin_all on public.notification_reads;
create policy notification_reads_admin_all
  on public.notification_reads
  for all
  to authenticated
  using (
    admin_email = (auth.jwt() ->> 'email')
    and public.is_admin()
  )
  with check (
    admin_email = (auth.jwt() ->> 'email')
    and public.is_admin()
  );

-- Create a notification row when a new lead arrives (anon insert still allowed on leads)
create or replace function public.on_lead_insert_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admin_notifications (
    notification_key,
    type,
    title,
    detail,
    href,
    entity_id
  )
  values (
    'lead:' || new.id::text,
    'lead',
    'New inquiry received',
    coalesce(new.name, 'Someone') ||
      case
        when new.project_name is not null and new.project_name <> ''
          then ' inquired about ' || new.project_name || '.'
        else ' submitted a contact inquiry.'
      end,
    '/inquiries',
    new.id
  )
  on conflict (notification_key) do nothing;
  return new;
end;
$$;

drop trigger if exists leads_insert_notification on public.leads;
create trigger leads_insert_notification
  after insert on public.leads
  for each row
  execute function public.on_lead_insert_notification();

-- Backfill notifications for existing leads (safe to re-run)
insert into public.admin_notifications (notification_key, type, title, detail, href, entity_id, created_at)
select
  'lead:' || l.id::text,
  'lead',
  'New inquiry received',
  coalesce(l.name, 'Someone') ||
    case
      when l.project_name is not null and l.project_name <> ''
        then ' inquired about ' || l.project_name || '.'
      else ' submitted a contact inquiry.'
    end,
  '/inquiries',
  l.id,
  l.created_at
from public.leads l
on conflict (notification_key) do nothing;
