<template>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-7.5">
        <div v-for="(item, index) in properties" :key="index" class="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
            <div class="relative">
                <img :src="item.image" alt="" />

                <div class="absolute top-4 inset-e-4">
                    <RouterLink to="#" class="btn btn-icon bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-full! text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"><i class="ri-heart-fill text-lg"></i></RouterLink>
                </div>
            </div>

            <div class="p-6">
                <div class="pb-6">
                    <RouterLink :to="`/property-detail/${item.id}`" class="text-lg hover:text-primary font-medium ease-in-out duration-500">{{item.name}}</RouterLink>
                </div>

                <ul class="py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none">
                    <li class="flex items-center me-4">
                        <Maximize class="text-2xl me-2 text-primary"/><i ></i>
                        <span>{{ formatArea(item.square) }}</span>
                    </li>

                    <li class="flex items-center me-4">
                        <Bed class="text-2xl me-2 text-primary"/>
                        <span>{{item.beds}} Beds</span>
                    </li>

                    <li class="flex items-center">
                        <Bath class="text-2xl me-2 text-primary"/>
                        <span>{{item.baths}} Baths</span>
                    </li>
                </ul>

                <ul class="pt-6 flex justify-between items-center list-none">
                    <li>
                        <span class="text-slate-400">Price</span>
                        <p class="text-lg font-medium">{{ formatAed(item.price) }}</p>
                    </li>

                    <li>
                        <span class="text-slate-400">Rating</span>
                        <ul class="text-lg font-medium text-amber-400 list-none">
                            <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                            <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                            <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                            <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                            <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                            <li class="inline ms-1 text-slate-900 dark:text-white">{{item.rating}}(30)</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { formatAed, formatArea } from '@/config/uae'
import { properties } from "./data/data";

import {
    Bath,
    Maximize,
    Bed
} from 'lucide-vue-next'
</script>