-- Flexible social/contact links for team members (jsonb array)

alter table public.team_members add column if not exists links jsonb not null default '[]'::jsonb;
