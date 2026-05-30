<template>
    <div class="container-fluid relative px-3">
        <div class="layout-specing">
            <div class="md:flex justify-between items-center">
                <h5 class="text-lg font-semibold">Email</h5>

                <ul class="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                    <li class="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-primary dark:hover:text-white"><RouterLink to="/">Hously</RouterLink></li>
                    <li class="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i class="ri-arrow-right-s-line"></i></li>
                    <li class="inline-block capitalize text-[16px] font-medium text-primary dark:text-white" aria-current="page">Email</li>
                </ul>
            </div>

            <div class="grid md:grid-cols-12 grid-cols-1 mt-6 gap-2">
                <div class="xl:col-span-2 lg:col-span-3 md:col-span-4">
                    <div class="rounded-md shadow-sm dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900">
                        <RouterLink to="" @click.prevent="composeModal = !composeModal" class="py-2 px-5 inline-flex items-center justify-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md w-full"><Plus class="me-1"/> Compose</RouterLink>
                        <ul class="flex-column mt-3">
                            <li role="presentation" class="ml-0">
                                <button 
                                    @click="activeIndex = 0" 
                                    :class="activeIndex === 0 ? 'bg-primary text-white' : 'text-base hover:text-primary'"
                                    class="px-4 py-2 mt-3 font-semibold rounded-md w-full duration-500 text-start flex items-center"
                                >
                                    <Inbox :style="{ width: 17,height:17 }" class="me-1"/> 
                                    Inbox
                                </button>
                            </li>
                            <li role="presentation" class="ml-0">
                                <button 
                                    @click="activeIndex = 1" 
                                    :class="activeIndex === 1 ? 'bg-primary text-white' : 'text-base hover:text-primary'"
                                    class="px-4 py-2 mt-3 font-semibold rounded-md w-full duration-500 text-start flex items-center"
                                >
                                    <Star :style="{ width: 17,height:17 }" class="me-1"/> 
                                    Starred
                                </button>
                            </li>
                            <li role="presentation" class="ml-0">
                                <button 
                                    @click="activeIndex = 2" 
                                    :class="activeIndex === 2 ? 'bg-primary text-white' : 'text-base hover:text-primary'"
                                    class="px-4 py-2 mt-3 font-semibold rounded-md w-full duration-500 text-start flex items-center"
                                >
                                    <OctagonAlert :style="{ width: 17,height:17 }" class="me-1"/> 
                                    Spam
                                </button>
                            </li>
                            <li role="presentation" class="ml-0">
                                <button 
                                    @click="activeIndex = 3" 
                                    :class="activeIndex === 3 ? 'bg-primary text-white' : 'text-base hover:text-primary'"
                                    class="px-4 py-2 mt-3 font-semibold rounded-md w-full duration-500 text-start flex items-center"
                                >
                                    <Send :style="{ width: 17,height:17 }" class="me-1"/> 
                                    Sent
                                </button>
                            </li>
                            <li role="presentation" class="ml-0">
                                <button 
                                    @click="activeIndex = 4" 
                                    :class="activeIndex === 4 ? 'bg-primary text-white' : 'text-base hover:text-primary'"
                                    class="px-4 py-2 mt-3 font-semibold rounded-md w-full duration-500 text-start flex items-center"
                                >
                                    <MailPlus :style="{ width: 17,height:17 }" class="me-1"/> 
                                    Drafts
                                </button>
                            </li>
                            <li role="presentation" class="ml-0">
                                <button 
                                    @click="activeIndex = 5" 
                                    :class="activeIndex === 5 ? 'bg-primary text-white' : 'text-base hover:text-primary'"
                                    class="px-4 py-2 mt-3 font-semibold rounded-md w-full duration-500 text-start flex items-center"
                                >
                                    <Trash2 :style="{ width: 17,height:17 }" class="me-1"/> 
                                    Delete
                                </button>
                            </li>
                            <li role="presentation" class="ml-0">
                                <button 
                                    @click="activeIndex = 6" 
                                    :class="activeIndex === 6 ? 'bg-primary text-white' : 'text-base hover:text-primary'"
                                    class="px-4 py-2 mt-3 font-semibold rounded-md w-full duration-500 text-start flex items-center"
                                >
                                    <NotebookText :style="{ width: 17,height:17 }" class="me-1"/> 
                                    Notes
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div v-if="composeModal" class="fixed z-50 flex items-center justify-center overflow-hidden inset-0 m-auto bg-slate-900/50 dark:bg-slate-900/80">
                    <div class="relative w-full h-auto max-w-xl p-4">
                        <div class="relative bg-white dark:bg-slate-900 rounded-lg shadow-sm dark:shadow-gray-700">
                            <div class="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                                <h5 class="text-xl font-semibold">Compose</h5>
                                <button type="button" @click="composeModal = false" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ms-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                                    <X  :style="{ width: 14,height:14 }"/> 
                                </button>
                            </div>
                            <div class="p-6 text-center">
                                <form>
                                    <div class="grid md:grid-cols-12 grid-cols-1 gap-4">
                                        <div class="md:col-span-12">
                                            <div class="form-icon relative">
                                                <input name="email" id="toemail" type="email" class="form-input border border-gray-200! dark:border-gray-800!" placeholder="To"/>
                                            </div>
                                        </div>

                                        <div class="md:col-span-6">
                                            <div class="form-icon relative">
                                                <input name="email" id="ccemail" type="email" class="form-input border border-gray-200! dark:border-gray-800!" placeholder="Cc"/>
                                            </div>
                                        </div>

                                        <div class="md:col-span-6">
                                            <div class="form-icon relative">
                                                <input name="email" id="bccemail" type="email" class="form-input border border-gray-200! dark:border-gray-800!" placeholder="Bcc"/>
                                            </div>
                                        </div>

                                        <div class="md:col-span-12">
                                            <textarea name="comments" id="comments" class="form-input border border-gray-200! dark:border-gray-800!" placeholder="Message :"></textarea>
                                        </div>

                                        <div class="md:col-span-12">
                                            <button type="submit" id="submit" name="send" class="py-2 px-5 font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md justify-center flex items-center">Send Now</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:col-span-10 lg:col-span-9 md:col-span-8">
                    <div id="myTabContent" class="">
                        <div v-if="activeIndex === 0">
                            <div class="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 rounded-md">
                                <table class="w-full text-start">
                                    <thead class="text-base">
                                        <tr>
                                            <th class="text-start p-4 w-10 min-w-7.5 max-w-7.5">
                                                <input class="form-checkbox rounded-sm border-gray-200 dark:border-gray-800 text-primary focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" type="checkbox" value="" id="allcheck"/>
                                            </th>
                                            <th class="text-center p-4 w-10 min-w-7.5 max-w-7.5"></th>
                                            <th class="text-start font-medium p-4 w-48 min-w-50">Name</th>
                                            <th class="text-start font-medium p-4 w-auto min-w-75">Subject</th>
                                            <th class="text-end font-medium p-4 w-48 min-w-50">Date & Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in inboxData" :key="index">
                                            <th class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <input class="form-checkbox rounded-sm border-gray-200 dark:border-gray-800 text-primary focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" type="checkbox" value="" id="firstcheck"/>
                                            </th>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <RouterLink to=""><i :class="item.star ? 'ri-star-s-fill text-yellow-500' : 'ri-star-s-line text-slate-400'" class="text-[18px] align-middle"></i></RouterLink>
                                            </td>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <RouterLink to="#" class="font-medium hover:text-primary">{{item.name}}</RouterLink>
                                            </td>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <span class="text-slate-400">{{item.subject}}</span>
                                            </td>
                                            <td class="text-end border-t border-gray-100 dark:border-gray-800 p-4">
                                                <span class="text-slate-400">{{item.time}}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="mt-4 flex items-center justify-between">
                                <div>
                                    <RouterLink to="#" class="size-8 inline-flex items-center justify-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 border-gray-100 dark:border-gray-700 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full"><i class="ri-arrow-left-s-line"></i></RouterLink>
                                    <RouterLink to="#" class="size-8 inline-flex items-center justify-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 border-gray-100 dark:border-gray-700 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full"><i class="ri-arrow-right-s-line"></i></RouterLink>
                                </div>

                                <span class="text-slate-400">Showing 1 - 10 out of 45</span>
                            </div>
                        </div>

                        <div v-if="activeIndex === 1">
                            <div class="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 rounded-md">
                                <table class="w-full text-start">
                                    <thead class="text-base">
                                        <tr>
                                            <th class="text-start p-4 w-10 min-w-7.5 max-w-7.5">
                                                <input class="form-checkbox rounded-sm border-gray-200 dark:border-gray-800 text-primary focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" type="checkbox" value="" id="allcheck"/>
                                            </th>
                                            <th class="text-center p-4 w-10 min-w-7.5 max-w-7.5"></th>
                                            <th class="text-start p-4 w-48 min-w-50">Name</th>
                                            <th class="text-start p-4 w-auto min-w-50">Subject</th>
                                            <th class="text-end p-4 w-48 min-w-50">Date & Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <input class="form-checkbox rounded-sm border-gray-200 dark:border-gray-800 text-primary focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" type="checkbox" value="" id="firstcheck"/>
                                            </th>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <RouterLink to=""><i class="ri-star-s-fill text-[18px] text-yellow-500 align-middle"></i></RouterLink>
                                            </td>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <RouterLink to="#" class="font-medium hover:text-primary" data-modal-toggle="emailpreview">Sherrie Miller</RouterLink>
                                            </td>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <span class="text-slate-400">Focused impactful open system 📷 😃</span>
                                            </td>
                                            <td class="text-end border-t border-gray-100 dark:border-gray-800 p-4">
                                                <span class="text-slate-400">8hours ago</span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <th class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <input class="form-checkbox rounded-sm border-gray-200 dark:border-gray-800 text-primary focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" type="checkbox" value="" id="firstcheck"/>
                                            </th>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <RouterLink to=""><i class="ri-star-s-fill text-[18px] text-yellow-500 align-middle"></i></RouterLink>
                                            </td>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <RouterLink to="#" class="font-medium hover:text-primary" data-modal-toggle="emailpreview">Ester Casella</RouterLink>
                                            </td>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <span class="text-slate-400">Theme Update</span>
                                            </td>
                                            <td class="text-end border-t border-gray-100 dark:border-gray-800 p-4">
                                                <span class="text-slate-400">7th August 2027</span>
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                            <th class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <input class="form-checkbox rounded-sm border-gray-200 dark:border-gray-800 text-primary focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" type="checkbox" value="" id="firstcheck"/>
                                            </th>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <RouterLink to=""><i class="ri-star-s-fill text-[18px] text-yellow-500 align-middle"></i></RouterLink>
                                            </td>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <RouterLink to="#" class="font-medium hover:text-primary" data-modal-toggle="emailpreview">Richard Benavides</RouterLink>
                                            </td>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <span class="text-slate-400">Your product has been updated!</span>
                                            </td>
                                            <td class="text-end border-t border-gray-100 dark:border-gray-800 p-4">
                                                <span class="text-slate-400">5th August 2027</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div v-if="activeIndex === 2">
                            <div class="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 rounded-md p-6">
                                <span class="text-slate-400">Hooray, no spam here!</span>
                            </div>
                        </div>

                        <div v-if="activeIndex === 3">
                            <div class="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 rounded-md">
                                <table class="w-full text-start">
                                    <thead class="text-base">
                                        <tr>
                                            <th class="text-start p-4 w-10 min-w-7.5 max-w-7.5">
                                                <input class="form-checkbox rounded-sm border-gray-200 dark:border-gray-800 text-primary focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" type="checkbox" value="" id="allcheck"/>
                                            </th>
                                            <th class="text-center p-4 w-10 min-w-7.5 max-w-7.5"></th>
                                            <th class="text-start p-4 w-48 min-w-50">Name</th>
                                            <th class="text-start p-4 w-auto min-w-50">Subject</th>
                                            <th class="text-end p-4 w-48 min-w-50">Date & Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <input class="form-checkbox rounded-sm border-gray-200 dark:border-gray-800 text-primary focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" type="checkbox" value="" id="firstcheck"/>
                                            </th>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <RouterLink to=""><i class="ri-star-s-line text-[18px] text-slate-400 align-middle"></i></RouterLink>
                                            </td>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <RouterLink to="#" class="font-medium hover:text-primary" data-modal-toggle="emailpreview">Calvin Carlo</RouterLink>
                                            </td>
                                            <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                                <span class="text-slate-400">Hously Customization</span>
                                            </td>
                                            <td class="text-end border-t border-gray-100 dark:border-gray-800 p-4">
                                                <span class="text-slate-400">03:05PM</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div v-if="activeIndex === 4">
                            <div class="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 rounded-md p-6">
                                <span class="text-slate-400">You don&apos;t have any saved drafts. Saving a draft allows you to keep a message you aren&apos;t ready to send yet.</span>
                            </div>
                        </div>
                        
                        <div v-if="activeIndex === 5">
                            <div class="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 rounded-md p-6">
                                <span class="text-slate-400">No conversations in Trash.</span>
                            </div>
                        </div>
                        
                        <div v-if="activeIndex === 6">
                            <div class="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 rounded-md p-6">
                                <span class="text-slate-400">No notes in Notes</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { inboxData } from '../data/data'

import {
    Inbox,
    NotebookText,
    Star,
    Plus,
    X,
    Trash2,
    Send,
    MailPlus,
    OctagonAlert
} from 'lucide-vue-next'

const composeModal = ref(false)
const activeIndex = ref(0)

onMounted(() => {
    document.documentElement.setAttribute('dir', 'ltr')
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
})
</script>