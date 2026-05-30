# Kardosh Realty

Monorepo for the public **Landing** site and admin **Dashboard**.

## Apps

| App | Folder | Dev URL | Purpose |
|-----|--------|---------|---------|
| Landing | `Landing/` | http://localhost:5173 | Public marketing + off-plan listings |
| Dashboard | `Dashboard/` | http://localhost:5176 | Admin CRM (leads, blog, team, etc.) |

## Quick start

1. Copy environment file:

   ```bash
   cp .env.example .env
   ```

2. Fill in `.env` (see `.env.example` for all keys).

3. Install and run (from this folder):

   ```bash
   npm run install:all
   npm run dev:landing    # public site
   npm run dev:dashboard  # admin
   ```

## Environment

- **One shared file:** `.env` at repo root (never commit it).
- **Vite apps** read it via `env-dir.mjs` (parent folder).
- **Vercel:** set the same variables in each project’s Environment Variables UI (see [DEPLOY.md](./DEPLOY.md)).

## Deploy

Production uses **two Vercel projects** from this repo:

- **Landing** → e.g. `kardoshrealty.ae`
- **Dashboard** → e.g. `admin.kardoshrealty.ae`

Full steps: **[DEPLOY.md](./DEPLOY.md)**

Supabase (migrations, edge functions) is managed in your Supabase project separately—not in this Git repo.

## Repo layout

```
├── Landing/          # Vite + Vue public site (+ api/ for Reelly proxy on Vercel)
├── Dashboard/        # Vite + Vue admin
├── .env.example      # Template for local + Vercel
├── env-dir.mjs       # Shared env path for Vite
├── DEPLOY.md         # GitHub + Vercel guide
└── package.json      # Convenience scripts
```
