<template>
    <section class="md:h-screen py-36 flex items-center justify-center relative overflow-hidden zoom-image">
        <div :style="{backgroundImage: `url(${BackgroundImage})`}" class="absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover"></div>
        <div class="absolute inset-0 bg-linear-to-b from-transparent to-slate-900 z-2"></div>
        <div class="container relative z-3 text-center">

            <div class="grid grid-cols-1">
                <BrandLogo variant="full" size="hero" img-class="mx-auto block" />
                <h1 class="text-white mb-6 mt-8 md:text-5xl text-3xl font-bold">We Are Back Soon...</h1>
                <p class="text-white/70 text-lg max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>
            <div class="grid grid-cols-1 mt-10">
                <div class="text-center">
                    <span id="maintenance" class="timer text-white text-[56px] tracking-[1px]"> {{ minutes }}:{{ remainingSeconds }}</span>
                    <span class="block text-base font-semibold uppercase text-white">Minutes</span>
                </div>
            </div>
            <div class="grid grid-cols-1 mt-8">
                <div class="text-center subcribe-form">
                    <form class="relative mx-auto max-w-xl">
                        <input type="email" id="subemail" name="name" class="pt-4 pe-40 pb-4 ps-6 w-full h-12.5 outline-none text-slate-900 dark:text-white rounded-full bg-white/70 dark:bg-slate-900/70 border border-gray-200 dark:border-gray-700" placeholder="Enter your email id.." />
                        <button type="submit" class="btn absolute top-0.5 inset-e-0.75 h-11.5 bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-full">Subcribe Now</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <Switcher />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import Switcher from "@/component/switcher.vue";

import BrandLogo from '@/component/kardosh/BrandLogo.vue'
import BackgroundImage from "@/assets/images/bg/01.jpg";

const minutes = ref(0)
const remainingSeconds = ref(0)

let intervalId = null

onMounted(() => {
    let seconds = 3599

    const calculateTimeRemaining = () => {
        minutes.value = Math.round((seconds - 30) / 60)
        remainingSeconds.value = seconds % 60

        if (seconds === 0) {
            clearInterval(intervalId)
        } else {
            seconds--
        }
    }

    calculateTimeRemaining()

    intervalId = setInterval(() => {
        calculateTimeRemaining()
    }, 1000)
})

onBeforeUnmount(() => {
    clearInterval(intervalId)
})
</script>