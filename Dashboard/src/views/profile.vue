<template>
    <div class="container-fluid relative px-3">
        <div class="layout-specing">
            <div class="grid grid-cols-1">
                <div class="profile-banner relative text-transparent rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 overflow-hidden">
                    <input id="pro-banner" name="profile-banner" type="file" class="hidden"/>
                    <div class="relative shrink-0">
                        <img :src="bg1" class="h-80 w-full object-cover" id="profile-banner" alt=""/>
                        <div class="absolute inset-0 bg-slate-900/70"></div>
                        <label class="absolute inset-0 cursor-pointer" for="pro-banner"></label>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-12 grid-cols-1">
                <div class="xl:col-span-3 lg:col-span-4 md:col-span-4 mx-6">
                    <div class="p-6 relative rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900 -mt-48">
                        <div class="profile-pic text-center mb-5">
                            <input id="pro-img" name="profile-image" type="file" class="hidden" @change="handleChange" />
                            <div>
                                <div class="relative size-24 mx-auto">
                                    <img :src="file" class="rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700 ring-4 ring-slate-50 dark:ring-slate-800" id="profile-image" alt=""/>
                                    <label class="absolute inset-0 cursor-pointer" for="pro-img"></label>
                                </div>

                                <div class="mt-4">
                                    <h5 class="text-lg font-semibold">Calvin Carlo</h5>
                                    <p class="text-slate-400">calvin@hotmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div class="border-t border-gray-100 dark:border-gray-700">
                            <h5 class="text-xl font-semibold mt-4">Personal Details :</h5>
                            <div class="mt-4">
                                <div class="flex items-center">
                                    <Mail class="fea icon-ex-md text-slate-400 me-3 size-6"/>
                                    <div class="flex-1">
                                        <h6 class="text-primary dark:text-white font-medium mb-0">Email :</h6>
                                        <RouterLink to="" class="text-slate-400">calvin@hotmail.com</RouterLink>
                                    </div>
                                </div>
                                <div class="flex items-center mt-3">
                                    <Bookmark class="fea icon-ex-md text-slate-400 me-3 size-6"/>
                                    <div class="flex-1">
                                        <h6 class="text-primary dark:text-white font-medium mb-0">Skills :</h6>
                                        <RouterLink to="" class="text-slate-400">html</RouterLink>, <RouterLink to="" class="text-slate-400">css</RouterLink>, <RouterLink to="" class="text-slate-400">js</RouterLink>, <RouterLink to="" class="text-slate-400">mysql</RouterLink>
                                    </div>
                                </div>
                                <div class="flex items-center mt-3">
                                    <Italic class="fea icon-ex-md text-slate-400 me-3 size-6"/>
                                    <div class="flex-1">
                                        <h6 class="text-primary dark:text-white font-medium mb-0">Language :</h6>
                                        <RouterLink to="" class="text-slate-400">English</RouterLink>, <RouterLink to="" class="text-slate-400">Japanese</RouterLink>, <RouterLink to="" class="text-slate-400">Chinese</RouterLink>
                                    </div>
                                </div>
                                <div class="flex items-center mt-3">
                                    <Globe class="fea icon-ex-md text-slate-400 me-3 size-6" />
                                    <div class="flex-1">
                                        <h6 class="text-primary dark:text-white font-medium mb-0">Website :</h6>
                                        <RouterLink to="" class="text-slate-400">www.cristina.com</RouterLink>
                                    </div>
                                </div>
                                <div class="flex items-center mt-3">
                                    <Gift class="fea icon-ex-md text-slate-400 me-3 size-6"/>
                                    <div class="flex-1">
                                        <h6 class="text-primary dark:text-white font-medium mb-0">Birthday :</h6>
                                        <p class="text-slate-400 mb-0">2nd March, 1996</p>
                                    </div>
                                </div>
                                <div class="flex items-center mt-3">
                                    <MapPin class="fea icon-ex-md text-slate-400 me-3 size-6"/>
                                    <div class="flex-1">
                                        <h6 class="text-primary dark:text-white font-medium mb-0">Location :</h6>
                                        <RouterLink to="" class="text-slate-400">Beijing, China</RouterLink>
                                    </div>
                                </div>
                                <div class="flex items-center mt-3">
                                    <Phone class="fea icon-ex-md text-slate-400 me-3 size-6"/>
                                    <div class="flex-1">
                                        <h6 class="text-primary dark:text-white font-medium mb-0">Cell No :</h6>
                                        <RouterLink to="" class="text-slate-400">(+12) 1254-56-4896</RouterLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:col-span-9 lg:col-span-8 md:col-span-8 mt-6">
                    <div class="grid grid-cols-1 gap-6">
                        <div class="p-6 relative rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900">
                            <h5 class="text-xl font-semibold">Calvin Carlo</h5>
                
                            <p class="text-slate-400 mt-3">I have started my career as a trainee and prove my self and achieve all the milestone with good guidance and reach up to the project manager. In this journey, I understand all the procedure which make me a good developer, team leader, and a project manager.</p>
                        </div>

                        <div class="p-6 relative rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900">
                            <h5 class="text-xl font-semibold">My Property :</h5>
        
                            <div class="grid lg:grid-cols-3 md:grid-cols-2 mt-6 gap-6">
                                <div v-for="(item, index) in propertiesData.slice(0, 6)" :key="index" class="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500" key={index}>
                                    <div class="relative">
                                        <img :src="item.image" alt=""/>
            
                                        <div class="absolute top-4 inset-e-4">
                                            <RouterLink to="#" class="btn btn-icon bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-full! text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"><i class="ri-heart-fill text-[20px]"></i></RouterLink>
                                        </div>
                                    </div>
            
                                    <div class="p-6">
                                        <div class="pb-6">
                                            <RouterLink to="/property-detail" class="text-lg hover:text-primary font-medium ease-in-out duration-500">{{item.name}}</RouterLink>
                                        </div>
            
                                        <ul class="py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none">
                                            <li class="flex items-center me-4">
                                                <i class="ri-expand-diagonal-line text-2xl me-2 text-primary"></i>
                                                <span>{{item.sqf}}</span>
                                            </li>
            
                                            <li class="flex items-center me-4">
                                                <i class="ri-layout-4-line text-2xl me-2 text-primary"></i>
                                                <span>{{item.beds}}</span>
                                            </li>
            
                                            <li class="flex items-center">
                                                <i class="ri-shape-line text-2xl me-2 text-primary"></i>
                                                <span>{{item.baths}}</span>
                                            </li>
                                        </ul>
            
                                        <ul class="pt-6 flex justify-between items-center list-none">
                                            <li>
                                                <span class="text-slate-400">Price</span>
                                                <p class="text-lg font-medium">{{item.value}}</p>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import {
    Mail,
    Bookmark,
    Italic,
    Globe,
    Gift,
    MapPin,
    Phone
} from 'lucide-vue-next'

import bg1 from '@/assets/images/bg.jpg'
import client7 from '@/assets/images/client/07.jpg'

import { propertiesData } from '@/data/data'

const file = ref(client7)

const handleChange = (e) => {
    const selectedFile = e.target.files[0]

    if (selectedFile) {
        file.value = URL.createObjectURL(selectedFile)
    }
}
</script>