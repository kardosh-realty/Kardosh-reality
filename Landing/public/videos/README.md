# Hero background video

Place your file here as **`dubai-hero.mp4`** (or set `VITE_HERO_VIDEO_URL` in `kardosh/.env`).

## Recommended export settings

- Resolution: **1920×1080** (or 1280×720 for smaller files)
- Codec: **H.264** (MP4)
- Length: **15–30 seconds** (loops seamlessly)
- Target size: **2–5 MB** (under 8 MB max)
- No audio track (hero plays muted)

Tools: [HandBrake](https://handbrake.fr/), FFmpeg, or CloudConvert.

With `VITE_HERO_USE_LOCAL_VIDEO=true`, the site uses this file instead of YouTube — faster load and no play/pause button overlay.
