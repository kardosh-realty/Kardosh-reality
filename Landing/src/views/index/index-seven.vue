<template>
    <Navbar navClass="navbar-white" />

    <section class="swiper-slider-hero relative block h-screen" id="home">
        <div class="swiper-container absolute inset-e-0 top-0 size-full">
            <Swiper
                class="swiper-wrapper"
                :modules="[Autoplay, Navigation]"
                :slides-per-view="1"
                :loop="true"
                :speed="5000"
                :navigation="navigation"
                :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false
                }"
            >
                <SwiperSlide class="swiper-slide flex items-center overflow-hidden">
                    <div class="slide-inner absolute inset-e-0 top-0 size-full slide-bg-image flex items-center bg-center;" 
                        :style="{
                            backgroundImage: `url(${bg1})`,
                            height: '100vh'
                        }"
                    >
                        <div class="absolute inset-0 bg-slate-900/70"></div>
                        <div class="container relative">
                            <div class="grid grid-cols-1">
                                <div class="text-center">
                                    <h1 class="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">Easy way to find your <br/> dream property</h1>
                                    <p class="text-white/70 text-xl max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
                                    
                                    <div class="mt-6">
                                        <RouterLink to="" class="btn bg-primary hover:bg-primary-dark text-white rounded-md">See More</RouterLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </SwiperSlide> 

                <SwiperSlide class="swiper-slide flex items-center overflow-hidden">
                    <div class="slide-inner absolute inset-e-0 top-0 size-full slide-bg-image flex items-center bg-center;" 
                        :style="{
                            backgroundImage: `url(${bg2})`,
                            height: '100vh'
                        }"
                    >
                        <div class="absolute inset-0 bg-slate-900/70"></div>
                        <div class="container relative">
                            <div class="grid grid-cols-1">
                                <div class="text-center">
                                    <h1 class="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">We will help you find <br/> your Wonderful home</h1>
                                    <p class="text-white/70 text-xl max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
                                    
                                    <div class="mt-6">
                                        <RouterLink to="" class="btn bg-primary hover:bg-primary-dark text-white rounded-md">See More</RouterLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </SwiperSlide>
            </Swiper>

            <button class="swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 size-8 bg-white dark:bg-slate-800 rounded-full shadow hover:bg-primary hover:text-white transition cursor-pointer">
                <i class="ri-arrow-left-s-line text-2xl"></i>
            </button>

            <button class="swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 size-8 bg-white dark:bg-slate-800 rounded-full shadow hover:bg-primary hover:text-white transition cursor-pointer">
                <i class="ri-arrow-right-s-line text-2xl"></i>
            </button>
        </div>
    </section>

    <section class="relative md:pb-24 pb-16">
        <div class="container relative z-1">
            <div class="grid grid-cols-1 justify-center">
                <div class="relative md:-mt-52 -mt-40">
                <div class="grid grid-cols-1">
                    <ul class="inline-block mx-auto sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 backdrop-blur-sm rounded-t-xl border-b border-gray-200 dark:border-gray-800 mt-10" id="myTab" data-tabs-toggle="#StarterContent" role="tablist">
                        <li role="presentation" class="inline-block">
                            <button 
                                @click="handleTabClick(0)" 
                                :class="[
                                    'px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out',
                                    activeTabIndex === 0
                                        ? 'text-white bg-primary'
                                        : 'hover:text-primary'
                                ]" 
                                id="buy-home-tab" data-tabs-target="#buy-home" type="button" role="tab" aria-controls="buy-home" aria-selected="true">
                                Buy
                            </button>
                        </li>
                        <li role="presentation" class="inline-block">
                            <button 
                                @click="handleTabClick(1)" 
                                :class="[
                                    'px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out',
                                    activeTabIndex === 1
                                        ? 'text-white bg-primary'
                                        : 'hover:text-primary'
                                ]"
                                id="sell-home-tab" data-tabs-target="#sell-home" type="button" role="tab" aria-controls="sell-home" aria-selected="false">
                                Sell
                            </button>
                        </li>
                        <li role="presentation" class="inline-block">
                            <button 
                                @click="handleTabClick(2)"
                                :class="[
                                    'px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out',
                                    activeTabIndex === 2
                                        ? 'text-white bg-primary'
                                        : 'hover:text-primary'
                                ]" 
                                id="rent-home-tab" data-tabs-target="#rent-home" type="button" role="tab" aria-controls="rent-home" aria-selected="false">
                                Rent
                            </button>
                        </li>
                    </ul>

                    <div id="StarterContent" class="p-6 bg-white dark:bg-slate-900 md:rounded-xl rounded-none shadow-md shadow-gray-200 dark:shadow-gray-700">
                        <div v-if="activeTabIndex === 0" id="buy-home" role="tabpanel" aria-labelledby="buy-home-tab">
                            <form action="#">
                                <div class="registration-form text-dark text-start">
                                    <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                        <div>
                                            <label class="form-label text-slate-900 dark:text-white font-medium">Search : <span class="text-red-600">*</span></label>
                                            <div class="filter-search-form relative filter-border mt-2">
                                                <Search class="icons" :style="{ width: 20,height:20 }"/>
                                                <input name="name" type="text" id="job-keyword" class="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" placeholder="Search your Keywords" />
                                            </div>
                                        </div>

                                        <div>
                                            <label for="buy-properties" class="form-label text-slate-900 dark:text-white font-medium">Select Categories:</label>                                                        
                                            <div class="filter-search-form relative filter-border mt-2">
                                                <House class="icons" :style="{ width: 20,height:20 }"/>
                                                <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="Houses" :reduce="(item) => item.value" placeholder="House"/>
                                            </div>
                                        </div>

                                        <div>
                                            <label for="buy-min-price" class="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                            <div class="filter-search-form relative filter-border mt-2">
                                                <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                                <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="minPrice" :reduce="(item) => item.value" placeholder="Min Price"/>
                                            </div>
                                        </div>

                                        <div>
                                            <label for="buy-max-price" class="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                            <div class="filter-search-form relative mt-2">
                                                <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                                <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="maxPrice" :reduce="(item) => item.value"  placeholder="Max Price"/>
                                            </div>
                                        </div>

                                        <div class="lg:mt-6">
                                            <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! rounded" value="Search" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div v-if="activeTabIndex === 1" id="sell-home" role="tabpanel" aria-labelledby="sell-home-tab">
                            <form action="#">
                                <div class="registration-form text-dark text-start">
                                    <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                        <div>
                                            <label class="form-label text-slate-900 dark:text-white font-medium">Search : <span class="text-red-600">*</span></label>
                                            <div class="filter-search-form relative filter-border mt-2">
                                                <Search class="icons" :style="{ width: 20,height:20 }"/>
                                                <input name="name" type="text" id="job-keyword" class="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" placeholder="Search your Keywords" />
                                            </div>
                                        </div>

                                        <div>
                                            <label for="buy-properties" class="form-label text-slate-900 dark:text-white font-medium">Select Categories:</label>                                                        
                                            <div class="filter-search-form relative filter-border mt-2">
                                                <House class="icons" :style="{ width: 20,height:20 }"/>
                                                <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="Houses" :reduce="(item) => item.value" placeholder="House"/>
                                            </div>
                                        </div>

                                        <div>
                                            <label for="buy-min-price" class="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                            <div class="filter-search-form relative filter-border mt-2">
                                                <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                                <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="minPrice" :reduce="(item) => item.value" placeholder="Min Price"/>
                                            </div>
                                        </div>

                                        <div>
                                            <label for="buy-max-price" class="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                            <div class="filter-search-form relative mt-2">
                                                <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                                <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="maxPrice" :reduce="(item) => item.value"  placeholder="Max Price"/>
                                            </div>
                                        </div>

                                        <div class="lg:mt-6">
                                            <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! rounded" value="Search" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div v-if="activeTabIndex === 2" id="rent-home" role="tabpanel" aria-labelledby="rent-home-tab">
                            <form action="#">
                            <div class="registration-form text-dark text-start">
                                    <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                        <div>
                                            <label class="form-label text-slate-900 dark:text-white font-medium">Search : <span class="text-red-600">*</span></label>
                                            <div class="filter-search-form relative filter-border mt-2">
                                                <Search class="icons" :style="{ width: 20,height:20 }"/>
                                                <input name="name" type="text" id="job-keyword" class="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" placeholder="Search your Keywords" />
                                            </div>
                                        </div>

                                        <div>
                                            <label for="buy-properties" class="form-label text-slate-900 dark:text-white font-medium">Select Categories:</label>                                                        
                                            <div class="filter-search-form relative filter-border mt-2">
                                                <House class="icons" :style="{ width: 20,height:20 }"/>
                                                <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="Houses" :reduce="(item) => item.value" placeholder="House"/>
                                            </div>
                                        </div>

                                        <div>
                                            <label for="buy-min-price" class="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                            <div class="filter-search-form relative filter-border mt-2">
                                                <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                                <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="minPrice" :reduce="(item) => item.value" placeholder="Min Price"/>
                                            </div>
                                        </div>

                                        <div>
                                            <label for="buy-max-price" class="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                            <div class="filter-search-form relative mt-2">
                                                <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                                <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="maxPrice" :reduce="(item) => item.value"  placeholder="Max Price"/>
                                            </div>
                                        </div>

                                        <div class="lg:mt-6">
                                            <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! rounded" value="Search" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <About />

        <Feature />

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Featured Properties</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <div class="grid lg:grid-cols-2 grid-cols-1 gap-7.5 mt-8">

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
                    <RouterLink to="/list" class="btn btn-link text-primary hover:text-primary after:bg-primary transition duration-500">View More Properties <ArrowRight :style="{ width: 17,height:17 }" class="ms-1"/></RouterLink>
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

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <TeamOne />
        </div>

        <Client />

        <GetInTuch />
    </section>
    <Footer />
    <Switcher />
</template>

<script setup>
import { formatAed, formatArea } from '@/config/uae'
import Navbar from '@/component/navbar.vue';
import About from '@/component/about.vue';
import Feature from '@/component/feature.vue';
import TeamOne from '@/component/team-one.vue';
import Client from '@/component/client.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

import bg1 from '@/assets/images/bg/01.jpg'
import bg2 from '@/assets/images/bg/02.jpg'

const navigation = {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
}

import { RouterLink } from 'vue-router'

import { counterData, properties } from "../../component/data/data";

// For Select
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import {
    Search,
    House,
    CircleDollarSign,
    Bath,
    BedDouble,
    Expand,
    ArrowRight
} from 'lucide-vue-next'

const Houses = [
    { value: 'AF', label: 'Apartment' },
    { value: 'AZ', label: 'Offices' },
    { value: 'BS', label: 'Townhome' },
]

const minPrice = [
    { value: '1', label: '500' },
    { value: '2', label: '1000' },
    { value: '3', label: '2000' },
    { value: '4', label: '3000' },
    { value: '5', label: '4000' },
    { value: '6', label: '5000' },
    { value: '7', label: '6000' },
]

const maxPrice = [
    { value: '1', label: '500' },
    { value: '2', label: '1000' },
    { value: '3', label: '2000' },
    { value: '4', label: '3000' },
    { value: '5', label: '4000' },
    { value: '6', label: '5000' },
    { value: '7', label: '6000' },
]

const activeTabIndex = ref(0)

const handleTabClick = (tabIndex) => {
    activeTabIndex.value = tabIndex
}

// For Counter

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
</script>

<style scoped>
:deep(.custom-vselect .vs__dropdown-toggle) {
    background-color: rgb(249 250 251);
    border: none !important;
    min-height: 48px;
}

:deep(.dark .custom-vselect .vs__dropdown-toggle) {
    background-color: rgb(30 41 59);
}

:deep(.custom-vselect .vs__search) {
    background: transparent;
    color: #64748b;
}

:deep(.custom-vselect .vs__selected) {
    color: #64748b;
}

:deep(.custom-vselect .vs__dropdown-menu) {
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

html[dir="rtl"] .custom-vselect {
    direction: rtl;
}
</style>