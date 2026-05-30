<template>
    <div class="container-fluid relative px-3">
        <div class="layout-specing">
            <div class="md:flex justify-between items-center">
                <h5 class="text-lg font-semibold">Pricing</h5>

                <ul class="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                    <li class="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-primary dark:hover:text-white"><RouterLink to="/">Hously</RouterLink></li>
                    <li class="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i class="ri-arrow-right-s-line"></i></li>
                    <li class="inline-block capitalize text-[16px] font-medium text-primary dark:text-white" aria-current="page">Pricing</li>
                </ul>
            </div>

            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
                <div v-for="(item, index) in pricingData" :key="index" class="rounded-md bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 hover:shadow-md dark:hover:shadow-gray-700 duration-500 ease-in-out">
                    <div class="border-b border-gray-200! dark:border-gray-800! p-6 text-center">
                        <div class="size-24 bg-primary/5 text-primary flex items-center justify-center text-3xl rounded-full mx-auto">
                            <i :class="item.icon"></i>
                        </div>

                        <h3 class="text-2xl text-primary font-medium mt-4">{{item.title}}</h3>
                    
                        <div class="flex justify-center mt-4">
                            <span class="text-xl">AED </span>
                            <span class="text-3xl font-semibold">{{item.amount}}</span>
                            <span class="text-xl self-end">/month</span>
                        </div>
                    </div>

                    <div class="p-6">
                        <h5>Pricing Features:</h5>

                        <ul class="list-none">
                            <li v-for="(el, i) in item.feature" :key="i" class="text-slate-400 mt-2 ms-0">
                                <span class="text-primary text-lg me-2">
                                    <i class="ri-checkbox-circle-line"></i>
                                </span>
                                {{el}}
                            </li>
                        </ul>
                        
                        <RouterLink to="" class="btn bg-primary hover:bg-primary-dark border-primary dark:border-primary text-white rounded-md w-full mt-4">Get Started</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { pricingData } from "@/data/data";
</script>