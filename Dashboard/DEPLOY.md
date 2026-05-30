# Dashboard deploy

Deploy as a **separate Vercel project** from the monorepo.

| Setting | Value |
|---------|--------|
| Root Directory | `Dashboard` (if repo root is `kardosh/`) or `kardosh/Dashboard` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

**Required env vars:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_MAIN_SITE_URL` (production Landing URL).

Full guide: [../DEPLOY.md](../DEPLOY.md)
