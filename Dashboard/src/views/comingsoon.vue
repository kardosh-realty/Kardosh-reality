<template>
    <section class="md:h-screen py-36 flex items-center justify-center relative overflow-hidden zoom-image">
        <div class="absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover" :style="{backgroundImage: `url(${bg1})`}"></div>
        <div class="absolute inset-0 bg-linear-to-b from-transparent to-slate-900 z-2" id="particles-snow"></div>
        <div class="container-fluid relative z-3">
            <div class="grid grid-cols-1">
                <div class="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
                    <div class="text-center">
                        <RouterLink to="/"><img :src="logo" class="mx-auto" alt=""/></RouterLink>
                    </div>
                    <div class="title-heading text-center my-auto">
                        <h1 class="text-white mt-3 mb-6 md:text-5xl text-3xl font-bold">We Are Coming Soon...</h1>
                        <p class="text-white/70 text-lg max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
                    
                        <div id="countdown">
                            <ul class="count-down list-none inline-block text-white text-center mt-8 m-6">
                                <li id="days" class="count-number inline-block m-2">{{days}}<p class='count-head'>Days</p></li>
                                <li id="hours" class="count-number inline-block m-2">{{hours}}<p class='count-head'>Hours</p></li>
                                <li id="mins" class="count-number inline-block m-2">{{minutes}}<p class='count-head'>Mins</p></li>
                                <li id="secs" class="count-number inline-block m-2">{{seconds}}<p class='count-head'>Secs</p></li>
                                <li id="end" class="h1"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="text-center">
                        <p class="mb-0 text-slate-400">© {{ year }} Hously. Design & Develop with <i class="ri-heart-fill text-red-600"></i> by <a href="https://shreethemes.in/" target="_blank" class="text-reset">Shreethemes</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <BackToHome />
    <Switcher />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

import BackToHome from '@/components/back-to-home.vue'
import Switcher from '@/components/switcher.vue'

import logo from '@/assets/images/logo-icon-64.png'
import bg1 from '@/assets/images/01.jpg'

const year = new Date().getFullYear()

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const deadline = 'December, 31, 2027'

const getTime = () => {
    const time = Date.parse(deadline) - Date.now()

    days.value = Math.floor(time / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((time / (1000 * 60 * 60)) % 24)
    minutes.value = Math.floor((time / 1000 / 60) % 60)
    seconds.value = Math.floor((time / 1000) % 60)
}

let interval = null

onMounted(() => {

    document.documentElement.setAttribute('dir', 'ltr')
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')

    getTime()

    interval = setInterval(() => {
        getTime()
    }, 1000)
})

onUnmounted(() => {
    clearInterval(interval)
})
</script>