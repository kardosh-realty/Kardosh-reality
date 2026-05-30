<template>
    <Navbar navClass="navbar-white"  />

    <section class="relative table w-full lg:py-44 py-36 overflow-hidden">
        <div class="zoom-image">
            <div class="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/04.jpg')] bg-no-repeat bg-center bg-cover" :style="{backgroundImage: `url(${BackgroudImage})`}"></div>
            <div class="absolute inset-0 bg-slate-900/70 z-2"></div>
        </div>
        <div class="container relative z-3">
            <div class="grid grid-cols-1 mt-10">
                <div class="text-center">
                    <h1 class="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">Easy way to find your <br /> dream property</h1>
                    <p class="text-white/70 text-xl max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
                </div>
                <ul class="inline-block mx-auto sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 backdrop-blur-sm rounded-t-xl border-b border-gray-200 dark:border-gray-800 mt-10" id="myTab" data-tabs-toggle="#StarterContent" role="tablist">
                    <li role="presentation" class="inline-block">
                        <button 
                            @click="handleTabClick(0)" 
                            :class="[
                                'px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out',
                                activeTabIndex === 0
                                    ? 'text-white bg-primary'
                                    : 'hover:text-primary'
                            ]" 
                            id="buy-home-tab" data-tabs-target="#buy-home" type="button" role="tab" aria-controls="buy-home" aria-selected="true">
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
                            id="sell-home-tab" data-tabs-target="#sell-home" type="button" role="tab" aria-controls="sell-home" aria-selected="false">
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
                            id="rent-home-tab" data-tabs-target="#rent-home" type="button" role="tab" aria-controls="rent-home" aria-selected="false">
                            Rent
                        </button>
                    </li>
                </ul>

                <div id="StarterContent" class="p-6 bg-white dark:bg-slate-900 md:rounded-xl rounded-none shadow-md dark:shadow-gray-700">
                
                    <div v-if="activeTabIndex === 0" id="buy-home" role="tabpanel" aria-labelledby="buy-home-tab">
                        <form action="#">
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
                                            <House class="icons" :style="{ width: 20,height:20 }"/>
                                            <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="Houses" :reduce="(item) => item.value" placeholder="House"/>
                                        </div>
                                    </div>

                                    <div>
                                        <label for="buy-min-price" class="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                        <div class="filter-search-form relative filter-border mt-2">
                                            <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                            <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="minPrice" :reduce="(item) => item.value" placeholder="Min Price"/>
                                        </div>
                                    </div>

                                    <div>
                                        <label for="buy-max-price" class="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                        <div class="filter-search-form relative mt-2">
                                            <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                            <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="maxPrice" :reduce="(item) => item.value"  placeholder="Max Price"/>
                                        </div>
                                    </div>

                                    <div class="lg:mt-6">
                                        <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! rounded" value="Search" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div v-if="activeTabIndex === 1" id="sell-home" role="tabpanel" aria-labelledby="sell-home-tab">
                        <form action="#">
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
                                            <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="Houses" :reduce="(item) => item.value" placeholder="House"/>

                                        </div>
                                    </div>

                                    <div>
                                        <label for="buy-min-price" class="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                        <div class="filter-search-form relative filter-border mt-2">
                                            <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                            <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="minPrice" :reduce="(item) => item.value" placeholder="Min Price"/>

                                        </div>
                                    </div>

                                    <div>
                                        <label for="buy-max-price" class="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                        <div class="filter-search-form relative mt-2">
                                            <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                            <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="maxPrice" :reduce="(item) => item.value"  placeholder="Max Price"/>

                                        </div>
                                    </div>

                                    <div class="lg:mt-6">
                                        <input type="submit" id="search-buy" name="search" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! rounded" value="Search" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div v-if="activeTabIndex === 2" id="rent-home" role="tabpanel" aria-labelledby="rent-home-tab">
                        <form action="#">
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
                                            <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="Houses" :reduce="(item) => item.value" placeholder="House"/>

                                        </div>
                                    </div>

                                    <div>
                                        <label for="buy-min-price" class="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                        <div class="filter-search-form relative filter-border mt-2">
                                            <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                            <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="minPrice" :reduce="(item) => item.value" placeholder="Min Price"/>

                                        </div>
                                    </div>

                                    <div>
                                        <label for="buy-max-price" class="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                        <div class="filter-search-form relative mt-2">
                                            <CircleDollarSign class="icons" :style="{ width: 20,height:20 }"/>
                                            <v-select class="custom-vselect form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" :options="maxPrice" :reduce="(item) => item.value"  placeholder="Max Price"/>

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
            </div>
        </div>
    </section>

     <section class="relative md:pb-24 pb-16">
        <About />
        <Feature />

        <div class="relative md:pb-24 pb-16">
            <PropertyTwo />
        </div>

        <Cta />
        
        <Partner />

        <ClientTwo />
        
        <GetInTuch />
    </section>
    <Footer />
    <Switcher />

</template>

<script setup>
import Navbar from '@/component/navbar.vue';
import About from '@/component/about.vue';
import Feature from '@/component/feature.vue';
import PropertyTwo from '@/component/property-two.vue';
import Cta from '@/component/cta.vue';
import Partner from '@/component/partner.vue';
import ClientTwo from '@/component/client-two.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import BackgroudImage from "@/assets/images/bg/04.jpg";

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