<template>
    <Navbar navClass="navbar-white" />

    <section class="relative table w-full py-32 lg:py-36 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover">
        <div class="absolute inset-0 bg-slate-900/80"></div>
        <div class="container relative">
            <div class="grid grid-cols-1 text-center mt-10">
                <h3 class="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Agencies</h3>
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

    <section class="relative lg:py-24 py-16">
        <div class="container relative">
            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7.5">
                <div v-for="(item, index) in agencyData" :key="index" class="group text-center">
                    <div class="relative inline-block mx-auto size-64 rounded-full overflow-hidden shadow-sm shadow-gray-200 dark:shadow-gray-700">
                        <img :src="item.image" class="" alt=""/>
                    </div>

                    <div class="content mt-3">
                        <RouterLink :to="`/agency-profile/${item.id}`" class="text-xl font-medium hover:text-primary transition-all duration-500 ease-in-out">{{item.name}}</RouterLink>
                        <p class="text-slate-400">{{item.title}}</p>

                        <ul class="list-none mt-2">
                            <li class="inline ms-1 rtl:me-1 rtl:ms-0"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><Facebook class="size-4"/></RouterLink></li>
                            <li class="inline ms-1 rtl:me-1 rtl:ms-0"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><Instagram class="size-4"/></RouterLink></li>
                            <li class="inline ms-1 rtl:me-1 rtl:ms-0"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><Twitter class="size-4"/></RouterLink></li>
                            <li class="inline ms-1 rtl:me-1 rtl:ms-0"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><Linkedin class="size-4"/></RouterLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <GetInTuch />
    </section>
    <Footer />
    <Switcher />
</template>

<script setup>
import Navbar from '@/component/navbar.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import {
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
} from 'lucide-vue-next'

import { agencyData } from '@/component/data/data'
</script>