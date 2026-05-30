<template>
    <Tagline />
    <Navbar :tagLine="true" />

    <section class="relative overflow-hidden md:h-screen flex items-center md:py-0 py-36 bg-cyan-100 dark:bg-cyan-500/20  bg-no-repeat bg-top bg-cover" :style="{backgroundImage: `url(${bg})`}">
        <div class="container relative">
            <div class="grid grid-cols-1 items-center mt-10">
                <div class="md:text-start text-center">
                    <h1 class="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">We will find a perfect <br/> home for you</h1>
                    <p class="text-xl max-w-xl">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>

                    <div class="relative flex mt-8">
                        <div class="lg:w-5/6 w-full">
                            <ul class="inline-block sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 rounded-t-xl border-b border-gray-200 dark:border-gray-800" id="myTab" data-tabs-toggle="#StarterContent" role="tablist">
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

                            <div id="StarterContent" class="p-6 bg-white dark:bg-slate-900 rounded-ss-none rounded-se-none md:rounded-se-xl rounded-xl shadow-md shadow-gray-200 dark:shadow-gray-700">
                                
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
                                                        <House class=" icons" :style="{ width: 20,height:20 }"/>
                                                        <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="Houses" :reduce="(item) => item.value" placeholder="House" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label for="buy-min-price" class="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                                    <div class="filter-search-form relative filter-border mt-2">
                                                        <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                                        <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="minPrice" :reduce="(item) => item.value" placeholder="Min Price" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div class="md:mt-8">
                                                        <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-15! rounded-sm lg:rounded-none" value="Search" />
                                                    </div>
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
                                                        <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="Houses" :reduce="(item) => item.value" placeholder="House" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label for="buy-min-price" class="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                                    <div class="filter-search-form relative filter-border mt-2">
                                                        <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                                        <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="minPrice" :reduce="(item) => item.value" placeholder="Min Price" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div class="md:mt-8">
                                                        <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-15! rounded-sm lg:rounded-none" value="Search" />
                                                    </div>
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
                                                        <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="Houses" :reduce="(item) => item.value" placeholder="House" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label for="buy-min-price" class="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                                    <div class="filter-search-form relative filter-border mt-2">
                                                        <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                                        <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="minPrice" :reduce="(item) => item.value" placeholder="Min Price" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div class="md:mt-8">
                                                        <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-15! rounded-sm lg:rounded-none" value="Search" />
                                                    </div>
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
        </div>
    </section>

    <section class="relative lg:pb-24 pb-16">
        <About />

        <Feature />
    </section>

    <Cta />

    <section class="relative md:py-24 py-16">
        <div class="container relative">
            <div class="grid grid-cols-1 pb-8">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Listing Categories</h3>

                <p class="text-slate-400 max-w-xl">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <Categories/>
        </div>

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Featured Properties</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

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
                    <RouterLink to="/list" class="btn btn-link text-primary hover:text-primary after:bg-primary transition duration-500">View More Properties <i class="ri-arrow-right-s-line ms-1"></i></RouterLink>
                </div>
            </div>
            <Client />
        </div>

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <TeamOne />
            <GetInTuch />
        </div>
    </section>
    <Footer />
    <Switcher />
</template>

<script setup>
import { formatAed, formatArea } from '@/config/uae'
import Tagline from '@/component/tagline.vue';
import Navbar from '@/component/navbar.vue';
import About from '@/component/about.vue';
import Feature from '@/component/feature.vue';
import Cta from '@/component/cta.vue';
import Categories from '@/component/categories.vue';
import Client from '@/component/client.vue';
import TeamOne from '@/component/team-one.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import bg from '@/assets/images/bg/bg3.png'

import { ref } from 'vue'

// For Select
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import {
    Search,
    House,
    CircleDollarSign,
    Bath,
    BedDouble,
    Expand
} from 'lucide-vue-next'

import { properties } from "../../component/data/data";

const Houses = [
    { value: 'AF', label: 'Apartment' },
    { value: 'AZ', label: ' Offices' },
    { value: 'BS', label: 'Townhome' },
]
const minPrice = [
    { value: '1', label: '500' },
    { value: '2', label: '1000' },
    { value: '3', label: '2000' },
    { value: '4', label: '3000' },
    { value: '5', label: '4000' },
    { value: '5', label: '5000' },
    { value: '5', label: '6000' },
]

const activeTabIndex = ref(0)

const handleTabClick = (tabIndex) => {
    activeTabIndex.value = tabIndex
}
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