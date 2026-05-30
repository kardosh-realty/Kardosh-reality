-- Lead CRM: status, internal notes, admin update policy

alter table public.leads add column if not exists status text not null default 'new';
alter table public.leads add column if not exists internal_notes text;
alter table public.leads add column if not exists contacted_at timestamptz;
alter table public.leads add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'leads_status_check'
  ) then
    alter table public.leads
      add constraint leads_status_check
      check (status in ('new', 'contacted', 'qualified', 'closed'));
  end if;
end $$;

drop policy if exists leads_admin_update on public.leads;
create policy leads_admin_update
  on public.leads
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists leads_admin_delete on public.leads;
create policy leads_admin_delete
  on public.leads
  for delete
  to authenticated
  using (public.is_admin());
