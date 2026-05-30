-- Allow the public website (anon key) to read published blog posts

grant select on table public.blogs to anon;
grant select on table public.blogs to authenticated;
grant insert, update, delete on table public.blogs to authenticated;

drop policy if exists blogs_public_read on public.blogs;
create policy blogs_public_read
  on public.blogs
  for select
  to anon, authenticated
  using (published = true);
