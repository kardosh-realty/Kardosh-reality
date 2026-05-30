<template>
    <Navbar />

    <div class="container-fluid relative mt-20">
        <div class="grid grid-cols-1">
            <div class="w-full leading-0 border-0">
                <iframe title="iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178509925!2d55.2744!3d25.1972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e27a403e6b57!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1!5m2!1sen!2sae" :style="{ border:0 }" class="w-full h-125" allowFullScreen></iframe>
            </div>
        </div>
    </div>

    <div class="container relative -mt-6.25">
        <div class="grid grid-cols-1">
            <div class="subcribe-form z-1">
                <form class="relative max-w-2xl mx-auto">
                    <Search class="size-5 absolute top-[47%] -translate-y-1/2 inset-s-4" />
                    <input type="name" id="search_name" name="name" class="rounded-md bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ps-12!" placeholder="Area, community, or building :" />
                    <button type="submit" class="btn bg-primary hover:bg-primary-dark text-white rounded-md">Search</button>
                </form>
            </div>
        </div>
    </div>

    <section class="relative lg:py-24 py-16">
        <div class="container">
            <div class="grid lg:grid-cols-2 grid-cols-1 gap-7.5">

                <div v-for="(item, index) in properties" :key="index" class="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 w-full mx-auto">
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
                                    <Expand class="text-2xl me-2 text-primary"/>
                                    <span>{{ formatArea(item.square) }}</span>
                                </li>

                                <li class="flex items-center me-4">
                                    <BedDouble class="text-2xl me-2 text-primary"/>
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
            <div class="md:flex justify-center text-center mt-6">
                <div class="md:w-full">
                    <RouterLink to="/list" class="btn btn-link text-primary hover:text-primary after:bg-primary transition duration-500">View More Properties <ArrowRight :style="{ width: 17,height:17 }" class="ms-1 text-xs"/></RouterLink>
                </div>
            </div>
        </div>
        <div class="container relative lg:mt-24 mt-16 lg:pt-24 pt-16">
            <div class="absolute inset-0 opacity-25 dark:opacity-50 bg-[url('../../assets/images/map.png')] bg-no-repeat bg-center bg-cover"></div>
            <div class="relative grid grid-cols-1 pb-8 text-center z-1">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Trusted by more than 10K users</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <div class="relative grid md:grid-cols-3 grid-cols-1 items-center mt-8 gap-7.5 z-1">
                <div v-for="(item, index) in counterData" :key="index" class="counter-box text-center">
                    <h1 class="lg:text-5xl text-4xl font-semibold mb-2 text-slate-400 dark:text-white">{{ counts[index] }}+</h1>
                    <h5 class="counter-head text-lg font-medium">{{item.title}}</h5>
                </div>
            </div>
        </div>

        <div class="container lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <TeamOne />
        </div>

        <ClientTwo />
        <GetInTuch />
    </section>

    <FooterLight />
    <Switcher />
</template>

<script setup>
import { formatAed, formatArea } from '@/config/uae'
import Navbar from '@/component/navbar.vue';
import TeamOne from '@/component/team-one.vue';
import ClientTwo from '@/component/client-two.vue';
import Switcher from '@/component/switcher.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import FooterLight from '@/component/footer-light.vue';

import { counterData, properties } from "../../component/data/data";

import { ref, onMounted, onUnmounted } from "vue"

const counts = ref(counterData.map(() => 0))

let timer = null

onMounted(() => {

    const duration = 1000

    const starts = counterData.map(() => 0)
    const ends = counterData.map(item => item.target)

    const increments = ends.map(
        (end, i) => (end - starts[i]) / (duration / 16)
    )

    let current = [...starts]

    timer = setInterval(() => {
        let completed = true

        current = current.map((val, i) => {
            val += increments[i]

            if (val < ends[i]) {
                completed = false
                return val
            } else {
                return ends[i]
            }
        })

        counts.value = current.map(v => Math.floor(v))

        if (completed) {
            clearInterval(timer)
        }

    }, 16)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
})

import {
    Search,
    Bath,
    BedDouble,
    Expand,
    ArrowRight
} from 'lucide-vue-next'
</script>