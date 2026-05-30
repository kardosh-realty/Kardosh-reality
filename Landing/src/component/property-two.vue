<template>
    <div class="container lg:mt-24 mt-16">
        <div class="grid grid-cols-1 pb-8 text-center">
            <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Featured Properties</h3>

            <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
        </div>

        <div class="grid grid-cols-1 mt-8 relative">
            <div class="tiny-home-slide-three">
                <Swiper
                    :modules="[Autoplay]"
                    :space-between="12"
                    :slides-per-view="1"
                    :speed="400"
                    :autoplay="{
                        delay: 3000,
                        disableOnInteraction: false
                    }"
                    :breakpoints="{
                        320: { slidesPerView: 1 },
                        767: { slidesPerView: 2 },
                        992: { slidesPerView: 3 }
                    }"
                    :dir="attrs.dir || 'ltr'"
                    grab-cursor
                >
                    <SwiperSlide v-for="(item, index) in properties" :key="index">
                        <div class="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-md dark:hover:shadow-md shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 m-3">
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
                                        <Expand class="text-2xl me-2 text-primary"/>
                                        <span>{{ '185 sqm' }}</span>
                                    </li>

                                    <li class="flex items-center me-4">
                                        <BedDouble class="text-2xl me-2 text-primary"/>
                                        <span>4 Beds</span>
                                    </li>

                                    <li class="flex items-center">
                                        <Bath class="text-2xl me-2 text-primary"/>
                                        <span>4 Baths</span>
                                    </li>
                                </ul>

                                <ul class="pt-6 flex justify-between items-center list-none">
                                    <li>
                                        <span class="text-slate-400">Price</span>
                                        <p class="text-lg font-medium">AED 2,850,000</p>
                                    </li>

                                    <li>
                                        <span class="text-slate-400">Rating</span>
                                        <ul class="text-lg font-medium text-amber-400 list-none">
                                            <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                                            <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                                            <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                                            <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                                            <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                                            <li class="inline ms-1 text-slate-900 dark:text-white">5.0(30)</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </div>
</template>

<script setup>
import { formatAed, formatArea } from '@/config/uae'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import { RouterLink } from 'vue-router'

import { properties } from './data/data'

import { useAttrs } from 'vue'

const attrs = useAttrs()

import {
    Bath,
    BedDouble,
    Expand
} from 'lucide-vue-next'
</script>