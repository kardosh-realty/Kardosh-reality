<template>
    <section class="relative h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-800">
        <div class="container">
            <div class="md:flex justify-center">
                <div class="lg:w-2/5">
                    <div class="relative overflow-hidden rounded-md bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800">
                        <div class="px-6 py-12 bg-primary text-center">
                            <i class="ri-checkbox-circle-line text-white text-8xl"></i>
                            <h5 class="text-white text-xl tracking-wide uppercase font-semibold mt-2">Success</h5>
                        </div>

                        <div class="px-6 py-12 text-center">
                            <p class="text-slate-900 font-semibold text-xl dark:text-white">Congratulations! 🎉</p> 
                            <p class="text-slate-400 mt-4">Your account has been successfully created. <br/> Enjoy your journey. Thank you</p>
                            
                            <div class="mt-6">
                                <RouterLink to="/" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-greenbg-primary-dark text-white rounded-md">Continue</RouterLink>
                            </div>
                        </div>

                        <div class="text-center p-6 border-t border-gray-100 dark:border-gray-700">
                            <p class="mb-0 text-slate-400 font-medium">© {{ year }} Hously. Design with <i class="ri-heart-fill text-red-600"></i> by <a href="https://shreethemes.in/" target="_blank" class="text-reset">Shreethemes</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Switcher/>
</template>

<script setup>
import Switcher from '@/components/switcher.vue';

const year = new Date().getFullYear()
</script>