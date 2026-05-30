<template>
    <section class="relative bg-primary/5">
        <div class="container-fluid relative">
            <div class="grid grid-cols-1">
                <div class="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
                    <div class="text-center">
                        <RouterLink to="/" class="block mx-auto w-fit"><BrandLogo variant="full" size="hero" /></RouterLink>
                    </div>
                    <div class="title-heading text-center my-auto">
                        <img :src="ErrorImage" class="mx-auto" alt="" />
                        <h1 class="mt-3 mb-6 md:text-4xl text-3xl font-bold">Page Not Found?</h1>
                        <p class="text-slate-400">Whoops, this is embarassing. <br /> Looks like the page you were looking for wasn't found.</p>

                        <div class="mt-4">
                            <RouterLink to="/" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md">Back to Home</RouterLink>
                        </div>
                    </div>
                    <div class="text-center">
                        <p class="mb-0 text-slate-400">© {{ year }} Kardosh Realty. Design & Develop by <a href="https://logixcontact.com/" target="_blank" rel="noopener noreferrer" class="text-reset">Logix Contact</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Switcher />
</template>

<script setup>
import Switcher from "@/component/switcher.vue";

import BrandLogo from '@/component/kardosh/BrandLogo.vue'
import ErrorImage from "@/assets/images/error.png";

const year = new Date().getFullYear()
</script>