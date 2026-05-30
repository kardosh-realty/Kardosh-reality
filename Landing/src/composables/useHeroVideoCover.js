import { ref, onMounted, onUnmounted } from 'vue'
import { HERO_YOUTUBE_COVER_BLEED } from '@/config/marketing'

const VIDEO_ASPECT = 16 / 9

/**
 * Size a 16:9 iframe to cover its container and crop YouTube UI chrome (title, related).
 */
export function useHeroVideoCover(containerRef, bleed = HERO_YOUTUBE_COVER_BLEED) {
  const iframeStyle = ref({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '0',
  })

  let observer = null

  function resolveIframe(el) {
    if (!el) return null
    return el.tagName === 'IFRAME' ? el : el.querySelector?.('iframe')
  }

  function updateCover() {
    const el = containerRef.value
    const iframe = resolveIframe(el)
    if (!el) return

    const w = el.clientWidth
    const h = el.clientHeight
    if (!w || !h) return

    const containerAspect = w / h
    let width
    let height

    if (containerAspect > VIDEO_ASPECT) {
      width = w
      height = w / VIDEO_ASPECT
    } else {
      height = h
      width = h * VIDEO_ASPECT
    }

    width *= bleed
    height *= bleed

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: `${Math.ceil(width)}px`,
      height: `${Math.ceil(height)}px`,
      transform: 'translate(-50%, -50%)',
      border: '0',
      maxWidth: 'none',
      maxHeight: 'none',
      pointerEvents: 'none',
    }
    iframeStyle.value = style
    if (iframe) Object.assign(iframe.style, style)
  }

  onMounted(() => {
    updateCover()
    observer = new ResizeObserver(updateCover)
    if (containerRef.value) observer.observe(containerRef.value)
    window.addEventListener('resize', updateCover)
  })

  onUnmounted(() => {
    observer?.disconnect()
    window.removeEventListener('resize', updateCover)
  })

  return { iframeStyle, updateCover }
}
