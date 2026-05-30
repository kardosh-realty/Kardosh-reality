# Kardosh Realty — Welcome (coming soon)

Standalone Vue 3 app for the launch / coming-soon page. Deploy this folder alone on Vercel while the main site stays in `../Landing`.

## Setup

```bash
cd Welcome
npm install
# Shared env: copy ../.env.example → ../.env (kardosh folder)
# Copy brand assets from Landing if needed:
#   public/kardosh-icon.png
#   public/kardosh-logo.png
npm run dev
```

Open http://localhost:5180 (or the port in `PORT`).

## Build

```bash
npm run build
npm run preview
```

Output: `dist/` (served as static site).

## Vercel

1. New project → connect repo **bolttesting/Kardosh-Real-Estate** (repo root = this folder).
2. Framework: Vite (or use `vercel.json`).
3. Add all `VITE_*` variables from `../.env.example` (same keys as Landing/Dashboard).
4. **Domains & SSL:** add `www.kardoshrealty.ae` and `kardoshrealty.ae` in Vercel → Settings → Domains. See **[DOMAIN-SETUP.md](./DOMAIN-SETUP.md)** for DNS records (A + CNAME) and HTTPS.

## Main site

When the full landing app launches, set `VITE_MAIN_SITE_URL` to that URL. The logo link on the welcome page uses it.
