<template>
    <div class="container-fluid relative px-3">
        <div class="layout-specing">
            <div class="md:flex justify-between items-center">
                <h5 class="text-lg font-semibold">Explore Properties</h5>

                <ul class="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                    <li class="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-primary dark:hover:text-white"><RouterLink to="/">{{ BRAND.name }}</RouterLink></li>
                    <li class="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i class="ri-arrow-right-s-line"></i></li>
                    <li class="inline-block capitalize text-[16px] font-medium text-primary dark:text-white" aria-current="page">Properties</li>
                </ul>
            </div>

            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
                <div v-for="(item, index) in propertiesData" :key="index" class="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
                    <div class="relative">
                        <img :src="item.image" alt=""/>

                        <div class="absolute top-4 inset-e-4">
                            <RouterLink to="#" class="btn btn-icon bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-full! text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"><i class="ri-heart-fill text-[20px]"></i></RouterLink>
                        </div>
                    </div>

                    <div class="p-6">
                        <div class="pb-6">
                            <RouterLink :to="`/property-detail/${item.id}`" class="text-lg hover:text-primary font-medium ease-in-out duration-500">{{item.name}}</RouterLink>
                        </div>

                        <ul class="py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none">
                            <li class="flex items-center me-4">
                                <i class="ri-expand-diagonal-line text-2xl me-2 text-primary"></i>
                                <span>{{item.sqf}}</span>
                            </li>

                            <li class="flex items-center me-4">
                                <i class="ri-layout-4-line text-2xl me-2 text-primary"></i>
                                <span>{{item.beds}}</span>
                            </li>

                            <li class="flex items-center">
                                <i class="ri-shape-line text-2xl me-2 text-primary"></i>
                                <span>{{item.baths}}</span>
                            </li>
                        </ul>

                        <ul class="pt-6 flex justify-between items-center list-none">
                            <li>
                                <span class="text-slate-400">Price</span>
                                <p class="text-lg font-medium">{{item.value}}</p>
                            </li>

                            <li>
                                <span class="text-slate-400">Rating</span>
                                <ul class="text-lg font-medium text-amber-400 list-none">
                                    <li class="inline me-1"><i class="ri-star-s-fill"></i></li>
                                    <li class="inline me-1"><i class="ri-star-s-fill"></i></li>
                                    <li class="inline me-1"><i class="ri-star-s-fill"></i></li>
                                    <li class="inline me-1"><i class="ri-star-s-fill"></i></li>
                                    <li class="inline me-1"><i class="ri-star-s-fill"></i></li>
                                    <li class="inline text-slate-900 dark:text-white">5.0(30)</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-12 grid-cols-1 mt-6">
                <div class="md:col-span-12 text-center">
                    <nav>
                        <ul class="inline-flex items-center -space-x-px">
                            <li>
                                <RouterLink to="#" class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">
                                    <i class="ri-arrow-left-s-line text-[20px]"></i>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="#" class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">1</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="#" class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">2</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="#" aria-current="page" class="z-10 size-10 inline-flex justify-center items-center mx-1 rounded-full text-white bg-primary shadow-xs shadow-gray-200 dark:shadow-gray-700">3</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="#" class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">4</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="#" class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">
                                    <i class="ri-arrow-right-s-line text-[20px]"></i>
                                </RouterLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { BRAND } from '@/config/brand'
import { propertiesData } from '@/data/data'
</script>