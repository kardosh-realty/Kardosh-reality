<template>
    <Navbar navClass="navbar-white" />

    <section class="relative xl:pt-120 lg:pt-112 md:pt-108 pt-80 pb-8 bg-no-repeat bg-center bg-cover bg-fixed" :style="{backgroundImage: `url(${bg8})`}">
        <div class="absolute inset-0 bg-slate-950/20"></div>
        <div class="container relative">
            <div class="grid md:grid-cols-12 grid-cols-1 items-center">
                <div class="lg:col-span-9 md:col-span-6 col-span-12">
                    <h1 class="font-semibold text-white leading-none text-4xl xl:text-7xl lg:text-6xl">Property Buy & Sell <br/> Made Easy & Transparent</h1>
                </div>
                <div class="lg:col-span-3 md:col-span-6 col-span-12 md:mt-0 mt-6">
                    <p class="text-white/70 text-xl max-w-xl">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
                </div>
            </div>

            <div class="grid grid-cols-1 mt-6">
                <form class="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-gray-700 lg:ms-auto max-w-3xl">
                    <div class="registration-form text-slate-900 text-start">
                        <div class="grid md:grid-cols-4 grid-cols-1 md:gap-0 gap-6">
                            <div>
                                <label class="form-label text-slate-900 dark:text-white font-medium">Search : <span class="text-red-600">*</span></label>
                                <div class="filter-search-form relative filter-border mt-2">
                                    <Search class="icons" :style="{ width: 20,height:20 }"/>
                                    <input name="name" type="text" id="job-keyword" class="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" placeholder="Search your Keywords" />
                                </div>
                            </div>

                            <div>
                                <label for="buy-properties" class="form-label text-slate-900 dark:text-white font-medium">Categories:</label>                                                        
                                <div class="filter-search-form relative filter-border mt-2">
                                    <House class=" icons" :style="{ width: 20,height:20 }"/>
                                    <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="Houses" :reduce="(item) => item.value" placeholder="House" />
                                </div>
                            </div>

                            <div>
                                <label for="buy-min-price" class="form-label text-slate-900 dark:text-white font-medium">Price :</label>                                                        
                                <div class="filter-search-form relative filter-border mt-2">
                                    <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                    <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="minPrice" :reduce="(item) => item.value" placeholder="Min Price" />
                                </div>
                            </div>

                            <div class="md:mt-6">
                                <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-15! lg:rounded-s-none! lg:rounded-sm! mt-2" value="Search" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <section class="relative md:py-24 py-16">
        <div class="container relative">
            <Categories />
        </div>

        <About />

        <Feature />

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Featured Properties</h3>

                <p class="text-slate-400 max-w-xl">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <FeatureProperty />
        </div>

        <div class="container lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <TeamOne />
        </div>

        <ClientTwo />

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Latest Blogs & News</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <BlogOne />
        </div>

        <GetInTuch />

    </section>

    <Footer />

    <Switcher />
</template>

<script setup>
import Navbar from '@/component/navbar.vue';
import Categories from '@/component/categories.vue';
import About from '@/component/about.vue';
import Feature from '@/component/feature.vue';
import FeatureProperty from '@/component/feature-property.vue';
import TeamOne from '@/component/team-one.vue';
import ClientTwo from '@/component/client-two.vue';
import BlogOne from '@/component/blog-one.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import bg8 from '@/assets/images/bg/8.jpg'

// For Select
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import {
    Search,
    House,
    CircleDollarSign
} from 'lucide-vue-next'

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