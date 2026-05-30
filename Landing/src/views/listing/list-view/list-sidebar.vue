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

    <section class="relative lg:py-24 py-16">
        <div class="container">
            <div class="grid md:grid-cols-12 grid-cols-1 gap-7.5">
                <div class="lg:col-span-4 md:col-span-6">
                    <div class="shadow shadow-gray-200 dark:shadow-gray-700 p-6 rounded-xl bg-white dark:bg-slate-900 sticky top-20">
                        <form>
                            <div class="grid grid-cols-1 gap-3">
                                <div>
                                    <label for="searchname" class="font-medium">Search Properties</label>
                                    <div class="relative mt-2">
                                        <Search class="text-lg absolute top-2 inset-s-3" :style="{ width: 18,height:18 }"/>
                                        <input name="search" id="searchname" type="text" class="form-input border border-gray-200! dark:border-gray-800! ps-10!" placeholder="Search" />
                                    </div>
                                </div>

                                <div>
                                    <label class="font-medium">Categories</label>
                                    <select class="form-select form-input border border-gray-200! dark:border-gray-800! block w-full mt-1">
                                        <option value="re">Residential</option>
                                        <option value="la">Land</option>
                                        <option value="co">Commercial</option>
                                        <option value="ind">Industrial</option>
                                        <option value="inv">Investment</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="font-medium">Location</label>
                                    <select class="form-select form-input border border-gray-200! dark:border-gray-800! block w-full mt-1">
                                        <option value="DXB">Dubai</option>
                                        <option value="AUH">Abu Dhabi</option>
                                        <option value="SHJ">Sharjah</option>
                                        <option value="AJM">Ajman</option>
                                        <option value="RAK">Ras Al Khaimah</option>
                                        <option value="FUJ">Fujairah</option>
                                        <option value="UAQ">Umm Al Quwain</option>
                                    </select>
                                </div>

                                <div>
                                    <input type="submit" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md w-full" value="Apply Filter" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="lg:col-span-8 md:col-span-6">
                    <PaginationTwo :itemsPerPage="6" :items="properties" gridClass="grid grid-cols-1 gap-7.5" />
                </div>
            </div>
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

import { Search } from 'lucide-vue-next'
</script>