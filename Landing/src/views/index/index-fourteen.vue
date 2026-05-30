<template>
    <Navbar />

    <section class="relative pt-36">
        <div class="container relative">
            <div class="grid md:grid-cols-12 grid-cols-1 items-center">
                <div class="xl:col-span-8 lg:col-span-7 md:col-span-6 col-span-12">
                    <h1 class="font-semibold leading-none text-4xl xl:text-7xl lg:text-6xl">Smart Real Estate Investments</h1>
                </div>
                <div class="xl:col-span-4 lg:col-span-5 md:col-span-6 col-span-12 md:mt-0 mt-6">
                    <p class="text-slate-400 text-xl max-w-xl">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>

                    <div class="flex justify-between items-center mt-4">
                        <ul class="list-none relative leading-0">
                            <li class="inline-block relative"><RouterLink to="#"><img :src="c1" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt="" /></RouterLink></li>
                            <li class="inline-block relative -ms-4"><RouterLink to="#"><img :src="c2" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt="" /></RouterLink></li>
                            <li class="inline-block relative -ms-4"><RouterLink to="#"><img :src="c3" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt="" /></RouterLink></li>
                            <li class="inline-block relative -ms-4"><RouterLink to="#"><img :src="c4" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt="" /></RouterLink></li>
                        </ul>

                        <RouterLink to="#" class="btn bg-primary hover:bg-primary-dark text-white rounded-md">See More</RouterLink>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid relative md:mx-4 mx-2 mt-12">
            <div ref="jarallaxRef" class="relative overflow-hidden py-72 bg-no-repeat table w-full rounded-2xl shadow-sm dark:shadow-gray-700 jarallax"
                :style="{backgroundImage: `url(${bg9})`}"></div>
        </div>
    </section>

    <section class="relative md:pb-24 pb-16">
        <div class="container relative">
            <div class="grid grid-cols-1 justify-center">
                <div class="relative -mt-32">
                    <div class="grid grid-cols-1">
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

                        <div id="StarterContent" class="p-6 bg-white dark:bg-slate-900 rounded-ss-none rounded-se-none md:rounded-se-xl rounded-xl shadow-md shadow-gray-200 dark:shadow-gray-700">
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
            </div>
        </div>

        <div class="container relative lg:mt-24 mt-16">
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

import { ref, onMounted, onUnmounted } from 'vue'

// For jarallax
import { jarallax } from 'jarallax'
import 'jarallax/dist/jarallax.css'

const jarallaxRef = ref(null)

onMounted(() => {

    if (jarallaxRef.value) {

        jarallax(jarallaxRef.value, {
            speed: 0.5
        })

    }

})

onUnmounted(() => {

    if (jarallaxRef.value?.jarallax) {
        jarallaxRef.value.jarallax.destroy()
    }

})

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

import c1 from '@/assets/images/client/01.jpg'
import c2 from '@/assets/images/client/02.jpg'
import c3 from '@/assets/images/client/03.jpg'
import c4 from '@/assets/images/client/04.jpg'
import bg9 from '@/assets/images/bg/9.jpg'
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