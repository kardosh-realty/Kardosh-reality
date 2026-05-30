-- Allow customers (anon) to upload profile photos for testimonials into public branding bucket

-- Ensure the branding bucket exists and is public (skip if you already created it for logos)
insert into storage.buckets (id, name, public)
values ('branding', 'branding', true)
on conflict (id) do update set public = true;

drop policy if exists branding_public_read on storage.objects;
create policy branding_public_read
  on storage.objects
  for select
  using (bucket_id = 'branding');

drop policy if exists branding_admin_upload on storage.objects;
create policy branding_admin_upload
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'branding'
    and public.is_admin()
  );

drop policy if exists branding_customer_testimonial_upload on storage.objects;
create policy branding_customer_testimonial_upload
  on storage.objects
  for insert
  to anon, authenticated
  with check (
    bucket_id = 'branding'
    and (storage.foldername(name))[1] = 'testimonials'
  );
