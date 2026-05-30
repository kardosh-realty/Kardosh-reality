<template>
    <Navbar topnavClass="bg-white dark:bg-slate-900" />

    <section class="relative">
        <div class="container-fluid">
            <div class="grid lg:grid-cols-2 md:grid-cols-2">
                <div>
                    <div class="relative mt-12 md:p-8 py-8 px-3">
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

                        <PaginationTwo :itemsPerPage="6" :items="properties" gridClass="grid grid-cols-1 mt-8 gap-7.5" />
                    </div>

                    <footer class="relative bg-neutral-900">
                        <div class="py-7.5 px-0">
                            <div class="container text-center px-6">
                                <div class="grid md:grid-cols-2 items-center gap-6">
                                    <div class="md:text-start text-center">
                                        <p class="mb-0 text-gray-300">© {{ year }} Kardosh Realty. Design & Develop by <a href="https://logixcontact.com/" rel="noopener noreferrer" target="_blank" class="text-reset">Logix Contact</a>.</p>
                                    </div>

                                    <ul class="list-none md:text-right text-center">
                                        <li class="inline ms-1"><RouterLink to="#" class="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800! rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><Facebook  class="size-4" /></RouterLink></li>
                                        <li class="inline ms-1"><RouterLink to="#" class="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800! rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><Instagram  class="size-4" /></RouterLink></li>
                                        <li class="inline ms-1"><RouterLink to="#" class="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800! rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><Twitter  class="size-4" /></RouterLink></li>
                                        <li class="inline ms-1"><RouterLink to="#" class="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800! rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><Linkedin  class="size-4" /></RouterLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>

                </div>

                <div class="relative md:block hidden">
                    <div class="map border-0 fixed w-full leading-0">
                        <iframe title="list-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178509925!2d55.2744!3d25.1972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e27a403e6b57!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1!5m2!1sen!2sae" :style="{ border:0 }" class="w-full h-screen" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Switcher />
</template>

<script setup>
import Navbar from '@/component/navbar.vue';
import PaginationTwo from '@/component/pagination-two.vue';
import Switcher from '@/component/switcher.vue';

import { properties } from "../../../component/data/data";

// For Select
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import {
    Search,
    House,
    CircleDollarSign,
    Facebook,
    Instagram,
    Linkedin,
    Twitter
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

const year = new Date().getFullYear()
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