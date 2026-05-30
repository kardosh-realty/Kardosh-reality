<template>
    <section class="md:h-screen py-36 flex items-center justify-center relative overflow-hidden zoom-image">
        <div class="absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover" :style="{backgroundImage: `url(${bg1})`}"></div>
        <div class="absolute inset-0 bg-linear-to-b from-transparent to-slate-900 z-2" id="particles-snow"></div>
        <div class="container relative z-3 text-center">
            <div class="grid grid-cols-1">
                <img :src="logo1" class="mx-auto" alt=""/>
                <h1 class="text-white mb-6 mt-8 md:text-5xl text-3xl font-bold">We Are Back Soon...</h1>
                <p class="text-white/70 text-lg max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <div class="grid grid-cols-1 mt-10">
                <div class="text-center">
                    <span id="maintenance" class="timer text-white text-[56px] tracking-[1px]">{{ minutes }}:{{ remainingSeconds }}</span>
                    <span class="block text-base font-semibold uppercase text-white">Minutes</span>
                </div>
            </div>

            <div class="grid grid-cols-1 mt-8">
                <div class="text-center subcribe-form">
                    <form class="relative mx-auto max-w-xl">
                        <input type="email" id="subemail" name="name" class="pt-4 pe-40 pb-4 ps-6 w-full h-12.5 outline-none text-slate-900 dark:text-white rounded-md bg-white/70 dark:bg-slate-900/70 border dark:border-gray-700" placeholder="Enter your email id.."/>
                        <button type="submit" class="btn absolute top-0.5 inset-e-0.75 h-11.5 bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md">Subcribe Now</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <BackToHome />
    <Switcher />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import BackToHome from '@/components/back-to-home.vue';
import Switcher from '@/components/switcher.vue';

import bg1 from '@/assets/images/01.jpg'
import logo1 from '@/assets/images/logo-icon-64.png'

const minutes = ref(0)
const remainingSeconds = ref(0)

let intervalId = null
let seconds = 3599

const calculateTimeRemaining = () => {

    const mins = Math.round((seconds - 30) / 60)
    const secs = seconds % 60

    minutes.value = mins
    remainingSeconds.value = secs < 10 ? `0${secs}` : secs

    if (seconds === 0) {
        clearInterval(intervalId)
    } else {
        seconds = seconds - 1
    }
}

onMounted(() => {

    document.documentElement.setAttribute('dir', 'ltr')
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')

    calculateTimeRemaining()

    intervalId = setInterval(() => {
        calculateTimeRemaining()
    }, 1000)
})

onUnmounted(() => {
    clearInterval(intervalId)
})
</script>