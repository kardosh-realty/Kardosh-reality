<template>
    <Navbar />

    <section class="relative py-40 lg:h-screen flex justify-center items-center bg-primary/10">
        <div class="container">
            <div class="grid md:grid-cols-2 gap-7.5 mt-10 items-center">
                <div class="md:text-start text-center">
                    <h1 class="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">Find Your <span class="text-primary">Perfect <br /> & Wonderful</span> Home</h1>
                    <p class="text-slate-400 text-xl max-w-xl">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>

                    <div class="relative mt-8">
                        <div class="grid grid-cols-1">
                            <ul class="inline-block sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 rounded-t-xl shadow-sm shadow-gray-200 dark:shadow-gray-700" id="myTab" data-tabs-toggle="#StarterContent" role="tablist">
                                <li role="presentation" class="inline-block">
                                    <button 
                                        @click="handleTabClick(0)"  
                                        :class="[
                                            'px-6 py-2 text-base font-medium rounded-full w-full transition-all duration-500 ease-in-out',
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
                                            'px-6 py-2 text-base font-medium rounded-full w-full transition-all duration-500 ease-in-out',
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
                                            'px-6 py-2 text-base font-medium rounded-full w-full transition-all duration-500 ease-in-out',
                                            activeTabIndex === 2
                                                ? 'text-white bg-primary'
                                                : 'hover:text-primary'
                                        ]"
                                        id="rent-home-tab" data-tabs-target="#rent-home" type="button" role="tab" aria-controls="rent-home" aria-selected="false">
                                            Rent
                                    </button>
                                </li>
                            </ul>

                            <div id="StarterContent" class="p-6 bg-white dark:bg-slate-900 rounded-ss-none rounded-se-none md:rounded-se-xl rounded-xl shadow-sm shadow-gray-200 dark:shadow-gray-700">
                                
                                <div v-if="activeTabIndex === 0" id="buy-home" role="tabpanel" aria-labelledby="buy-home-tab">
                                    <div class="subcribe-form z-1">
                                        <form class="relative max-w-2xl mx-auto">
                                            <Search class="size-5 absolute top-[47%] -translate-y-1/2 inset-s-4" />
                                            <input type="name" id="search_name" name="name" class="rounded-full bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ps-12!" placeholder="Area, community, or building :" />
                                            <button type="submit" class="btn bg-primary hover:bg-primary-dark text-white rounded-full!">Find Out</button>
                                        </form>
                                    </div>
                                </div>
                            
                                <div v-if="activeTabIndex === 1" id="sell-home" role="tabpanel" aria-labelledby="sell-home-tab">
                                    <div class="subcribe-form z-1">
                                        <form class="relative max-w-2xl mx-auto">
                                            <Search class="size-5 absolute top-[47%] -translate-y-1/2 inset-s-4" />
                                            <input type="name" id="search_name" name="name" class="rounded-full bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ps-12!" placeholder="Area, community, or building :" />
                                            <button type="submit" class="btn bg-primary hover:bg-primary-dark text-white rounded-full!">Find Out</button>
                                        </form>
                                    </div>
                                </div>
                            
                                <div v-if="activeTabIndex === 2" id="rent-home" role="tabpanel" aria-labelledby="rent-home-tab">
                                    <div class="subcribe-form z-1">
                                        <form class="relative max-w-2xl mx-auto">
                                            <Search class="size-5 absolute top-[47%] -translate-y-1/2 inset-s-4" />
                                            <input type="name" id="search_name" name="name" class="rounded-full bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ps-12!" placeholder="Area, community, or building :" />
                                            <button type="submit" class="btn bg-primary hover:bg-primary-dark text-white rounded-full!">Find Out</button>
                                        </form>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative lg:ms-10">
                    <div class="p-5 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-t-full bg-white dark:bg-slate-900">
                        <img :src="Image" class="shadow-md rounded-t-full rounded-md" alt="" />
                    </div>
                    <div class="absolute bottom-2/4 translate-y-2/4 inset-s-0 inset-e-0 text-center">
                        <RouterLink to="#" @click.prevent="toggleModal" class="lightbox size-20 rounded-full shadow-md dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-primary">
                            <i class="ri-play-fill inline-flex items-center justify-center text-2xl"></i>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="relative md:pb-24 pb-16">
        <About />
        <Feature />
        <Property />
        <Client />
        <GetInTuch />
    </section>
    <Footer />
    <Switcher />

    <div v-if="isOpen" class="flex bg-[#00000099] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-1 w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div class="flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <button type="button" @click="toggleModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-1 md:p-1 space-y-4">
                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/yba7hPeTSjk?playlist=yba7hPeTSjk&loop=1"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '@/component/navbar.vue';
import About from '@/component/about.vue';
import Feature from '@/component/feature.vue';
import Property from '@/component/Properties/property.vue';
import Client from '@/component/client.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import Image from "@/assets/images/hero.jpg";

import { ref } from 'vue'

import { Search } from 'lucide-vue-next'

// For Active Tab
const activeTabIndex = ref(0)

const handleTabClick = (tabIndex) => {
    activeTabIndex.value = tabIndex
}

// For Video Open
const isOpen = ref(false)

const toggleModal = () => {
    isOpen.value = !isOpen.value
}
</script>