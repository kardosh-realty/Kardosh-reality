# Domain & SSL — kardoshrealty.ae

SSL is **free and automatic** on Vercel (Let’s Encrypt). You do not buy a separate certificate. After DNS is correct, HTTPS usually works within a few minutes.

**Recommended URLs:** `https://www.kardoshrealty.ae` and `https://kardoshrealty.ae` (both on Vercel after DNS is fixed).

---

## Blank screen + “Not secure” (fix this first)

If the browser shows a **white page** and **Not secure** on `https://kardoshrealty.ae`, DNS is almost certainly **not pointing at Vercel**.

### What we saw on your domain

| Check | Expected (Vercel) | Your domain (wrong) |
|--------|-------------------|---------------------|
| Apex A record | `76.76.21.21` | `139.162.173.118`, `216.198.79.1` |
| `www` | **CNAME** → `cname.vercel-dns.com` | Same A as apex (alias) |

Traffic is going to **another server** with a bad or mismatched SSL certificate, so the padlock breaks and the Vue app never loads.

### Fix at your registrar (Etisalat / AE DNS panel)

1. **Delete** all existing **A** / **AAAA** records for `@` and `www` that use `139.162.173.118`, `216.198.79.1`, or any IP that is not Vercel’s.
2. **Add** (or use the exact records Vercel shows after you add the domain):

| Type | Host | Value |
|------|------|--------|
| **A** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

3. Do **not** point `www` to the same A record as `@` unless Vercel tells you to. `www` should be a **CNAME** to Vercel.
4. Wait 15–60 minutes (up to 24h). In Vercel → **Domains**, both names must show **Valid** and **SSL: Certificate active**.

### After DNS is valid

- Open `https://www.kardoshrealty.ae` — welcome page with padlock.
- Open `https://kardoshrealty.ae` — same site (you can set “redirect to www” in Vercel **Domains** if you want one canonical URL).

---

## 1. Vercel — add both domains

1. Open [Vercel Dashboard](https://vercel.com) → project linked to **Kardosh-Real-Estate** repo.
2. **Settings** → **Domains**.
3. Add:
   - `www.kardoshrealty.ae` (primary)
   - `kardoshrealty.ae` (apex)
4. Vercel shows the DNS records you must create. Status should become **Valid** then **SSL: Active**.

---

## 2. DNS at your registrar

Where you bought `kardoshrealty.ae` (e.g. GoDaddy, Namecheap, AE registrar), open **DNS / Manage DNS** and add:

| Type | Name / Host | Value | Notes |
|------|-------------|--------|--------|
| **A** | `@` (or blank) | `76.76.21.21` | Apex → Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com` | Or the exact CNAME Vercel shows for your project |

If Vercel shows different values after you add the domain, **use Vercel’s values** (they can be project-specific).

**Remove** old A/CNAME records that point elsewhere, or the domain will not verify.

**TTL:** 300–3600 seconds is fine. Propagation can take 5 minutes–48 hours.

---

## 3. Check SSL

When DNS is valid in Vercel:

- `https://www.kardoshrealty.ae` — should load the welcome page with a padlock.
- `https://kardoshrealty.ae` — should redirect to `www`.
- `http://` versions redirect to `https://` automatically on Vercel.

Test: [https://www.ssllabs.com/ssltest/](https://www.ssllabs.com/ssltest/) (optional).

---

## 4. Environment variable

In Vercel **Settings → Environment Variables** (Production):

```env
VITE_MAIN_SITE_URL=https://www.kardoshrealty.ae
```

Redeploy after changing env vars.

---

## Troubleshooting

| Issue | Fix |
|--------|-----|
| **Not secure** / certificate error | DNS not on Vercel — fix A + CNAME above |
| **Blank white page** | Wrong host or JS blocked; fix DNS; hard-refresh (Ctrl+F5) |
| **Invalid configuration** in Vercel | Remove conflicting DNS; wait for propagation |
| **SSL pending** | DNS not propagated yet; wait up to 24h |
| **Wrong site** | Domain attached to a different Vercel project |

### Verify DNS (Windows)

```text
nslookup kardoshrealty.ae
nslookup www.kardoshrealty.ae
```

Apex should show `76.76.21.21`. `www` should show a CNAME to Vercel, not `139.162.x.x`.
