<template>
    <section class="h-screen flex items-center justify-center relative overflow-hidden bg-no-repeat bg-center bg-cover" :style="{backgroundImage: `url(${bg1})`}">
        <div class="absolute inset-0 bg-linear-to-b from-transparent to-slate-900"></div>
        <div class="container">
            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                <div class="relative overflow-hidden bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
                    <div class="p-6">
                        <RouterLink to="">
                            <img :src="logoDark" class="mx-auto block dark:hidden" alt=""/>
                            <img :src="logoLight" class="mx-auto dark:block hidden" alt=""/>
                        </RouterLink>
                        <h5 class="my-6 text-xl font-semibold">Signup</h5>
                        <form class="text-start">
                            <div class="grid grid-cols-1">
                                <div class="mb-4">
                                    <label class="font-semibold" for="RegisterName">Your Name:</label>
                                    <input id="RegisterName" type="text" class="form-input border border-gray-200! dark:border-gray-800! mt-3" placeholder="Harry"/>
                                </div>

                                <div class="mb-4">
                                    <label class="font-semibold" for="LoginEmail">Email Address:</label>
                                    <input id="LoginEmail" type="email" class="form-input border border-gray-200! dark:border-gray-800! mt-3" placeholder="name@example.com"/>
                                </div>

                                <div class="mb-4">
                                    <label class="font-semibold" for="LoginPassword">Password:</label>
                                    <input id="LoginPassword" type="password" class="form-input border border-gray-200! dark:border-gray-800! mt-3" placeholder="Password:"/>
                                </div>

                                <div class="mb-4">
                                    <div class="flex items-center mb-0">
                                        <input class="form-checkbox size-4 appearance-none rounded-sm border border-gray-200 dark:border-gray-800 accent-primary checked:appearance-auto dark:accent-primary focus:border-green-300 focus:ring-0 focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="AcceptT&C"/>
                                        <label class="form-check-label text-slate-400" for="AcceptT&C">I Accept <RouterLink to="" class="text-primary">Terms And Condition</RouterLink></label>
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <RouterLink to="" class="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full">Register</RouterLink>
                                </div>

                                <div class="text-center">
                                    <span class="text-slate-400 me-2">Already have an account ? </span> <RouterLink to="/login" class="text-slate-900 dark:text-white font-medium">Sign in</RouterLink>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div class="px-6 py-2 bg-slate-50 dark:bg-slate-800 text-center">
                        <p class="mb-0 text-slate-400">© {{ year }} Hously. Designed by <a href="https://shreethemes.in/" target="_blank" class="text-reset">Shreethemes</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <BackToHome />
    <Switcher />
</template>

<script setup>
import BackToHome from '@/components/back-to-home.vue';
import Switcher from '@/components/switcher.vue';

import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png'
import bg1 from '@/assets/images/01.jpg'

const year = new Date().getFullYear()
</script>