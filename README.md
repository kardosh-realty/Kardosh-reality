# Kardosh Realty

Monorepo for the public **Landing** site, admin **Dashboard**, optional **Welcome** coming-soon page, and **Supabase** migrations/functions.

## Apps

| App | Folder | Dev URL | Purpose |
|-----|--------|---------|---------|
| Landing | `Landing/` | http://localhost:5173 | Public marketing + off-plan listings |
| Dashboard | `Dashboard/` | http://localhost:5176 | Admin CRM (leads, blog, team, etc.) |
| Welcome | `Welcome/` | http://localhost:5180 | Coming-soon / launch gate (optional) |

## Quick start

1. Copy environment file:

   ```bash
   cp .env.example .env
   ```

2. Fill in `kardosh/.env` (see `.env.example` for all keys).

3. Install and run (from this `kardosh/` folder):

   ```bash
   npm install --prefix Landing
   npm install --prefix Dashboard
   npm run dev:landing    # public site
   npm run dev:dashboard  # admin
   ```

   Or install both via root scripts after `npm install` at repo root (see `package.json`).

## Environment

- **One shared file:** `kardosh/.env` (never commit it).
- **Vite apps** read it via `env-dir.mjs` (parent folder).
- **Vercel:** set the same variables in each project’s Environment Variables UI (see [DEPLOY.md](./DEPLOY.md)).

## Deploy

Production uses **two Vercel projects** from this repo (recommended):

- **Landing** → e.g. `kardoshrealty.ae`
- **Dashboard** → e.g. `admin.kardoshrealty.ae`

Full steps: **[DEPLOY.md](./DEPLOY.md)**

## Supabase

SQL migrations: `supabase/migrations/`  
Edge function (new-lead email): `supabase/functions/notify-new-lead/`

Apply migrations in the Supabase dashboard or CLI before using contact forms / admin features.

## Repo layout

```
kardosh/
├── Landing/          # Vite + Vue public site (+ api/ for Reelly proxy on Vercel)
├── Dashboard/        # Vite + Vue admin
├── Welcome/          # Optional coming-soon
├── supabase/         # Migrations + edge functions
├── .env.example      # Template for local + Vercel
├── env-dir.mjs       # Shared env path for Vite
├── DEPLOY.md         # GitHub + Vercel guide
└── package.json      # Convenience scripts
```
