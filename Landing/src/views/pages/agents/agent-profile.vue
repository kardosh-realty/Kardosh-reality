<template>
    <Navbar />

    <section class="relative md:py-24 pt-24 pb-16">
        <div class="container relative">
            <div class="grid grid-cols-1">
                <div class="p-6 rounded-md bg-primary/10 dark:bg-primary/20">
                    <div class="md:flex items-center">
                        <img :src="data?.image ? data.image : client1" class="rounded-full size-28" alt=""/>

                        <div class="md:ms-4 md:mt-0 mt-4 md:flex justify-between items-end">
                            <div>
                                <h5 class="text-2xl font-medium">{{ data?.name ? data.name : 'Amber Durden' }} <span class="text-base md:inline block md:mt-0 mt-2"><span class="text-slate-400"><span class="ri-circle-fill text-[12px] md:inline-block hidden"></span> Broker</span> of <RouterLink to="/agency-profile" class="hover:text-primary">Highrises Realty</RouterLink></span></h5>

                                <ul class="list-none mt-2 md:flex items-center md:divide-x divide-slate-400">
                                    <li class="md:inline-flex flex">
                                        <ul class="text-amber-400 list-none">
                                            <li class="inline ms-1 rtl:me-1 rtl:ms-0"><i class="ri-star-s-fill align-middle"></i></li>
                                            <li class="inline ms-1 rtl:me-1 rtl:ms-0"><i class="ri-star-s-fill align-middle"></i></li>
                                            <li class="inline ms-1 rtl:me-1 rtl:ms-0"><i class="ri-star-s-fill align-middle"></i></li>
                                            <li class="inline ms-1 rtl:me-1 rtl:ms-0"><i class="ri-star-s-fill align-middle"></i></li>
                                            <li class="inline ms-1 rtl:me-1 rtl:ms-0"><i class="ri-star-s-fill align-middle"></i></li>
                                            <li class="inline ms-1 rtl:me-1 rtl:ms-0 text-slate-900 dark:text-white">4.84(30)</li>
                                        </ul>
                                    </li>

                                    <li class="md:inline-flex flex items-center md:mx-2 md:mt-0 mt-2 md:px-2"><Phone class="size-4 align-middle text-primary me-2"/> +(458) 456-7854</li>

                                    <li class="md:inline-flex flex items-center md:mx-2 md:mt-0 mt-2 md:px-2">
                                        <ul class="list-none">
                                            <li class="inline me-1 rtl:me-0 ms-0 rtl:ms-1"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-300 dark:border-gray-400 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary dark:hover:border-primary"><Facebook class="size-4"/></RouterLink></li>
                                            <li class="inline me-1 rtl:me-0 ms-0 rtl:ms-1"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-300 dark:border-gray-400 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary dark:hover:border-primary"><Instagram class="size-4"/></RouterLink></li>
                                            <li class="inline me-1 rtl:me-0 ms-0 rtl:ms-1"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-300 dark:border-gray-400 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary dark:hover:border-primary"><Twitter class="size-4"/></RouterLink></li>
                                            <li class="inline me-1 rtl:me-0 ms-0 rtl:ms-1"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-300 dark:border-gray-400 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary dark:hover:border-primary"><Linkedin class="size-4"/></RouterLink></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      <div class="container relative mt-6">
            <div class="grid md:grid-cols-12 grid-cols-1 gap-7.5">
                <div class="lg:col-span-4 md:col-span-5 order-1 md:order-1">
                    <div class="p-6 rounded-sm shadow-sm shadow-gray-200 dark:shadow-gray-700 sticky top-20">
                        <h5 class="text-xl font-medium mb-4">Contact me</h5>

                        <form>
                            <p class="mb-0" id="error-msg"></p>
                            <div id="simple-msg"></div>
                            <div class="grid grid-cols-1 gap-3">
                                <div>
                                    <label for="name" class="font-medium">Your Name:</label>
                                    <input name="name" id="name" type="text" class="form-input border border-gray-200! dark:border-gray-800! mt-2" placeholder="Name :"/>
                                </div>

                                <div>
                                    <label for="email" class="font-medium">Your Email:</label>
                                    <input name="email" id="email" type="email" class="form-input border border-gray-200! dark:border-gray-800! mt-2" placeholder="Email :"/>
                                </div>

                                <div>
                                    <label for="subject" class="font-medium">Your Question:</label>
                                    <input name="subject" id="subject" class="form-input border border-gray-200! dark:border-gray-800! mt-2" placeholder="Subject :"/>
                                </div>

                                <div>
                                    <label for="comments" class="font-medium">Your Comment:</label>
                                    <textarea name="comments" id="comments" class="form-input border border-gray-200! dark:border-gray-800! mt-2 textarea" placeholder="Message :"></textarea>
                                </div>

                                <button type="submit" id="submit" name="send" class="btn bg-primary hover:bg-primary-dark text-white rounded-md">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="lg:col-span-8 md:col-span-7 order-1 md:order-2">
                    <h5 class="text-xl font-medium">About me</h5>
                    
                    <p class="text-slate-400 mt-3">Obviously I'M Property Broker. Property Broker with over 3 years of experience. Experienced with all stages of the agent or broker cycle for dynamic properties. The as opposed to using 'Content here, content here', making it look like readable English.</p>
                    <p class="text-slate-400 mt-3">Data Structures and Algorithms are the heart of programming. Initially most of the developers do not realize its importance but when you will start your career in software development, you will find your code is either taking too much time or taking too much space.</p>
                    
                    <h5 class="text-xl font-medium mt-6">My Listings</h5>

                    <div class="grid lg:grid-cols-2 grid-cols-1 mt-4 gap-7.5">
                        <div v-for="(item, index) in properties" :key="index" class="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
                            <div class="relative">
                                <img :src="item.image" alt=""/>
    
                                <div class="absolute top-4 inset-e-4">
                                    <RouterLink to="#" class="btn btn-icon bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-full! text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"><i class="ri-heart-fill text-[20px]"></i></RouterLink>
                                </div>
                            </div>
    
                            <div class="p-6">
                                <div class="pb-6">
                                    <RouterLink :to="`/property-detail/${item.id}`" class="text-lg hover:text-primary font-medium ease-in-out duration-500">{{item.name}}</RouterLink>
                                </div>
    
                                <ul class="py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none">
                                    <li class="flex items-center me-4">
                                        <Maximize class="text-2xl me-2 text-primary"/>
                                        <span>{{ '185 sqm' }}</span>
                                    </li>
    
                                    <li class="flex items-center me-4">
                                        <Bed class="text-2xl me-2 text-primary"/>
                                        <span>4 Beds</span>
                                    </li>
    
                                    <li class="flex items-center">
                                        <Bath class="text-2xl me-2 text-primary"/>
                                        <span>4 Baths</span>
                                    </li>
                                </ul>
    
                                <ul class="pt-6 flex justify-between items-center list-none">
                                    <li>
                                        <span class="text-slate-400">Price</span>
                                        <p class="text-lg font-medium">AED 2,850,000</p>
                                    </li>
    
                                    <li>
                                        <span class="text-slate-400">Rating</span>
                                        <ul class="text-lg font-medium text-amber-400 list-none">
                                            <li class="inline"><i class="ri-star-s-fill"></i></li>
                                            <li class="inline"><i class="ri-star-s-fill"></i></li>
                                            <li class="inline"><i class="ri-star-s-fill"></i></li>
                                            <li class="inline"><i class="ri-star-s-fill"></i></li>
                                            <li class="inline"><i class="ri-star-s-fill"></i></li>
                                            <li class="inline text-slate-900 dark:text-white">5.0(30)</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
    
                    <div class="md:flex justify-center text-center mt-6">
                        <div class="md:w-full">
                            <RouterLink to="/grid" class="btn btn-link text-primary hover:text-primary after:bg-primary transition duration-500">View More Properties <ArrowRight :style="{ width: 17,height:17 }" class="ms-1"/></RouterLink>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </section>
    <Footer />
    <Switcher />
</template>

<script setup>
import { formatAed, formatArea } from '@/config/uae'
import Navbar from '@/component/navbar.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import { useRoute } from 'vue-router'

import client1 from '@/assets/images/client/03.jpg'

import {
    ArrowRight,
    Facebook,
    Instagram,
    Linkedin,
    Phone,
    Twitter,
    Bath,
    Maximize,
    Bed
} from 'lucide-vue-next'

import { agentData, properties } from '@/component/data/data'

// For Route
const route = useRoute()

const data = agentData.find(
    (agent) => agent.id === parseInt(route.params.id)
)
</script>