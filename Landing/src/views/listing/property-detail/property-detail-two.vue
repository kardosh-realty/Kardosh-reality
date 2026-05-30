<template>
    <Navbar />

    <section class="relative md:py-24 pt-24 pb-16">
        <div class="container relative">
            <div class="grid md:grid-cols-12 grid-cols-1 gap-7.5">
                <div class="lg:col-span-8 md:col-span-7">
                    <div class="grid grid-cols-1 relative">
                        <div class="tiny-one-item">
                            <Swiper
                                :modules="modules"
                                :space-between="12"
                                :slides-per-view="1"
                                :speed="400"
                                :dir="attrs.dir || 'ltr'"
                                :autoplay="{
                                    delay: 3000,
                                    disableOnInteraction: false
                                }"
                                :navigation="{
                                    nextEl: '.swiper-next',
                                    prevEl: '.swiper-prev'
                                }"
                            >
                                <SwiperSlide v-for="(item, index) in images" :key="index">
                                    <img :src="item" class="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                </SwiperSlide>
                            </Swiper>

                            <button class="swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 size-8 bg-white dark:bg-slate-800 rounded-full shadow hover:bg-primary hover:text-white transition cursor-pointer">
                                <i class="ri-arrow-left-s-line text-2xl"></i>
                            </button>

                            <button class="swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 size-8 bg-white dark:bg-slate-800 rounded-full shadow hover:bg-primary hover:text-white transition cursor-pointer">
                                <i class="ri-arrow-right-s-line text-2xl"></i>
                            </button>

                        </div>
                    </div>
                    
                    <h4 class="text-2xl font-medium mt-6 mb-3">4BHK Luxury Family Home</h4>
                    <span class="text-slate-400 flex items-center"><MapPin class="size-5 me-2"/> Apartment 2403, Marina Gate Tower 2, Dubai Marina, Dubai, UAE</span>

                    <ul class="py-6 flex items-center list-none">
                        <li class="flex items-center lg:me-6 me-4">
                            <Expand class="lg:text-3xl text-2xl me-2 text-primary"/>
                            <span class="lg:text-xl">{{ '185 sqm' }}</span>
                        </li>

                        <li class="flex items-center lg:me-6 me-4">
                            <BedDouble class="lg:text-3xl text-2xl me-2 text-primary"/>
                            <span class="lg:text-xl">4 Beds</span>
                        </li>

                        <li class="flex items-center">
                            <Bath class="lg:text-3xl text-2xl me-2 text-primary"/>
                            <span class="lg:text-xl">4 Baths</span>
                        </li>
                    </ul>

                    <p class="text-slate-400">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                    <p class="text-slate-400 mt-4">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p>
                    <p class="text-slate-400 mt-4">Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p>
                
                    <div class="w-full leading-0 border-0 mt-6">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178509925!2d55.2744!3d25.1972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e27a403e6b57!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1!5m2!1sen!2sae" style="border:0" title='myfram' class="w-full h-125" allowFullScreen></iframe>
                    </div>
                </div>

                <div class="lg:col-span-4 md:col-span-5">
                    <div class="sticky top-20">
                        <div class="rounded-md bg-slate-50 dark:bg-slate-800 shadow-sm shadow-gray-200 dark:shadow-gray-700">
                            <div class="p-6">
                                <h5 class="text-2xl font-medium">Price:</h5>

                                <div class="flex justify-between items-center mt-4">
                                    <span class="text-xl font-medium">AED 2,850,000</span>

                                    <span class="bg-primary/10 text-primary text-sm px-2.5 py-0.75 rounded-sm h-6">For Sale</span>
                                </div>

                                <ul class="list-none mt-4">
                                    <li class="flex justify-between items-center">
                                        <span class="text-slate-400 text-sm">Listed on Kardosh Realty</span>
                                        <span class="font-medium text-sm">124 Days</span>
                                    </li>

                                    <li class="flex justify-between items-center mt-2">
                                        <span class="text-slate-400 text-sm">Price per sqm</span>
                                        <span class="font-medium text-sm">AED 15,405</span>
                                    </li>

                                    <li class="flex justify-between items-center mt-2">
                                        <span class="text-slate-400 text-sm">Monthly Payment (estimate)</span>
                                        <span class="font-medium text-sm">AED 14,250/month</span>
                                    </li>
                                </ul>
                            </div>

                            <div class="flex">
                                <div class="p-1 w-1/2">
                                    <RouterLink to="" class="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full">Book Now</RouterLink>
                                </div>
                                <div class="p-1 w-1/2">
                                    <RouterLink to="" class="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full">Offer Now</RouterLink>
                                </div>
                            </div>
                        </div>

                        <div class="mt-12 text-center">
                            <h3 class="mb-6 text-xl leading-normal font-medium text-slate-900 dark:text-white">Have Question ? Get in touch!</h3>

                            <div class="mt-6">
                                <RouterLink to="/contact" class="btn bg-transparent hover:bg-primary border border-primary text-primary hover:text-white rounded-md"><Phone class="align-middle me-2" :style="{ width: 17,height:17 }"/> Contact us</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer/>
    <Switcher/>
</template>

<script setup>
import { formatAed, formatArea } from '@/config/uae'
import Navbar from '@/component/navbar.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import { RouterLink } from 'vue-router'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

import single1 from '@/assets/images/property/single/1.jpg'
import single2 from '@/assets/images/property/single/2.jpg'
import single3 from '@/assets/images/property/single/3.jpg'
import single4 from '@/assets/images/property/single/4.jpg'
import single5 from '@/assets/images/property/single/5.jpg'

import {
    MapPin,
    Phone,
    BedDouble,
    Bath,
    Expand
} from 'lucide-vue-next'

import { useAttrs } from 'vue'

const attrs = useAttrs()

const images = [single1, single2, single3, single4, single5]

const modules = [Autoplay, Navigation]
</script>