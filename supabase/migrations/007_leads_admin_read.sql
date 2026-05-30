-- Allow dashboard admins to read contact form inquiries

drop policy if exists leads_admin_read on public.leads;
create policy leads_admin_read
  on public.leads
  for select
  to authenticated
  using (public.is_admin());
