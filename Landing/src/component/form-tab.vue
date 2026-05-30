<template>
    <div class="lg:col-span-5 md:col-span-6">
        <ul class="inline-block sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 rounded-t-xl border-b border-gray-200 dark:border-gray-800" id="myTab" data-tabs-toggle="#StarterContent" role="tablist">
            <li role="presentation" class="inline-block">
                <button 
                    @click="handleTabClick(0)" 
                    :class="[
                        'px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out',
                        activeTabIndex === 0
                            ? 'text-white bg-primary'
                            : 'hover:text-primary'
                    ]"
                >
                    Buy
                </button>
            </li>
            <li role="presentation" class="inline-block">
                <button 
                    @click="handleTabClick(1)" 
                    :class="[
                        'px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out',
                        activeTabIndex === 1
                            ? 'text-white bg-primary'
                            : 'hover:text-primary'
                    ]"
                >
                    Sell
                </button>
            </li>
            <li role="presentation" class="inline-block">
                <button 
                    @click="handleTabClick(2)" 
                    :class="[
                        'px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out',
                        activeTabIndex === 2
                            ? 'text-white bg-primary'
                            : 'hover:text-primary'
                    ]"
                >
                    Rent
                </button>
            </li>
        </ul>

        <div id="StarterContent" class="p-6 bg-white dark:bg-slate-900 rounded-ss-none rounded-se-none md:rounded-se-xl rounded-xl shadow-md dark:shadow-gray-700">
            <div v-if="activeTabIndex === 0" class="">
                <form action="#">
                    <div class="registration-form text-slate-900 text-start">
                        <div class="grid grid-cols-1 gap-6">
                            <div>
                                <label class="form-label font-medium text-slate-900 dark:text-white">Search : <span class="text-red-600">*</span></label>
                                <div class="filter-search-form relative mt-2">
                                    <Search class="absolute top-4.25 inset-s-4 text-xl z-1 text-primary" :style="{ width: 20,height:20 }"/>
                                    <input name="name" type="text" id="job-keyword" class="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0 rounded-md!" placeholder="Search your keaywords"/>
                                </div>
                            </div>

                            <div>
                                <label for="buy-properties" class="form-label font-medium text-slate-900 dark:text-white">Select Categories:</label>
                                <div class="filter-search-form relative rounded-md! mt-2">
                                    <House class="ri-home-line absolute top-4.25 inset-s-4 text-xl z-1 text-primary" :style="{ width: 20,height:20 }"></House>
                                    <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="Houses" :reduce="(item) => item.value" placeholder="House" />
                                </div>
                            </div>
                        
                            <div>
                                <label for="buy-min-price" class="form-label font-medium text-slate-900 dark:text-white">Min Price :</label>
                                <div class="filter-search-form relative rounded-md! mt-2">
                                    <CircleDollarSign class="absolute top-4.25 inset-s-4 text-xl z-1 text-primary" :style="{ width: 20,height:20 }"/>
                                    <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="minPrice" :reduce="(item) => item.value" placeholder="Min Price" />
                                </div>
                            </div>

                            <div>
                                <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! lg:rounded-md!" value="Search"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div v-if="activeTabIndex === 1" class="">
                <form action="#">
                    <div class="registration-form text-slate-900 text-start">
                        <div class="grid grid-cols-1 gap-6">
                            <div>
                                <label class="form-label font-medium text-slate-900 dark:text-white">Search : <span class="text-red-600">*</span></label>
                                <div class="filter-search-form relative mt-2">
                                    <Search class="absolute top-4.25 inset-s-4 text-xl z-1 text-primary" :style="{ width: 20,height:20 }"/>
                                    <input name="name" type="text" id="job-keyword" class="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0 rounded-md!" placeholder="Search your keaywords"/>
                                </div>
                            </div>
                            
                            <div>
                                <label for="buy-properties" class="form-label font-medium text-slate-900 dark:text-white">Select Categories:</label>
                                <div class="filter-search-form relative rounded-md! mt-2">
                                    <House class="ri-home-line absolute top-4.25 inset-s-4 text-xl z-1 text-primary" :style="{ width: 20,height:20 }"></House>
                                    <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="Houses" :reduce="(item) => item.value" placeholder="House" />
                                </div>
                            </div>
                        
                            <div>
                                <label for="buy-min-price" class="form-label font-medium text-slate-900 dark:text-white">Min Price :</label>
                                <div class="filter-search-form relative rounded-md! mt-2">
                                    <CircleDollarSign class="absolute top-4.25 inset-s-4 text-xl z-1 text-primary" :style="{ width: 20,height:20 }"/>
                                    <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="minPrice" :reduce="(item) => item.value" placeholder="Min Price" />
                                </div>
                            </div>

                            <div>
                                <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! lg:rounded-md!" value="Search"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div v-if="activeTabIndex === 2" class="">
                <form action="#">
                    <div class="registration-form text-slate-900 text-start">
                        <div class="grid grid-cols-1 gap-6">
                            <div>
                                <label class="form-label font-medium text-slate-900 dark:text-white">Search : <span class="text-red-600">*</span></label>
                                <div class="filter-search-form relative mt-2">
                                    <Search class="absolute top-4.25 inset-s-4 text-xl z-1 text-primary" :style="{ width: 20,height:20 }"/>
                                    <input name="name" type="text" id="job-keyword" class="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0 rounded-md!" placeholder="Search your keaywords"/>
                                </div>
                            </div>

                            <div>
                                <label for="buy-properties" class="form-label font-medium text-slate-900 dark:text-white">Select Categories:</label>
                                <div class="filter-search-form relative rounded-md! mt-2">
                                    <House class="ri-home-line absolute top-4.25 inset-s-4 text-xl z-1 text-primary" :style="{ width: 20,height:20 }"></House>
                                    <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="Houses" :reduce="(item) => item.value" placeholder="House" />
                                </div>
                            </div>
                        
                            <div>
                                <label for="buy-min-price" class="form-label font-medium text-slate-900 dark:text-white">Min Price :</label>
                                <div class="filter-search-form relative rounded-md! mt-2">
                                    <CircleDollarSign class="absolute top-4.25 inset-s-4 text-xl z-1 text-primary" :style="{ width: 20,height:20 }"/>
                                    <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="minPrice" :reduce="(item) => item.value" placeholder="Min Price" />
                                </div>
                            </div>

                            <div>
                                <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! lg:rounded-md!" value="Search"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

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

const activeTabIndex = ref(0)

const handleTabClick = (tabIndex) => {
    activeTabIndex.value = tabIndex
}
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