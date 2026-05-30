import { ref, onMounted, onUnmounted } from 'vue'

const SIZE_ORDER = { xs: 0, sm: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }

function resolveScreenSize(width) {
  if (width >= 1536) return '2xl'
  if (width >= 1280) return 'xl'
  if (width >= 1024) return 'lg'
  if (width >= 768) return 'md'
  if (width >= 640) return 'sm'
  return 'xs'
}

class ComparableScreenSize {
  constructor(value) {
    this.value = value
  }

  lessThan(other) {
    return SIZE_ORDER[this.value] < SIZE_ORDER[other]
  }

  greaterThan(other) {
    return SIZE_ORDER[this.value] > SIZE_ORDER[other]
  }
}

export function useScreenSize() {
  const size = ref('md')

  function update() {
    if (typeof window === 'undefined') return
    size.value = resolveScreenSize(window.innerWidth)
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update, { passive: true })
  })

  onUnmounted(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', update)
  })

  return {
    get value() {
      return new ComparableScreenSize(size.value)
    },
    lessThan(breakpoint) {
      return SIZE_ORDER[size.value] < SIZE_ORDER[breakpoint]
    },
  }
}
