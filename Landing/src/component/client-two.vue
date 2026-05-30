<template>
    <div class="container lg:mt-24 mt-16">
        <div class="grid grid-cols-1 pb-8 text-center">
            <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">What Our Client Say ?</h3>

            <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
        </div>

        <div class="flex justify-center relative mt-8">
            <div class="relative w-full">
                <div class="tiny-three-item">
                    <Swiper
                        :modules="[Autoplay, Pagination]"
                        :space-between="12"
                        :slides-per-view="1"
                        :speed="400"
                        :autoplay="{
                            delay: 3000,
                            disableOnInteraction: false
                        }"
                        :pagination="pagination"
                        :dir="attrs.dir || 'ltr'"
                        :breakpoints="{
                            320: { slidesPerView: 1 },
                            767: { slidesPerView: 2 },
                            992: { slidesPerView: 3 }
                        }"
                        :grab-cursor="true"
                    >
                        <SwiperSlide v-for="(el, index) in review" :key="index">
                            <div class="text-center mx-3">
                                <p class="text-lg text-slate-400 italic"> " {{el.description}} " </p>

                                <div class="text-center mt-5">
                                    <ul class="text-xl font-medium text-amber-400 list-none mb-2">
                                        <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                                        <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                                        <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                                        <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                                        <li class="inline ms-1"><i class="ri-star-s-fill"></i></li>
                                    </ul>

                                    <img :src="el.profile" class="size-14 rounded-full shadow-md shadow-gray-200 dark:shadow-gray-700 mx-auto" alt="" />
                                    <h6 class="mt-2 fw-semibold">{{el.name}}</h6>
                                    <span class="text-slate-400 text-sm">{{el.designation}}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    
                    <!-- DOTS -->
                    <div class="custom-pagination flex justify-center mt-6"></div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"

import { review } from "./data/data"

import { useAttrs } from 'vue'

const attrs = useAttrs()

const pagination = {
    el: ".custom-pagination",
    clickable: true
}
</script>