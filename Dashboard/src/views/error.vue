<template>
    <section class="relative bg-primary/5">
        <div class="container-fluid relative">
            <div class="grid grid-cols-1">
                <div class="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
                    <div class="text-center">
                        <RouterLink to="/" class="flex justify-center">
                            <BrandLogo variant="icon" size="lg" />
                        </RouterLink>
                    </div>
                    <div class="title-heading text-center my-auto">
                        <img :src="error" class="mx-auto" alt=""/>
                        <h1 class="mt-3 mb-6 md:text-4xl text-3xl font-bold">Page Not Found?</h1>
                        <p class="text-slate-400">Whoops, this is embarassing. <br/> Looks like the page you were looking for wasn't found.</p>
                        
                        <div class="mt-4">
                            <RouterLink to="/" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md">Back to Home</RouterLink>
                        </div>
                    </div>
                    <div class="text-center">
                        <p class="mb-0 text-slate-400">© {{ year }} {{ BRAND.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <BackToHome />
</template>

<script setup>
import BackToHome from '@/components/back-to-home.vue';

import BrandLogo from '@/components/BrandLogo.vue'
import { BRAND } from '@/config/brand'
import error from '@/assets/images/error.png'

const year = new Date().getFullYear()
</script>