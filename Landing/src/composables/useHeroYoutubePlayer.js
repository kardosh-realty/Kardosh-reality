import { onUnmounted } from 'vue'

const YT_SCRIPT_ID = 'youtube-iframe-api'
const RESUME_INTERVAL_MS = 250

let apiReadyPromise = null

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve()
  if (apiReadyPromise) return apiReadyPromise

  apiReadyPromise = new Promise((resolve) => {
    const done = () => {
      if (window.YT?.Player) resolve()
    }

    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      done()
    }

    if (!document.getElementById(YT_SCRIPT_ID)) {
      const tag = document.createElement('script')
      tag.id = YT_SCRIPT_ID
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }

    const poll = setInterval(() => {
      if (window.YT?.Player) {
        clearInterval(poll)
        resolve()
      }
    }, 50)
  })

  return apiReadyPromise
}

function playerVars() {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return {
    autoplay: 1,
    mute: 1,
    controls: 0,
    rel: 0,
    modestbranding: 1,
    playsinline: 1,
    iv_load_policy: 3,
    cc_load_policy: 0,
    disablekb: 1,
    fs: 0,
    enablejsapi: 1,
    origin,
  }
}

/**
 * Background hero: API player (no playlist UI), never stay paused, loop via API.
 */
export function useHeroYoutubePlayer(hostRef, videoId, { onPlaying, onReady } = {}) {
  let player = null
  let resumeTimer = null
  let bound = false

  function forceResume() {
    if (!player?.getPlayerState) return
    const YT = window.YT
    const state = player.getPlayerState()
    if (
      state === YT.PlayerState.PAUSED ||
      state === YT.PlayerState.CUED ||
      state === YT.PlayerState.ENDED
    ) {
      if (state === YT.PlayerState.ENDED) player.seekTo(0, true)
      player.playVideo()
    }
  }

  function startResumeWatch() {
    stopResumeWatch()
    resumeTimer = window.setInterval(forceResume, RESUME_INTERVAL_MS)
  }

  function stopResumeWatch() {
    if (resumeTimer) {
      window.clearInterval(resumeTimer)
      resumeTimer = null
    }
  }

  function onVisibilityChange() {
    if (document.visibilityState === 'visible') forceResume()
  }

  async function bindPlayer() {
    if (!videoId || !hostRef.value || bound) return

    await loadYouTubeApi()
    bound = true

    player = new window.YT.Player(hostRef.value, {
      videoId,
      playerVars: playerVars(),
      events: {
        onReady: (event) => {
          event.target.mute()
          event.target.playVideo()
          startResumeWatch()
          onReady?.(event.target)
        },
        onStateChange: (event) => {
          const YT = window.YT
          if (event.data === YT.PlayerState.PLAYING) {
            onPlaying?.()
          }
          if (
            event.data === YT.PlayerState.PAUSED ||
            event.data === YT.PlayerState.ENDED
          ) {
            forceResume()
          }
        },
      },
    })

    document.addEventListener('visibilitychange', onVisibilityChange)
  }

  function destroyPlayer() {
    document.removeEventListener('visibilitychange', onVisibilityChange)
    stopResumeWatch()
    try {
      player?.destroy?.()
    } catch {
      /* ignore */
    }
    player = null
    bound = false
  }

  onUnmounted(destroyPlayer)

  return { bindPlayer, destroyPlayer, forceResume }
}
