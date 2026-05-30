<template>
    <section class="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
        <div :style="{backgroundImage: `url(${BackgroudImage})`}" class="absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover"></div>
            <div class="absolute inset-0 bg-linear-to-b from-transparent to-slate-900 z-2"></div>
        <div class="container z-3">
            <div class="flex justify-center">
                <div class="max-w-100 w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md shadow-gray-200 dark:shadow-gray-700 rounded-md">
                    <RouterLink to="/" class="block mx-auto w-fit"><BrandLogo variant="icon" size="lg" /></RouterLink>
                    <h5 class="my-6 text-xl font-semibold">Reset Your Password</h5>
                    <div class="grid grid-cols-1">
                        <p class="text-slate-400 mb-6">Please enter your email address. You will receive a link to create a new password via email.</p>
                        <form class="text-start">
                            <div class="grid grid-cols-1">
                                <div class="mb-4">
                                    <label class="font-medium" for="LoginEmail">Email Address:</label>
                                    <input id="LoginEmail" type="email" class="form-input border border-gray-200! dark:border-gray-800! mt-3" placeholder="name@example.com" />
                                </div>

                                <div class="mb-4">
                                    <RouterLink to="#" class="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full">Send</RouterLink>
                                </div>

                                <div class="text-center">
                                    <span class="text-slate-400 me-2">Remember your password ? </span><RouterLink to="/auth-login" class="text-slate-900 dark:text-white font-bold">Sign in</RouterLink>
                                </div>
                            </div>
                        </form>
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
import BackgroudImage from "@/assets/images/bg/01.jpg";
</script>