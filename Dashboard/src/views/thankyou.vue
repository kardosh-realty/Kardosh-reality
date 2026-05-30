<template>
    <section class="relative h-screen flex items-center justify-center text-center bg-gray-50 dark:bg-slate-800">
        <div class="container relative">
            <div class="grid grid-cols-1">
                <div class="title-heading text-center my-auto">
                    <div class="size-24 bg-primary/5 text-primary rounded-md flex align-middle justify-center items-center shadow-xs dark:shadow-gray-800 mx-auto">
                        <ThumbsUp class="size-10"/>
                    </div>
                    <h1 class="mt-6 mb-8 md:text-5xl text-3xl font-bold">Thank You</h1>
                    <p class="text-slate-400 max-w-xl mx-auto">We are a huge marketplace dedicated to connecting great artists of all Hously with their fans and unique token collectors!</p>
                    
                    <div class="mt-6">
                        <RouterLink to="/" class="btn bg-primary/5 hover:bg-primary border-primary/10 hover:border-primary text-primary hover:text-white rounded-md">Back to Home</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Switcher />
    <BackToHome />
</template>

<script setup>
import Switcher from '@/components/switcher.vue';
import BackToHome from '@/components/back-to-home.vue';

import { ThumbsUp } from 'lucide-vue-next'
</script>