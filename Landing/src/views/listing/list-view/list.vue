<template>
    <Navbar navClass="navbar-white" />

    <section class="relative table w-full py-32 lg:py-36 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover">
        <div class="absolute inset-0 bg-slate-900/80"></div>
        <div class="container relative">
            <div class="grid grid-cols-1 text-center mt-10">
                <h3 class="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">List View Layout</h3>
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
    <div class="container relative -mt-16 z-1">
        <div class="grid grid-cols-1">
            <form class="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md shadow-gray-200 dark:shadow-gray-700">
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
                            <label for="buy-max-price" class="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                            <div class="filter-search-form relative mt-2">
                                <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="maxPrice" :reduce="(item) => item.value"  placeholder="Max Price" />
                            </div>
                        </div>

                        <div class="lg:mt-6">
                            <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! rounded" value="Search" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <section class="relative lg:py-24 py-16">
        <div class="container">
            <PaginationTwo :itemsPerPage="6" :items="properties" gridClass="grid lg:grid-cols-2 grid-cols-1 gap-7.5" />
        </div>
    </section>
    <Footer />
    <Switcher />
</template>

<script setup>
import Navbar from '@/component/navbar.vue';
import PaginationTwo from '@/component/pagination-two.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import { properties } from "../../../component/data/data";

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