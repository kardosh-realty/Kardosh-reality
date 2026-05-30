<template>
    <Navbar navClass="navbar-white" />

    <section
        :style="{backgroundImage: `url(${BackgroundImage})`}"
        class="relative table w-full pt-24 pb-20 lg:pt-28 lg:pb-24 bg-no-repeat bg-center bg-cover">
        <div class="absolute inset-0 bg-slate-900/80"></div>
        <div class="container relative z-[1] text-center">
            <KardoshBreadcrumbs variant="hero" />
            <div class="grid grid-cols-1 mt-6">
                <h3 class="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Sell Faster. Save Thousands of Dirhams.</h3>
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

    <section class="relative md:pb-24 pb-16">
        <Feature />
        <div class="container lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Brokerage Calculator</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <div class="md:flex justify-center mt-8">
                <div class="lg:w-3/5 md:w-4/5">
                    <div class="p-6 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md" role="form">
                        <ul class="list-none flex justify-between">
                            <li class="h6">Min AED 500,000</li>
                            <li class="h6">Max AED 50,000,000</li>
                        </ul>

                        <div class="row">
                            <div class="col-sm-12 mb-4">
                                <label for="slider" class="form-label"></label>
                                <input id="slider" v-model="sliderValue" type="range" defaultValue="10000" min="10000" max="200000" class="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                            </div>
                        </div>

                        <ul class="list-none text-center md:flex justify-between">
                            <li>
                                <ul class="text-md-start brokerage-form list-none">
                                    <li class="font-medium"><label class="control-label">Total Value ($)</label></li>
                                    <li><input type="hidden" id="amount" class="form-control" /><span class="text-primary">$</span> <p class="inline-block h5 text-primary" id="amount-label">{{ sliderValue }}</p></li>
                                </ul>
                            </li>

                            <li class="mt-2 mt-sm-0">
                                <ul class="text-md-end brokerage-form list-none">
                                    <li class="font-medium"><label class="control-label">Brokerage Fee ($)</label></li>
                                    <li><input type="hidden" id="saving" class="form-control" /><span class="text-primary">$</span> <p class="inline-block h5 text-primary" id="saving-label">{{ brokerageFee }}</p></li>
                                </ul>
                            </li>
                        </ul>
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
import { ref, onMounted, watch } from 'vue'

import Navbar from '@/component/navbar.vue';
import KardoshBreadcrumbs from '@/component/kardosh/KardoshBreadcrumbs.vue'
import Feature from '@/component/feature.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import { PAGE_HERO_IMAGES } from '@/config/dubai-images'

const BackgroundImage = PAGE_HERO_IMAGES.sell

const sliderValue = ref(10000)
const brokerageFee = ref(100)

const updateBrokerage = () => {
    brokerageFee.value = (sliderValue.value * 0.01).toFixed(2)
}

onMounted(() => {
    updateBrokerage()
})

watch(sliderValue, () => {
    updateBrokerage()
})
</script>