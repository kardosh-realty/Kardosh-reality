# Hero background video

The home hero shows **`001.webp`** until the background video plays. Configure in **`kardosh/.env`**:

```env
VITE_HERO_VIDEO_POSTER=/assets/images/bg/001.webp
VITE_HERO_VIDEO_URL=https://your-cdn.com/path/dubai-hero.mp4
VITE_HERO_USE_LOCAL_VIDEO=true
```

## Recommended

- Host the MP4 on **Cloudflare R2**, **Bunny CDN**, **S3 + CloudFront**, or similar — not in the git repo.
- Paste the public **`https://…mp4`** URL into `VITE_HERO_VIDEO_URL`.
- Keep the poster as `001.webp` (already in `src/assets/images/bg/`).

## Export settings

- Resolution: **1920×1080** (or 1280×720)
- Codec: **H.264** (MP4)
- Length: **15–30 seconds**, seamless loop
- Target size: **2–5 MB**
- No audio track (plays muted)

## Local file (optional)

You can still use `public/videos/dubai-hero.mp4` with:

```env
VITE_HERO_VIDEO_URL=/videos/dubai-hero.mp4
```

## YouTube (alternative)

Unset `VITE_HERO_USE_LOCAL_VIDEO` or set it `false`, then set `VITE_HERO_YOUTUBE_URL`. The custom poster (`001.webp`) is still used until the embed loads.
