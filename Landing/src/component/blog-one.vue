<template>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-7.5">
        <div v-for="(item, index) in blogs" :key="index" class="group relative h-fit hover:-mt-1.25 overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow-sm shadow-gray-200 dark:shadow-gray-700 transition-all duration-500">
            <div class="relative overflow-hidden">
                <img :src="item.image" class="" alt=""/>
                <div class="absolute inset-e-4 top-4">
                    <span class="bg-primary text-white text-[14px] px-2.5 py-1 font-medium rounded-full h-5">{{item.type}}</span>
                </div>
            </div>

            <div class="relative p-6">
                <div class="">
                    <div class="flex justify-between mb-4">
                        <span class="text-slate-400 text-sm inline-flex"><Calendar :style="{ width: 14,height:14 }" class="ri-calendar-2-line text-slate-900 dark:text-white me-2"/>{{item.date}}</span>
                        <span class="text-slate-400 text-sm inline-flex ms-3"><Clock3 :style="{ width: 14,height:14 }" class="ri-time-line text-slate-900 dark:text-white me-2"/>5 min read</span>
                    </div>

                    <RouterLink :to="`/blog-detail/${item.id}`" class="title text-xl font-medium hover:text-primary duration-500 ease-in-out">{{item.title}}</RouterLink>
                    
                    <div class="mt-3">
                        <RouterLink :to="`/blog-detail/${item.id}`" class="btn btn-link hover:text-primary after:bg-primary duration-500 ease-in-out">Read More <ArrowRight :style="{ width: 17,height:17 }" class="ri-arrow-right-s-line"/></RouterLink>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { blogList } from './data/data'

import {
    ArrowRight,
    Calendar,
    Clock3
} from 'lucide-vue-next'

const blogs = computed(() => blogList.slice(0, 3))
</script>