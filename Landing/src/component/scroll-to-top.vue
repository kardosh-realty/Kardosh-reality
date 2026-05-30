<template>
    <button v-if="visible" @click="scrollToTop" id="back-to-top" class="back-to-top fixed  text-lg rounded-full z-10 bottom-5 inset-e-5 size-9 text-center bg-primary text-white justify-center items-center flex">
        <ArrowUp :style="{ width: 18,height:18 }" />
    </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { ArrowUp } from 'lucide-vue-next'
import { smoothScrollToTop } from '@/utils/smoothScroll'

const visible = ref(false)

const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop

    visible.value = scrolled > 300
}

const scrollToTop = () => {
    smoothScrollToTop()
}

onMounted(() => {
    window.addEventListener("scroll", toggleVisible)
})

onUnmounted(() => {
    window.removeEventListener("scroll", toggleVisible)
})
</script>