<template>
    <div class="grid lg:grid-cols-12 grid-cols-1 items-center mt-8 gap-7.5">
        <div class="lg:col-span-4">
            <div class="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-7.5">
                <div v-for="(item, index) in data.slice(0, 2)" :key="index" class="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center">
                    <div class="relative overflow-hidden text-transparent -m-3">
                        <Hexagon class="size-32 fill-primary/5 mx-auto"/>
                        <div class="absolute top-2/4 -translate-y-2/4 inset-s-0 inset-e-0 mx-auto text-primary rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                            <i :class="item.icon"></i>
                        </div>
                    </div>

                    <div class="mt-6">
                        <RouterLink to="#" class="text-xl hover:text-primary font-medium">{{item.title}}</RouterLink>
                        <p class="text-slate-400 mt-3">{{item.desc}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="lg:col-span-4">
            <div class="rounded-full shadow-lg dark:shadow-gray-800 relative overflow-hidden border-8 border-white dark:border-slate-900">
                <div class="grid grid-cols-1 relative">
                    <div class="tiny-single">
                        <Swiper
                            :modules="[Autoplay]"
                            :space-between="12"
                            :slides-per-view="1"
                            :speed="400"
                            :dir="attrs.dir || 'ltr'"
                            :autoplay="{
                                delay: 3000,
                                disableOnInteraction: false
                            }"
                            :grabCursor="true"
                        >
                            <SwiperSlide
                                v-for="(item, index) in images"
                                :key="index"
                            >
                                <img :src="item" class="object-cover w-full lg:h-150 md:h-96 h-125" alt=""/>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>

        <div class="lg:col-span-4">
            <div class="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-7.5">
                <div v-for="(item, index) in data.slice(2, 4)" :key="index" class="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center">
                    <div class="relative overflow-hidden text-transparent -m-3">
                        <Hexagon class="size-32 fill-primary/5 mx-auto"/>
                        <div class="absolute top-2/4 -translate-y-2/4 inset-s-0 inset-e-0 mx-auto text-primary rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                            <i :class="item.icon"></i>
                        </div>
                    </div>

                    <div class="mt-6">
                        <RouterLink to="#" class="text-xl hover:text-primary font-medium">{{item.title}}</RouterLink>
                        <p class="text-slate-400 mt-3">{{item.desc}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

import { Hexagon } from 'lucide-vue-next'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'

import bg1 from '@/assets/images/property/1.jpg'
import bg2 from '@/assets/images/property/2.jpg'
import bg3 from '@/assets/images/property/3.jpg'

const images = [bg1, bg2, bg3]

import { useAttrs } from 'vue'

const attrs = useAttrs()

const data = [
    {
        icon: 'ri-heart-2-fill',
        title: 'Comfortable',
        desc: `If the distribution of letters and 'words' is random, the reader will not be distracted from making.`
    },
    {
        icon: 'ri-shield-flash-fill',
        title: 'Extra Security',
        desc: `If the distribution of letters and 'words' is random, the reader will not be distracted from making.`
    },
    {
        icon: 'ri-star-s-fill',
        title: 'Luxury',
        desc: `If the distribution of letters and 'words' is random, the reader will not be distracted from making.`
    },
    {
        icon: 'ri-money-dollar-circle-line',
        title: 'Best Price',
        desc: `If the distribution of letters and 'words' is random, the reader will not be distracted from making.`
    },
]
</script>