<template>
    <div class="container-fluid relative px-3">
        <div class="layout-specing">
            <div class="md:flex justify-between items-center">
                <h5 class="text-lg font-semibold">Reviews</h5>

                <ul class="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                    <li class="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-primary dark:hover:text-white"><RouterLink to="/">Hously</RouterLink></li>
                    <li class="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i class="ri-arrow-right-s-line"></i></li>
                    <li class="inline-block capitalize text-[16px] font-medium text-primary dark:text-white" aria-current="page">Review</li>
                </ul>
            </div>

            <div class="lg:columns-4 md:columns-3 sm:columns-2 columns-1 gap-4">
                <div v-for="(item, index) in reviewData" :key="index" class=" mb-4 break-inside-avoid">
                    <div class="bg-white dark:bg-slate-900 rounded-lg shadow-sm shadow-gray-200 dark:shadow-gray-800 p-6">
                        <div class="flex items-center pb-6 border-b border-gray-100 dark:border-gray-800">
                            <img :src="item.image" class="size-16 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-800" alt=""/>

                            <div class="ps-4">
                                <RouterLink to="" class="text-lg hover:text-primary duration-500 ease-in-out">{{item.name}}</RouterLink>
                                <p class="text-slate-400">{{item.title}}</p>
                            </div>
                        </div>

                        <div class="mt-6">
                            <p class="text-slate-400">{{item.desc}}</p>
                            <ul class="list-none mb-0 text-amber-400 mt-2">
                                <li class="inline"><i class="ri-star-s-fill"></i></li>
                                <li class="inline"><i class="ri-star-s-fill"></i></li>
                                <li class="inline"><i class="ri-star-s-fill"></i></li>
                                <li class="inline"><i class="ri-star-s-fill"></i></li>
                                <li class="inline"><i class="ri-star-s-fill"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reviewData } from "@/data/data";
</script>