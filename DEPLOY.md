# Deploy Kardosh (GitHub + Vercel)

Use **one GitHub repository** (this folder as repo root), then **two Vercel projects** (Landing + Dashboard). This keeps the public site and admin separate.

## Live URLs (Vercel)

| App | URL |
|-----|-----|
| **Landing** | https://kardosh-realty.vercel.app |
| **Dashboard** | https://kardosh-realty-i3jl.vercel.app (login: `/login`) |

**Dashboard env:** `VITE_MAIN_SITE_URL=https://kardosh-realty.vercel.app` (no trailing slash, no `/login`).

**Supabase Edge Function secret:** `DASHBOARD_URL=https://kardosh-realty-i3jl.vercel.app` (base URL only).

## 1. Create the GitHub repository

From your machine (PowerShell), in the `kardosh` folder:

```powershell
cd path\to\kardosh
git init
git add .
git commit -m "Initial commit: Kardosh Landing, Dashboard, Supabase"
```

On GitHub: **New repository** → name e.g. `kardosh-realty` → do **not** add README if you already committed locally.

```powershell
git remote add origin https://github.com/YOUR_ORG/kardosh-realty.git
git branch -M main
git push -u origin main
```

`.env` is gitignored. Never commit API keys.

## 2. Vercel — Landing (public site)

1. [vercel.com](https://vercel.com) → **Add New** → **Project** → import your GitHub repo.
2. **Project name:** e.g. `kardosh-landing`
3. **Root Directory:** `Landing` (repo root is this monorepo folder).
4. Framework: **Vite** (or use existing `Landing/vercel.json`).
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`
7. **Install Command:** `npm install` (default)

### Landing environment variables

Set in **Settings → Environment Variables** (Production + Preview):

| Variable | Required | Notes |
|----------|----------|--------|
| `REELLY_API_KEY` | Yes | Server only — Reelly proxy (`api/proxy-reelly.js`) |
| `VITE_SUPABASE_URL` | Yes | Contact form + leads |
| `VITE_SUPABASE_ANON_KEY` | Yes | Same |
| `VITE_APP_NAME` | Optional | |
| `VITE_CONTACT_EMAIL` | Optional | |
| `VITE_CONTACT_PHONE` | Optional | |
| `VITE_RERA_LICENSE` | Optional | |
| `VITE_SOCIAL_*` | Optional | |
| `VITE_HERO_USE_LOCAL_VIDEO` | Optional | `true` for MP4 hero |
| `VITE_HERO_VIDEO_URL` | Optional | e.g. `/videos/dubai-hero.mp4` |
| `VITE_HERO_VIDEO_POSTER` | Optional | |

Copy values from local `.env`.

### Landing domain

Example: `kardoshrealty.ae` or `www.kardoshrealty.ae` → assign in Vercel **Domains**.

`Landing/vercel.json` already includes:

- SPA fallback to `index.html`
- Rewrite `/api/reelly/*` → Reelly proxy

## 3. Vercel — Dashboard (admin)

Create a **second** Vercel project from the **same** GitHub repo.

1. **Add New** → **Project** → same repository.
2. **Project name:** e.g. `kardosh-dashboard`
3. **Root Directory:** `Dashboard`
4. Framework: **Vite**
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`
7. Uses `Dashboard/vercel.json` for SPA routing.

### Dashboard environment variables

| Variable | Required | Notes |
|----------|----------|--------|
| `REELLY_API_KEY` | Yes | Same as Landing — powers `/api/reelly` for Communities / off-plan |
| `VITE_SUPABASE_URL` | Yes | Admin data |
| `VITE_SUPABASE_ANON_KEY` | Yes | Same project as Landing |
| `VITE_MAIN_SITE_URL` | Yes | Production Landing URL, e.g. `https://kardosh-realty.vercel.app` |
| `VITE_APP_NAME` | Optional | |

### Dashboard domain

Example: `admin.kardoshrealty.ae` (subdomain recommended).

Restrict access in Supabase (RLS + auth) — the dashboard is a static SPA; security is enforced by Supabase policies and your login flow.

## 4. After deploy — checklist

**Landing**

- [ ] Home and `/off-plan` load listings
- [ ] `/api/reelly/...` returns data (not 500 missing API key)
- [ ] `/contact` submits to Supabase `leads`
- [ ] Deep links work: `/property-detail/:id`, `/grid-map`

**Dashboard**

- [ ] Login / admin pages load
- [ ] Leads, blog, notifications work against Supabase
- [ ] “View site” / preview links use `VITE_MAIN_SITE_URL`

**Supabase** (managed in Supabase dashboard / CLI, not in this repo)

- [ ] Database migrations applied
- [ ] Edge functions and secrets configured (e.g. new-lead notifications)

## 5. Vercel root directories

| Project | Root Directory |
|---------|----------------|
| Landing | `Landing` |
| Dashboard | `Dashboard` |

## Local vs production

| | Local | Vercel Landing |
|---|--------|----------------|
| Reelly API | Vite dev proxy in `Landing/vite.config.js` | `api/proxy-reelly.js` + `REELLY_API_KEY` |
| Env file | `.env` (local only) | Per-project env vars in Vercel |

For questions about a single-domain setup (`/admin`), see the earlier note in chat — two projects is still the recommended path.
