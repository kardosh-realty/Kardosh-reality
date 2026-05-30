<template>
    <Navbar />

    <section class="relative overflow-hidden md:h-screen pt-36 md:pb-48 pb-64 bg-primary/10 dark:bg-primary/20 bg-no-repeat bg-bottom bg-cover" :style="{backgroundImage: `url(${BackgroundImage})`}">
        <div class="container relative">
            <div class="grid grid-cols-1 items-center mt-10">
                <div class="text-center">
                    <h1 class="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">Explore Listings and <br/> Make Move Today</h1>
                    <p class="text-slate-400 text-xl max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>

                    <div class="subcribe-form z-1 max-w-2xl mx-auto mt-8">
                        <form class="relative">
                            <Search class="size-5 absolute top-[47%] -translate-y-1/2 inset-s-4"></Search>
                            <input type="name" id="search_name" name="name" class="rounded-full bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ps-12!" placeholder="Area, community, or building :"/>
                            <button type="submit" class="btn bg-primary hover:bg-primary-dark text-white rounded-full!">Find Out</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="relative md:py-24 py-16">
        <div class="container relative">
            <Categories />
        </div>

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">What We Do?</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-7.5">
                <div v-for="(item, index) in aboutData" :key="index" class="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-transparent overflow-hidden text-center">
                    <div class="relative overflow-hidden text-transparent -m-3">
                        <Hexagon class="size-32 fill-primary/5 mx-auto"/>
                        <div class="absolute top-2/4 -translate-y-2/4 inset-s-0 inset-e-0 mx-auto text-primary rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                            <img :src="item.image" class="size-12" alt=""/>
                        </div>
                    </div>

                    <div class="mt-6">
                        <RouterLink to="/" class="text-xl font-medium hover:text-primary">{{item.title}}</RouterLink>
                        <p class="text-slate-400 mt-3">{{item.desc}}</p>

                        <div class="mt-4">
                            <RouterLink to="/" class="btn btn-link text-primary hover:text-primary after:bg-primary transition duration-500">Read More <ArrowRight class="ms-1" :style="{ width: 17,height:17 }"/></RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Property />
    </section>

    <Cta/>
    <Partner/>

    <section class="relative md:py-24 py-16">
        <Client :mt="false" />

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <TeamOne />
        </div>

        <GetInTuch />
    </section>
    <Footer />
    <Switcher />

</template>

<script setup>
import Navbar from '@/component/navbar.vue';
import Categories from '@/component/categories.vue';
import Property from '@/component/Properties/property.vue';
import Cta from '@/component/cta.vue';
import Partner from '@/component/partner.vue';
import Client from '@/component/client.vue';
import TeamOne from '@/component/team-one.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import BackgroundImage from "@/assets/images/bg/bg2.png";

import { Search, Hexagon, ArrowRight } from 'lucide-vue-next'

import { aboutData } from '../../component/data/data';
</script>