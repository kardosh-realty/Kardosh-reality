<template>
    <section class="h-screen flex items-center justify-center relative overflow-hidden bg-no-repeat bg-left-bottom bg-cover" :style="{backgroundImage: `url(${bg1})`}">
        <div class="absolute inset-0 bg-linear-to-b from-transparent to-slate-900"></div>
        <div class="container">
            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                <div class="relative overflow-hidden bg-white dark:bg-slate-900 shadow-md shadow-gray-200 dark:shadow-gray-800 rounded-md">
                    <div class="p-6">
                        <RouterLink to="/" class="flex justify-center">
                            <BrandLogo variant="full" size="auth" />
                        </RouterLink>
                        <h5 class="my-6 text-xl font-semibold">Reset Your Password</h5>
                        <div class="grid grid-cols-1">
                            <p class="text-slate-400 mb-6">Please enter your email address. You will receive a link to create a new password via email.</p>
                            <form class="text-start">
                                <div class="grid grid-cols-1">
                                    <div class="mb-4">
                                        <label class="font-medium" for="LoginEmail">Email Address:</label>
                                        <input id="LoginEmail" type="email" class="form-input border border-gray-200! dark:border-gray-800! mt-3" placeholder="name@example.com"/>
                                    </div>

                                    <div class="mb-4">
                                        <RouterLink to="" class="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full">Send</RouterLink>
                                    </div>

                                    <div class="text-center">
                                        <span class="text-slate-400 me-2">Remember your password ? </span><RouterLink to="/login" class="text-slate-900 dark:text-white font-medium">Sign in</RouterLink>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <div class="px-6 py-2 bg-slate-50 dark:bg-slate-800 text-center">
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
import bg1 from '@/assets/images/01.jpg'

const year = new Date().getFullYear()
</script>