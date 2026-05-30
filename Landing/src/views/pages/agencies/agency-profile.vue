<template>
    <Navbar />

    <section class="relative md:py-24 pt-24 pb-16">
        <div class="container relative">
            <div class="grid grid-cols-1">
                <div class="p-6 rounded-md bg-primary/10 dark:bg-primary/20">
                    <div class="md:flex items-center">
                        <img :src="data?.image ? data.image : agency1" class="rounded-full size-28" alt=""/>

                        <div class="md:ms-4 md:mt-0 mt-4 md:flex justify-between items-end">
                            <div>
                                <h5 class="text-2xl font-medium">{{ data?.name ? data.name : 'Avenue Realty' }} <span class="text-base md:inline block md:mt-0 mt-2"><span class="text-slate-400"><span class="ri-circle-fill text-[12px] md:inline-block hidden"></span>Real Estate Agency</span></span></h5>

                                <ul class="list-none mt-2 md:flex items-center md:divide-x divide-slate-400">
                                    <li class="md:inline-flex flex">
                                        <ul class="text-amber-400 list-none">
                                            <li class="inline"><i class="ri-star-s-fill align-middle"></i></li>
                                            <li class="inline"><i class="ri-star-s-fill align-middle"></i></li>
                                            <li class="inline"><i class="ri-star-s-fill align-middle"></i></li>
                                            <li class="inline"><i class="ri-star-s-fill align-middle"></i></li>
                                            <li class="inline"><i class="ri-star-s-fill align-middle"></i></li>
                                            <li class="inline text-slate-900 dark:text-white">4.84(30)</li>
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
                        <h5 class="text-xl font-medium mb-4">Contact us</h5>

                        <form>
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
                    <h5 class="text-xl font-medium">About us</h5>
                    
                    <p class="text-slate-400 mt-3">Your real estate business needs a successful company name to better sell real estate and get found in more website search results and stand out on social media sites. Hello real estate agents, here is your inspiration list of catchy, unique, clever and cool, names and logos for your new small business.</p>
                    <p class="text-slate-400 mt-3">Real Estate's favorite three words - Location, Location, Location - Says it all.  A well-designed logo using the best fonts can communicate your realty company benefits in just a few words, attracting potential clients - both buyers and seller listings. This list features abstract real estate logos, modern styles, classic emblems and icon designs.</p>

                    <h5 class="text-xl font-medium mt-6">Our Agents</h5>

                    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-7.5">
                        <div v-for="(item, index) in agentData.slice(0, 6)" :key="index" class="group text-center">
                            <div class="relative inline-block mx-auto size-52 rounded-full overflow-hidden">
                                <img :src="item.image" class="" alt=""/>
                                <div class="absolute inset-0 bg-linear-to-b from-transparent to-slate-900 size-52 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>

                                <ul class="list-none absolute inset-s-0 inset-e-0 -bottom-20 group-hover:bottom-5 transition-all duration-500 ease-in-out">
                                    <li class="inline ms-1 rtl:me-1"><RouterLink to="" class="btn btn-icon btn-sm rounded-full! border border-primary bg-primary hover:border-primary hover:bg-primary text-white"><Facebook class="size-4"/></RouterLink></li>
                                    <li class="inline ms-1 rtl:me-1"><RouterLink to="" class="btn btn-icon btn-sm rounded-full! border border-primary bg-primary hover:border-primary hover:bg-primary text-white"><Instagram class="size-4"/></RouterLink></li>
                                    <li class="inline ms-1 rtl:me-1"><RouterLink to="" class="btn btn-icon btn-sm rounded-full! border border-primary bg-primary hover:border-primary hover:bg-primary text-white"><Linkedin class="size-4"/></RouterLink></li>
                                </ul>
                            </div>

                            <div class="content mt-3">
                                <RouterLink :to="`/agent-profile/${item.id}`" class="text-xl font-medium hover:text-primary transition-all duration-500 ease-in-out">{{item.name}}</RouterLink>
                                <p class="text-slate-400">{{item.position}}</p>
                            </div>
                        </div>
                    </div>
                    
                    <h5 class="text-xl font-medium mt-6">Our Listings</h5>

                    <div class="grid lg:grid-cols-2 grid-cols-1 mt-4 gap-7.5">
                        <div v-for="(item, index) in properties.slice(0, 6)" :key="index"  class="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
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

import { agencyData, agentData, properties } from '@/component/data/data'

import { useRoute } from 'vue-router'

import agency1 from '@/assets/images/agency/1.png'

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

// For Route
const route = useRoute()

const data = agencyData.find(
    (agent) => agent.id === parseInt(route.params.id)
)
</script>