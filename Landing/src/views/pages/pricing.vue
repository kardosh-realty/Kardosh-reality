<template>
    <Navbar navClass="navbar-white" />

    <section :style="{backgroundImage: `url(${BackgroudImage})`}" class="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover">
        <div class="absolute inset-0 bg-slate-900 opacity-80"></div>
        <div class="container relative">
            <div class="grid grid-cols-1 text-center mt-10">
                <h3 class="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Pricing Plans</h3>
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
                <div v-for="(item, index) in pricing" :key="index" class="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 hover:shadow-md dark:hover:shadow-gray-700 duration-500 ease-in-out">
                    <div class="border-b border-gray-200 dark:border-gray-800 p-6 text-center">
                        <div class="size-24 bg-primary/5 text-primary flex items-center justify-center text-3xl rounded-full mx-auto">
                            <component
                                :is="item.icon"
                                class="text-3xl"
                                :style="{ width: 30,height:30 }"
                            />
                        </div>
                        <h3 class="text-2xl text-primary font-medium mt-4">{{item.title}}</h3>

                        <div class="flex justify-center mt-4">
                            <span class="text-xl">AED </span>
                            <span class="text-3xl font-semibold">{{item.amount}}</span>
                            <span class="text-xl self-end">/month</span>
                        </div>
                    </div>

                    <div class="p-6">
                        <h5>Pricing Features:</h5>
                        <ul class="list-none">
                            <li v-for="(el, i) in item.features" :key="i" class="text-slate-400 mt-2 flex items-center">
                                <span class="text-primary text-lg me-2 ">
                                    <CircleCheck class="align-middle" :style="{ width: 18,height:18 }"/>
                                </span>
                                {{ el }}
                            </li>
                        </ul>
                        <RouterLink to="#" class="btn bg-primary hover:bg-primary-dark border-primary dark:border-primary text-white rounded-md w-full mt-4">Get Started</RouterLink>
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

import BackgroudImage from "@/assets/images/bg/01.jpg";

import { CircleCheck } from 'lucide-vue-next'

import { pricing } from "../../component/data/data";
</script>