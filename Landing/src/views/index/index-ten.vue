<template>
    <Navbar />

    <section class="relative py-24">
        <div class="absolute inset-0 opacity-40 dark:opacity-[0.03] bg-no-repeat bg-bottom bg-cover" :style="{backgroundImage: `url(${map})`}"></div>
        <div class="container relative mt-10">
            <div class="grid md:grid-cols-12 grid-cols-1 items-center gap-7.5">
                <div class="md:col-span-4">
                    <div class="md:text-start text-center">
                        <h1 class="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl">Let's Find a Home That's Perfect For You!</h1>

                        <div class="mt-4">
                            <RouterLink to="#" class="btn bg-primary hover:bg-primary-dark text-white rounded-md md:mt-20">Learn More <i class="ri-arrow-right-s-line ms-1 align-middle"></i></RouterLink>
                        </div>
                    </div>
                </div>

                <div class="md:col-span-5">
                    <div class="rounded-full shadow-lg dark:shadow-gray-800 relative overflow-hidden border-8 border-white dark:border-slate-900">
                        <div class="grid grid-cols-1 relative">
                            <div class="tiny-single">
                                <Swiper
                                    :modules="[Autoplay]"
                                    :space-between="12"
                                    :slides-per-view="1"
                                    :speed="400"
                                    :grabCursor="true"
                                    :dir="attrs.dir || 'ltr'"
                                    :autoplay="{
                                        delay: 3000,
                                        disableOnInteraction: false
                                    }"
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

                <div class="md:col-span-3">
                    <div class="md:text-end text-center">
                        <p class="text-slate-400 text-xl max-w-xl">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>

                        <div class="mt-4">
                            <ul class="list-none relative md:mt-20">
                                <li class="inline-block relative"><RouterLink to="#"><img :src="client1" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></RouterLink></li>
                                <li class="inline-block relative -ms-4"><RouterLink to="#"><img :src="client2" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></RouterLink></li>
                                <li class="inline-block relative -ms-4"><RouterLink to="#"><img :src="client3" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></RouterLink></li>
                                <li class="inline-block relative -ms-4"><RouterLink to="#"><img :src="client4" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></RouterLink></li>
                                <li class="inline-block relative -ms-4"><RouterLink to="#"><img :src="client5" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></RouterLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Partner />
    </section>

    <section class="relative md:pb-24 pb-16">
        <div class="container relative">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">What We Do?</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-7.5">
                
                <div v-for="(item, index) in aboutData" :key="index" class="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-transparent overflow-hidden text-center">
                    <div class="relative overflow-hidden text-transparent -m-3">
                        <Hexagon class="size-32 fill-primary/5 mx-auto"/>
                        <div class="absolute top-2/4 -translate-y-2/4 inset-s-0 inset-e-0 mx-auto text-primary rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                            <img :src="item.image" class="size-12" alt=""/>
                        </div>
                    </div>

                    <div class="mt-6">
                        <RouterLink to="#" class="text-xl font-medium hover:text-primary">{{item.title}}</RouterLink>
                        <p class="text-slate-400 mt-3">{{item.desc}}</p>

                        <div class="mt-4">
                            <RouterLink to="" class="btn btn-link text-primary hover:text-primary after:bg-primary transition duration-500">Read More <ArrowRight :style="{ width: 17,height:17 }" class="ms-1"/></RouterLink>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <About />

        <div class="container relative md:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Listing Categories</h3>

                <p class="text-slate-400 max-w-xl">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <Categories />
        </div>

        <Property />

        <ClientTwo />

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <TeamOne />
        </div>

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Latest Blogs & News</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <BlogOne />
        </div>

        <GetInTuch />
    </section>

    <Footer />
    <Switcher />
</template>

<script setup>
import Navbar from '@/component/navbar.vue';
import Partner from '@/component/partner.vue';
import About from '@/component/about.vue';
import Categories from '@/component/categories.vue';
import Property from '@/component/Properties/property.vue';
import ClientTwo from '@/component/client-two.vue';
import TeamOne from '@/component/team-one.vue';
import BlogOne from '@/component/blog-one.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'

import { aboutData } from '../../component/data/data'

import { Hexagon, ArrowRight } from 'lucide-vue-next'

import map from '@/assets/images/map.svg'
import property1 from '@/assets/images/property/1.jpg'
import property2 from '@/assets/images/property/2.jpg'
import property3 from '@/assets/images/property/3.jpg'

import client1 from '@/assets/images/client/01.jpg'
import client2 from '@/assets/images/client/02.jpg'
import client3 from '@/assets/images/client/03.jpg'
import client4 from '@/assets/images/client/04.jpg'
import client5 from '@/assets/images/client/05.jpg'

import { useAttrs } from 'vue'

const attrs = useAttrs()

const images = [property1,property2,property3]
</script>