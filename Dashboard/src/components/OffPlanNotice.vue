<template>
  <div>
    <!-- Reelly data load error -->
    <div
      v-if="error"
      class="mt-6 rounded-md border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40 p-4 text-sm text-red-700 dark:text-red-200"
    >
      {{ error }}
      <span class="block text-xs mt-1 opacity-80">
        On Vercel: add <code>REELLY_API_KEY</code> to this Dashboard project and redeploy (same key as Landing).
        Locally: set it in <code>kardosh/.env</code> and restart <code>npm run dev:dashboard</code>.
      </span>
    </div>

    <!-- Supabase connected but table read/write failed (usually: table not created yet) -->
    <div
      v-else-if="source === 'error'"
      class="mt-6 rounded-md border border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 p-4 text-sm text-amber-900 dark:text-amber-100"
    >
      <p class="font-medium">Supabase is connected, but the <code>visibility_overrides</code> table couldn’t be read.</p>
      <p class="text-xs mt-1 opacity-80" v-if="dbError">Details: {{ dbError }}</p>
      <p class="mt-2">Run this once in the Supabase SQL editor, then refresh:</p>
      <pre class="mt-2 p-3 rounded bg-slate-900 text-slate-100 text-xs overflow-x-auto"><code>{{ sql }}</code></pre>
    </div>

    <!-- No Supabase keys -->
    <div
      v-else-if="source === 'unconfigured'"
      class="mt-6 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 p-4 text-sm text-amber-800 dark:text-amber-100"
    >
      Visibility changes are saved on this device only. Add <code>VITE_SUPABASE_URL</code> /
      <code>VITE_SUPABASE_ANON_KEY</code> to <code>kardosh/.env</code> and create the
      <code>visibility_overrides</code> table to apply them to the public website.
    </div>

    <!-- source === 'supabase' → connected, no banner -->
  </div>
</template>

<script setup>
defineProps({
  error: { type: String, default: '' },
  source: { type: String, default: 'unconfigured' },
  dbError: { type: String, default: '' },
})

const sql = `create table if not exists visibility_overrides (
  entity_type text not null,
  entity_id   text not null,
  hidden      boolean not null default true,
  label       text,
  updated_at  timestamptz not null default now(),
  primary key (entity_type, entity_id)
);

alter table visibility_overrides enable row level security;

-- Public site reads flags
create policy "read visibility" on visibility_overrides
  for select using (true);

-- Allow anon writes from the dashboard (tighten later with auth)
create policy "write visibility" on visibility_overrides
  for all using (true) with check (true);`
</script>
