<template>
    <section class="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
        <div :style="{backgroundImage: `url(${BackgroudImage})`}" class="absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover"></div>
            <div class="absolute inset-0 bg-linear-to-b from-transparent to-slate-900 z-2"></div>
        <div class="container z-3">
            <div class="flex justify-center">
                <div class="max-w-100 w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md shadow-gray-200 dark:shadow-gray-700 rounded-md">
                    <RouterLink to="/" class="block mx-auto w-fit"><BrandLogo variant="icon" size="lg" /></RouterLink>
                    <h5 class="my-6 text-xl font-semibold">Login</h5>
                    <form class="text-start">
                        <div class="grid grid-cols-1">
                            <div class="mb-4">
                                <label class="font-medium" for="LoginEmail">Email Address:</label>
                                <input id="LoginEmail" type="email" class="form-input border border-gray-200! dark:border-gray-800! mt-3" placeholder="name@example.com" />
                            </div>

                            <div class="mb-4">
                                <label class="font-medium" for="LoginPassword">Password:</label>
                                <input id="LoginPassword" type="password" class="form-input border border-gray-200! dark:border-gray-800! mt-3" placeholder="Password:" />
                            </div>

                            <div class="flex justify-between mb-4">
                                <div class="inline-flex items-center">
                                    <input class="form-checkbox size-4 appearance-none rounded-sm border border-gray-200 dark:border-gray-800 accent-primary checked:appearance-auto dark:accent-primary focus:border-primary-300 focus:ring-0 focus:ring-offset-0 focus:ring-primary-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="RememberMe" />
                                    <label class="form-check-label text-slate-400" for="RememberMe">Remember me</label>
                                </div>

                                <p class="text-slate-400 mb-0"><RouterLink to="/auth-re-password" class="text-slate-400">Forgot password ?</RouterLink></p>
                            </div>

                            <div class="mb-4">
                                <RouterLink to="#" class="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full">Login / Sign in</RouterLink>
                            </div>

                            <div class="text-center">
                                <span class="text-slate-400 me-2">Don't have an account ?</span> <RouterLink to="/auth-signup" class="text-slate-900 dark:text-white font-bold">Sign Up</RouterLink>
                            </div>
                        </div>
                    </form>
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