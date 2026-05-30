<template>
    <Navbar navClass="navbar-white" />

    <section
        :style="{backgroundImage: `url(${BackgroundImage})`}"
        class="relative table w-full py-32 lg:py-36 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover">
        <div class="absolute inset-0 bg-slate-900/80"></div>
        <div class="container relative">
            <div class="grid grid-cols-1 text-center mt-10">
                <h3 class="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Find Your Dream Home</h3>
            </div>
        </div>
    </section>
    <div class="relative">
        <div class="shape overflow-hidden z-1 text-white dark:text-slate-900">
            <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
            </svg>
        </div>
    </div>

    <section class="relative md:pb-24 pb-16">
        <div class="container relative -mt-6.25">
            <div class="grid grid-cols-1">
                <div class="subcribe-form z-1">
                    <form class="relative max-w-2xl mx-auto">
                        <Search class="size-5 absolute top-[47%] -translate-y-1/2 inset-s-4"></Search>
                        <input type="name" id="search_name" name="name" class="rounded-md bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ps-12!" placeholder="Area, community, or building :" />
                        <button type="submit" class="btn bg-primary hover:bg-primary-dark text-white rounded-md">Search</button>
                    </form>
                </div>
            </div>
        </div>
        
        <Property />
        <Feature />
        <BuyTab />
        <GetInTuch />
    </section>
    <Footer />
    <Switcher />
</template>

<script setup>
import Navbar from '@/component/navbar.vue';
import Property from '@/component/Properties/property.vue';
import Feature from '@/component/feature.vue';
import BuyTab from '@/component/buy-tab.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import BackgroundImage from "@/assets/images/bg/01.jpg";

import { Search } from 'lucide-vue-next'
</script>