<template>
    <Navbar navClass="navbar-white" />

    <section
        :style="{backgroundImage: `url(${BackgroudImage})`}" class="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover">
            <div class="absolute inset-0 bg-slate-900 opacity-80"></div>
            <div class="container relative">
            <div class="grid grid-cols-1 text-center mt-10">
                <h3 class="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Services / Features</h3>
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
        <div class="container">
            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[30px] gap-y-[50px]">

                <div v-for="(item, index) in featureTwo" :key="index" class="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-white dark:bg-slate-900 overflow-hidden">
                    <div class="relative overflow-hidden text-transparent -m-3">
                        <Hexagon class="size-32 fill-primary/5"></Hexagon>
                        <div class="absolute top-[50%] -translate-y-[50%] inset-s-11.25 text-primary rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
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

        <Client />

        <GetInTuch />
    </section>
    <Footer />
    <Switcher />
</template>

<script setup>
import Navbar from '@/component/navbar.vue';
import Client from '@/component/client.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import BackgroudImage from "@/assets/images/bg/01.jpg";

import { Hexagon } from 'lucide-vue-next'

import { featureTwo } from "../../component/data/data";
</script>