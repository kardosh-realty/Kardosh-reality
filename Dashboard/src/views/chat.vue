<template>
    <div class="container-fluid relative px-3">
        <div class="layout-specing">
            <div class="md:flex justify-between items-center">
                <h5 class="text-lg font-semibold">Chatbox</h5>

                <ul class="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                    <li class="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-primary dark:hover:text-white"><RouterLink to="/">Hously</RouterLink></li>
                    <li class="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i class="ri-arrow-right-s-line"></i></li>
                    <li class="inline-block capitalize text-[16px] font-medium text-primary dark:text-white" aria-current="page">Chat</li>
                </ul>
            </div>

            <div class="grid md:grid-cols-12 grid-cols-1 mt-6 gap-2">
                <div class="xl:col-span-3 lg:col-span-5 md:col-span-5">
                    <div class="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900">
                        <div class="text-center p-6 border-b border-gray-100 dark:border-gray-800">
                            <img :src="client7" class="size-20 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700 mx-auto" alt=""/>
                            <h5 class="mt-3 font-medium text-xl mb-0">Calvin Carlo</h5>
                            <p class="text-slate-400 mb-0">Property Dealer</p>
                        </div>

                        <SimpleBar class="p-2 max-h-120.5">
                            <RouterLink v-for="(item, index) in chatData" :key="index" to="#" 
                                :class="item.bg === 'true'
                                    ? 'flex items-center p-2 rounded-md relative bg-gray-50 dark:bg-slate-800'
                                    : 'flex items-center p-2 rounded-md relative hover:bg-gray-50 dark:hover:bg-slate-800 mt-1.5'"
                            >
                                <div class="relative">
                                    <img :src="item.image" class="size-11 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                        <span v-if="item.status === 'online'" class="absolute top-0.5 inset-s-0.5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full size-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-primary after:top-0 after:inset-e-0 after:rounded-full after:animate-ping"></span>
                                        <span v-else class="absolute top-0.5 inset-s-0.5 flex items-center justify-center bg-red-600 text-white text-[10px] font-bold rounded-full size-2"></span>
                                </div>
                                <div class="overflow-hidden flex-1 ms-2">
                                    <div class="flex justify-between">
                                        <h6 class="font-semibold">{{item.name}}</h6>
                                        <small class="text-slate-400">{{item.time}}</small>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-400 dark:text-white font-medium truncate">{{item.msg}}</span>
                                            <span v-if="item.unReadMsg !== ''" class="flex items-center justify-center bg-red-600/20 text-red-600 text-[10px] font-bold rounded-full w-5 max-h-5">
                                                {{item.unReadMsg}}
                                            </span>
                                    </div>
                                </div>
                            </RouterLink>
                        </SimpleBar>
                    </div>
                </div>

                <div class="xl:col-span-9 lg:col-span-7 md:col-span-7">
                    <div class="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900">
                        <div class="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 p-4">
                            <div class="flex">
                                <img :src="client1" class="size-11 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                <div class="overflow-hidden ms-3">
                                    <RouterLink to="#" class="block font-semibold text-truncate">Cristino Murfy</RouterLink>
                                    <span class="text-slate-400 flex items-center text-sm"><span class="bg-primary text-white text-[10px] font-bold rounded-full size-2 me-1"></span> Online</span>
                                </div>
                            </div>

                            <div class="dropdown relative">
                                <button @click.stop="show = !show" class="dropdown-toggle items-center" type="button">
                                    <span class="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[20px] text-center bg-primary/5 hover:bg-primary border-primary/10 hover:border-primary text-primary hover:text-white rounded-md"><i class="ri-more-2-line"></i></span>
                                </button>
                                <div 
                                    v-show="show"
                                    @click.stop
                                    class="dropdown-menu absolute inset-e-0 m-0 mt-4 z-10 w-44 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700"
                                >
                                    <ul class="py-2 text-start">
                                        <li>
                                            <RouterLink to="" class="block py-1.5 px-4 hover:text-primary"><i class="ri-user-line"></i> Profile</RouterLink>
                                        </li>
                                        <li class="ms-0">
                                            <RouterLink to="" class="block py-1.5 px-4 hover:text-primary"><i class="ri-settings-line"></i> Profile Settings</RouterLink>
                                        </li>
                                        <li class="ms-0">
                                            <RouterLink to="" class="block py-1.5 px-4 hover:text-primary"><i class="ri-delete-bin-line"></i> Delete</RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <SimpleBar class="max-h-137">
                            <ul class="p-4 list-none mb-0 max-h-137">
                                <li>
                                    <div class="inline-block">
                                        <div class="flex mb-3">
                                            <div class="relative">
                                                <img :src="client1" class="size-9 min-w-9 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                                <span class="absolute top-0.5 inset-s-0.5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full size-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-primary after:top-0 after:inset-e-0 after:rounded-full after:animate-ping"></span>
                                            </div>
                                                
                                            <div class="ms-2 max-w-lg">
                                                <p class="bg-white dark:bg-slate-900 text-slate-400 text-[16px] shadow-sm shadow-gray-200 dark:shadow-gray-700 px-3 py-2 rounded-sm mb-1">Hey Calvin</p>
                                                <span class="text-slate-400 text-sm"><i class="ri-time-line font-normal me-1"></i>59 min ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="text-end">
                                    <div class="inline-block">
                                        <div class="flex mb-3">
                                            <div class="relative order-2">
                                                <img :src="client7" class="size-9 min-w-9 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                                <span class="absolute top-0.5 inset-e-0.5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full size-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-primary after:top-0 after:inset-e-0 after:rounded-full after:animate-ping"></span>
                                            </div>
                                                
                                            <div class="me-2 max-w-lg">
                                                <p class="bg-white dark:bg-slate-900 text-slate-400 text-[16px] shadow-sm shadow-gray-200 dark:shadow-gray-700 px-3 py-2 rounded-sm mb-1">Hello Cristino</p>
                                                <span class="text-slate-400 text-sm"><i class="ri-time-line font-normal me-1"></i>45 min ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="text-end">
                                    <div class="inline-block">
                                        <div class="flex mb-3">
                                            <div class="relative order-2">
                                                <img :src="client7" class="size-9 min-w-9 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                                <span class="absolute top-0.5 inset-e-0.5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full size-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-primary after:top-0 after:inset-e-0 after:rounded-full after:animate-ping"></span>
                                            </div>
                                                
                                            <div class="me-2 max-w-lg">
                                                <p class="bg-white dark:bg-slate-900 text-slate-400 text-[16px] shadow-sm shadow-gray-200 dark:shadow-gray-700 px-3 py-2 rounded-sm mb-1">How can i help you?</p>
                                                <span class="text-slate-400 text-sm"><i class="ri-time-line font-normal me-1"></i>44 min ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="inline-block">
                                        <div class="flex mb-3">
                                            <div class="relative">
                                                <img :src="client1" class="size-9 min-w-9 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                                <span class="absolute top-0.5 inset-s-0.5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full size-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-primary after:top-0 after:inset-e-0 after:rounded-full after:animate-ping"></span>
                                            </div>
                                                
                                            <div class="ms-2 max-w-lg">
                                                <p class="bg-white dark:bg-slate-900 text-slate-400 text-[16px] shadow-sm shadow-gray-200 dark:shadow-gray-700 px-3 py-2 rounded-sm mb-1">Nice to meet you</p>
                                                <span class="text-slate-400 text-sm"><i class="ri-time-line font-normal me-1"></i>42 min ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="inline-block">
                                        <div class="flex mb-3">
                                            <div class="relative">
                                                <img :src="client1" class="size-9 min-w-9 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                                <span class="absolute top-0.5 inset-s-0.5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full size-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-primary after:top-0 after:inset-e-0 after:rounded-full after:animate-ping"></span>
                                            </div>
                                                
                                            <div class="ms-2 max-w-lg">
                                                <p class="bg-white dark:bg-slate-900 text-slate-400 text-[16px] shadow-sm shadow-gray-200 dark:shadow-gray-700 px-3 py-2 rounded-sm mb-1">Hope you are doing fine?</p>
                                                <span class="text-slate-400 text-sm"><i class="ri-time-line font-normal me-1"></i>40 min ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="text-end">
                                    <div class="inline-block">
                                        <div class="flex mb-3">
                                            <div class="relative order-2">
                                                <img :src="client7" class="size-9 min-w-9 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                                <span class="absolute top-0.5 inset-e-0.5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full size-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-primary after:top-0 after:inset-e-0 after:rounded-full after:animate-ping"></span>
                                            </div>
                                                
                                            <div class="me-2 max-w-lg">
                                                <p class="bg-white dark:bg-slate-900 text-slate-400 text-[16px] shadow-sm shadow-gray-200 dark:shadow-gray-700 px-3 py-2 rounded-sm mb-1">I'm good thanks for asking</p>
                                                <span class="text-slate-400 text-sm"><i class="ri-time-line font-normal me-1"></i>38 min ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="inline-block">
                                        <div class="flex mb-3">
                                            <div class="relative">
                                                <img :src="client1" class="size-9 min-w-9 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                                <span class="absolute top-0.5 inset-s-0.5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full size-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-primary after:top-0 after:inset-e-0 after:rounded-full after:animate-ping"></span>
                                            </div>
                                                
                                            <div class="ms-2 max-w-lg">
                                                <p class="bg-white dark:bg-slate-900 text-slate-400 text-[16px] shadow-sm shadow-gray-200 dark:shadow-gray-700 px-3 py-2 rounded-sm mb-1">I am intrested to know more about your prices and services you offer</p>
                                                <span class="text-slate-400 text-sm"><i class="ri-time-line font-normal me-1"></i>35 min ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="text-end">
                                    <div class="inline-block">
                                        <div class="flex mb-3">
                                            <div class="relative order-2">
                                                <img :src="client7" class="size-9 min-w-9 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                                <span class="absolute top-0.5 inset-e-0.5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full size-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-primary after:top-0 after:inset-e-0 after:rounded-full after:animate-ping"></span>
                                            </div>
                                                
                                            <div class="me-2 max-w-lg">
                                                <p class="bg-white dark:bg-slate-900 text-slate-400 text-[16px] shadow-sm shadow-gray-200 dark:shadow-gray-700 px-3 py-2 rounded-sm mb-1">Sure please check below link to find more useful information <a href="https://shreethemes.in/hously/" target="_blank" class="text-primary">https://shreethemes.in/hously/</a></p>
                                                <span class="text-slate-400 text-sm"><i class="ri-time-line font-normal me-1"></i>29 min ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="inline-block">
                                        <div class="flex mb-3">
                                            <div class="relative">
                                                <img :src="client1" class="size-9 min-w-9 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                                <span class="absolute top-0.5 inset-s-0.5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full size-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-primary after:top-0 after:inset-e-0 after:rounded-full after:animate-ping"></span>
                                            </div>
                                                
                                            <div class="ms-2 max-w-lg">
                                                <p class="bg-white dark:bg-slate-900 text-slate-400 text-[16px] shadow-sm shadow-gray-200 dark:shadow-gray-700 px-3 py-2 rounded-sm mb-1">Thank you 😊</p>
                                                <span class="text-slate-400 text-sm"><i class="ri-time-line font-normal me-1"></i>26 min ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li class="text-end">
                                    <div class="inline-block">
                                        <div class="flex mb-3">
                                            <div class="relative order-2">
                                                <img :src="client7" class="size-9 min-w-9 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                                <span class="absolute top-0.5 inset-e-0.5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full size-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-primary after:top-0 after:inset-e-0 after:rounded-full after:animate-ping"></span>
                                            </div>
                                                
                                            <div class="me-2 max-w-lg">
                                                <p class="bg-white dark:bg-slate-900 text-slate-400 text-[16px] shadow-sm shadow-gray-200 dark:shadow-gray-700 px-3 py-2 rounded-sm mb-1">Welcome</p>
                                                <span class="text-slate-400 text-sm"><i class="ri-time-line font-normal me-1"></i>15 min ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="inline-block">
                                        <div class="flex items-center mb-3">
                                            <div class="relative">
                                                <img :src="client1" class="size-9 min-w-9 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                                <span class="absolute top-0.5 inset-s-0.5 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full size-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-primary after:top-0 after:inset-e-0 after:rounded-full after:animate-ping"></span>
                                            </div>
                                                
                                            <div class="ms-2 max-w-lg">
                                                <p class="text-slate-400 text-sm rounded-sm mb-1">Cristino is typing
                                                    <span class="animate-typing ms-1">
                                                        <span class="dot inline-block size-1 bg-slate-400 -mr-px opacity-60 rounded-full"></span>
                                                        <span class="dot inline-block size-1 bg-slate-400 -mr-px opacity-60 rounded-full"></span>
                                                        <span class="dot inline-block size-1 bg-slate-400 -mr-px opacity-60 rounded-full"></span>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </SimpleBar>

                        <div class="p-2 border-t border-gray-100 dark:border-gray-800">
                            <div class="flex ">
                                <input type="text" class="form-input w-full py-2 px-3 h-9! bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-sm outline-none border border-gray-100! dark:border-gray-800! focus:ring-0" placeholder="Enter Message..."/>

                                <div class="min-w-31.25 text-end">
                                    <RouterLink to="#" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[16px] text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md"><i class="ri-send-plane-line"></i></RouterLink>
                                    <RouterLink to="#" class="size-9 mx-1 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[16px] text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md"><i class="ri-emotion-happy-line"></i></RouterLink>
                                    <RouterLink to="#" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[16px] text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md"><i class="ri-attachment-2"></i></RouterLink>
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

import client7 from '@/assets/images/client/07.jpg'
import client1 from '@/assets/images/client/01.jpg'

import SimpleBar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

import { chatData } from '@/data/data'

const show = ref(false)

const closeModal = () => {
    show.value = false
}

onMounted(() => {
    document.addEventListener('mousedown', closeModal)
})

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', closeModal)
})
</script>