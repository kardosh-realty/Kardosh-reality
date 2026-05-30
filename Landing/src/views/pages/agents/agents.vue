<template>
    <Navbar navClass="navbar-white" />

    <section
        class="relative table w-full py-32 lg:py-36 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover">
        <div class="absolute inset-0 bg-slate-900/80"></div>
        <div class="container relative">
            <div class="grid grid-cols-1 text-center mt-10">
                <h3 class="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">
                    Agents / Brokers
                </h3>
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
            <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7.5">
                <div v-for="(item, index) in agentData" :key="index" class="group text-center">
                    <div class="relative inline-block mx-auto size-52 rounded-full overflow-hidden">
                        <img :src="item.image" class="" alt="" />
                        <div
                            class="absolute inset-0 bg-linear-to-b from-transparent to-slate-900 size-52 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                        </div>

                        <ul class="list-none absolute inset-s-0 inset-e-0 -bottom-20 group-hover:bottom-5 transition-all duration-500 ease-in-out">
                            <li class="inline ms-1 rtl:me-1">
                                <RouterLink to=""
                                    class="btn btn-icon btn-sm rounded-full! border border-primary bg-primary hover:border-primary hover:bg-primary text-white">
                                    <Facebook class="size-4" />
                                </RouterLink>
                            </li>
                            <li class="inline ms-1 rtl:me-1">
                                <RouterLink to=""
                                    class="btn btn-icon btn-sm rounded-full! border border-primary bg-primary hover:border-primary hover:bg-primary text-white">
                                    <Instagram class="size-4" />
                                </RouterLink>
                            </li>
                            <li class="inline ms-1 rtl:me-1">
                                <RouterLink to=""
                                    class="btn btn-icon btn-sm rounded-full! border border-primary bg-primary hover:border-primary hover:bg-primary text-white">
                                    <Linkedin class="size-4" />
                                </RouterLink>
                            </li>
                        </ul>
                    </div>

                    <div class="content mt-3">
                        <RouterLink :to="`/agent-profile/${item.id}`" class="text-xl font-medium hover:text-primary transition-all duration-500 ease-in-out">
                            {{item.name}}
                        </RouterLink>
                        <p class="text-slate-400">{{item.position}}</p>
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

import { agentData } from '@/component/data/data'

import {
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-vue-next'
</script>