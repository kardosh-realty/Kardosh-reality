<template>
    <Navbar navClass="navbar-white" />

    <section class="relative table w-full py-36 md:py-44 lg:py-56 bg-[url('../../assets/images/bg/6.jpg')] bg-no-repeat bg-center bg-cover">
        <div class="absolute inset-0 bg-slate-900/50"></div>
        <div class="container relative z-3">
            <div class="grid md:grid-cols-12 mt-10">
                <div class="lg:col-span-8 md:col-span-6">
                    <h1 class="font-semibold text-white lg:leading-normal leading-normal text-4xl lg:text-6xl mb-6">Find the perfect <br/> 
                        <span ref="typedElement" class="text-primary"></span>
                        for you
                    </h1>
                    <p class="text-white/70 text-xl max-w-xl">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>

                    <div class="mt-4">
                        <RouterLink to="/" class="btn bg-primary hover:bg-primary-dark text-white rounded-md mt-3">Learn More </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="relative md:pb-24 pb-16">
        <div class="container">
            <div class="grid grid-cols-1 justify-center">
                <div class="relative -mt-32">
                    <div class="grid grid-cols-1">
                        <div id="StarterContent" class="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm shadow-gray-200 dark:shadow-gray-700">
                            <div id="buy-home" role="tabpanel" aria-labelledby="buy-home-tab">
                                <form action="#">
                                    <div class="registration-form text-dark text-start">
                                        <div class="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
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
                                                <label for="buy-max-price" class="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                                <div class="filter-search-form relative mt-2">
                                                    <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                                    <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="maxPrice" :reduce="(item) => item.value"  placeholder="Max Price" />
                                                </div>
                                            </div>

                                            <div class="lg:mt-6">
                                                <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-15! lg:rounded-none rounded-sm mt-2" value="Search" />
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
        <AboutTwo />
        <PropertyTwo />
        <div class="relative md:pt-24 pt-16">
            <div class="container">
                <div class="grid grid-cols-1 pb-8">
                    <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Listing Categories</h3>

                    <p class="text-slate-400 max-w-xl">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
                </div>

                <Categories/>
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
import AboutTwo from '@/component/about-two.vue';
import PropertyTwo from '@/component/property-two.vue';
import Categories from '@/component/categories.vue';
import Client from '@/component/client.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

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

import { ref, onMounted, onBeforeUnmount } from 'vue'
import Typed from 'typed.js'

const typedElement = ref(null)

let typedInstance = null

onMounted(() => {
    typedInstance = new Typed(typedElement.value, {
        strings: ['home', 'villa', 'office'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000,
        loop: true
    })
})

onBeforeUnmount(() => {
    typedInstance.destroy()
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