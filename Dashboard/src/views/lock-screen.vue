<template>
    <section class="h-screen flex items-center justify-center relative overflow-hidden bg-no-repeat bg-center bg-cover" :style="{backgroundImage: `url(${bg1})`}">
        <div class="absolute inset-0 bg-linear-to-b from-transparent to-slate-900"></div>
        <div class="container relative">
            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                <div class="p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
                    <div class="text-center">
                        <img :src="client" class="mx-auto size-20 rounded-full shadow-sm  dark:shadow-gray-800" alt=""/>
                        <h5 class="mb-6 mt-4 text-xl font-semibold">Calvin Carlo</h5>
                    </div>
                    <form>
                        <div class="grid grid-cols-1">
                            <div class="mb-4 ltr:text-left rtl:text-right">
                                <label class="font-semibold" for="LoginPassword">Password:</label>
                                <input id="LoginPassword" type="password" class="form-input border border-gray-200! dark:border-gray-800! mt-3 rounded-md" required="" placeholder="Password:"/>
                            </div>

                            <div class="flex justify-between mb-4">
                                <div class="inline-flex items-center mb-0">
                                    <input class="form-checkbox size-4 appearance-none rounded-sm border border-gray-200 dark:border-gray-800 accent-primary checked:appearance-auto dark:accent-primary focus:border-green-300 focus:ring-0 focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="RememberMe"/>
                                    <label class="form-checkbox-label text-slate-400" for="RememberMe">Remember me</label>
                                </div>
                                <p class="text-slate-400 mb-0"><RouterLink to="/reset-password" class="text-slate-400">Forgot password ?</RouterLink></p>
                            </div>

                            <div class="mb-4">
                                <input type="submit" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md w-full" value="Login / Sign in"/>
                            </div>
                        </div>
                    </form>
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

import bg1 from '@/assets/images/01.jpg'
import client from '@/assets/images/client/07.jpg'
</script>