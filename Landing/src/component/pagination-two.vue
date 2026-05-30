<template>
    <div :class="gridClass">
        <div v-for="(item, index) in paginatedItems" :key="index" class="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 w-full mx-auto">
            <div class="md:flex">
                <div class="relative md:shrink-0">
                    <img class="h-full w-full object-cover md:w-48" :src="item.image" alt="" />
                    <div class="absolute top-4 inset-e-4">
                        <RouterLink to="#" class="btn btn-icon bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-full! text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"><i class="ri-heart-fill text-lg"></i></RouterLink>
                    </div>
                </div>
                <div class="p-6 w-full">
                    <div class="md:pb-4 pb-6">
                        <RouterLink :to="`/property-detail/${item.id}`" class="text-lg hover:text-primary font-medium ease-in-out duration-500">{{item.name}}</RouterLink>
                    </div>

                    <ul class="md:py-4 py-6 border-y border-slate-100 dark:border-gray-800 flex items-center justify-between list-none">
                        <li class="flex items-center me-4">
                            <Maximize class="text-2xl me-2 text-primary"/>
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

                    <ul class="md:pt-4 pt-6 flex justify-between items-center list-none">
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
    </div>
    <div class="grid md:grid-cols-12 grid-cols-1 mt-8">
        <div class="md:col-span-12 text-center">
            <nav>
                <ul class="inline-flex items-center -space-x-px">
                    <li>
                        <RouterLink to="#" class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">
                            <ChevronLeft />
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="#" class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">1</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="#" class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">2</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="#" aria-current="page" class="z-10 size-10 inline-flex justify-center items-center mx-1 rounded-full text-white bg-primary shadow-sm shadow-gray-200 dark:shadow-gray-700">3</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="#" class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">4</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="#" class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">
                            <ChevronRight/>
                        </RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { formatAed, formatArea } from '@/config/uae'
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import {
    Bed,
    ChevronLeft,
    ChevronRight,
    Bath,
    Maximize
} from 'lucide-vue-next'

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    itemsPerPage: {
        type: Number,
        default: 6
    },
    gridClass: {
        type: String,
        default: ''
    }
})

const currentPage = ref(1)

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * props.itemsPerPage
    const end = start + props.itemsPerPage

    return props.items.slice(start, end)
})
</script>