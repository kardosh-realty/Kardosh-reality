<template>
    <div class="container-fluid relative px-3">
        <div class="layout-specing">
            <div class="md:flex justify-between items-center">
                <div>
                    <h5 class="text-lg font-semibold">Frequently Asked Questions</h5>

                    <ul class="tracking-[0.5px] inline-block mt-2">
                        <li class="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-primary dark:hover:text-white"><RouterLink to="/">Hously</RouterLink></li>
                        <li class="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i class="ri-arrow-right-s-line"></i></li>
                        <li class="inline-block capitalize text-[16px] font-medium text-primary dark:text-white" aria-current="page">FAQs</li>
                    </ul>
                </div>

                <div>
                    <RouterLink to="#" class="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[20px] text-center bg-slate-800/5 hover:bg-slate-800/10 dark:bg-slate-700 border border-slate-100/5 dark:border-gray-700 text-slate-900 dark:text-white rounded-full" @click.prevent="show = true"><Plus class="size-4"/></RouterLink>
                </div>

                <div
                    :class="show ? 'flex' : 'hidden'"
                    class="fixed z-50 flex items-center justify-center overflow-hidden m-auto bg-slate-900/70 dark:bg-opacity-80 inset-0"
                >
                    <div class="relative w-full h-auto max-w-lg p-4">
                        <div class="relative bg-white dark:bg-slate-900 rounded-lg shadow-sm shadow-gray-200 dark:shadow-gray-700">
                            <div class="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700">
                                <h5 class="text-xl font-semibold">Add new question</h5>
                                <button type="button" @click="show = false" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ms-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                                    <svg class="size-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                                </button>
                            </div>
                            <div class="p-4">                        
                                <form>
                                    <div class="grid grid-cols-12 gap-3">
                                        <div class="col-span-12">
                                            <label class="font-semibold">Question <span class="text-red-600">*</span></label>
                                            <input name="name" id="name" type="text" class="form-input w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-sm outline-none border border-gray-200! focus:border-primary! dark:border-gray-800! dark:focus:border-primary! focus:ring-0 mt-2" placeholder="Title :"/>
                                        </div>

                                        <div class="col-span-12">
                                            <label class="font-semibold"> Answer </label>
                                            <textarea name="comments" id="comments" class="form-input w-full py-2 px-3 h-24! bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-sm outline-none border border-gray-200! focus:border-primary! dark:border-gray-800! dark:focus:border-primary! focus:ring-0 mt-2" placeholder="Description :"></textarea>
                                        </div>

                                        <div class="col-span-12">
                                            <button type="submit" class="btn bg-primary hover:bg-primary-dark text-white rounded-md">Add Q&A</button>
                                        </div>
                                    </div>
                                </form>
                            </div>                    
                        </div>
                    </div>
                </div>

            </div>

            <div class="grid lg:grid-cols-2 grid-cols-1 mt-6 gap-6">
                <div class="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900">
                    <h5 class="font-semibold">Buying Product</h5>

                    <div class="mt-6">
                        <div v-for="(item, index) in accordianData" :key="index" class="relative shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md overflow-hidden mt-4">
                            <h2 class="text-base font-semibold" id="accordion-collapse-heading-1">
                                <button 
                                    type="button" 
                                    :class="accordion1 === index
                                        ? 'bg-gray-50 dark:bg-slate-800 text-primary'
                                        : 'text-dark dark:text-white'"
                                    class="flex justify-between items-center p-5 w-full font-medium text-start"
                                    @click="toggleAccordion1(index)"
                                >
                                    <span>{{item.title}}</span>
                                    <ChevronDown :class="accordion1 === index ? 'rotate-180' : ''" class="size-4 shrink-0"/>
                                </button>
                            </h2>
                            <div v-show="accordion1 === index">
                                <div class="p-5">
                                    <p class="text-slate-400 dark:text-gray-400">{{item.desc}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900">
                    <h5 class="font-semibold">General Questions</h5>

                    <div id="accordion-collapsetwo" data-accordion="collapse" class="mt-6">
                        <div v-for="(item, index) in accordianData" :key="index" class="relative shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md overflow-hidden mt-4">
                            <h2 class="text-base font-semibold" id="accordion-collapse-heading-1">
                                <button 
                                    type="button" 
                                    :class="accordion2 === index
                                        ? 'bg-gray-50 dark:bg-slate-800 text-primary'
                                        : 'text-dark dark:text-white'"
                                    class="flex justify-between items-center p-5 w-full font-medium text-start"
                                    @click="toggleAccordion2(index)"
                                >
                                    <span>{{item.title}}</span>
                                    <ChevronDown :class="accordion2 === index ? 'rotate-180' : ''" class="size-4 shrink-0"/>
                                </button>
                            </h2>
                            <div v-show="accordion2 === index">
                                <div class="p-5">
                                    <p class="text-slate-400 dark:text-gray-400">{{item.desc}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900">
                    <h5 class="font-semibold">Payments Questions</h5>

                    <div id="accordion-collapsethree" data-accordion="collapse" class="mt-6">
                        <div v-for="(item, index) in accordianData" :key="index" class="relative shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md overflow-hidden mt-4">
                            <h2 class="text-base font-semibold" id="accordion-collapse-heading-1">
                                <button 
                                    type="button" 
                                    :class="accordion3 === index
                                        ? 'bg-gray-50 dark:bg-slate-800 text-primary'
                                        : 'text-dark dark:text-white'"
                                    class="flex justify-between items-center p-5 w-full font-medium text-start"
                                    @click="toggleAccordion3(index)"
                                >
                                    <span>{{item.title}}</span>
                                    <ChevronDown :class="accordion3 === index ? 'rotate-180' : ''" class="size-4 shrink-0"/>
                                </button>
                            </h2>
                            <div v-show="accordion3 === index">
                                <div class="p-5">
                                    <p class="text-slate-400 dark:text-gray-400">{{item.desc}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900">
                    <h5 class="font-semibold">Support Questions</h5>

                    <div id="accordion-collapsefour" data-accordion="collapse" class="mt-6">
                        <div v-for="(item, index) in accordianData" :key="index" class="relative shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md overflow-hidden mt-4">
                            <h2 class="text-base font-semibold" id="accordion-collapse-heading-1">
                                <button 
                                    type="button" 
                                    :class="accordion4 === index
                                        ? 'bg-gray-50 dark:bg-slate-800 text-primary'
                                        : 'text-dark dark:text-white'"
                                    class="flex justify-between items-center p-5 w-full font-medium text-start"
                                    @click="toggleAccordion4(index)"
                                >
                                    <span>{{item.title}}</span>
                                    <ChevronDown :class="accordion4 === index ? 'rotate-180' : ''" class="size-4 shrink-0"/>
                                </button>
                            </h2>
                            <div v-show="accordion4 === index">
                                <div class="p-5">
                                    <p class="text-slate-400 dark:text-gray-400">{{item.desc}}</p>
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

import { ChevronDown, Plus } from 'lucide-vue-next'

import { accordianData } from '../data/data'

const accordion1 = ref(0)
const accordion2 = ref(0)
const accordion3 = ref(0)
const accordion4 = ref(0)

const show = ref(false)

const toggleAccordion1 = (index) => {
    accordion1.value = accordion1.value === index ? -1 : index
}

const toggleAccordion2 = (index) => {
    accordion2.value = accordion2.value === index ? -1 : index
}

const toggleAccordion3 = (index) => {
    accordion3.value = accordion3.value === index ? -1 : index
}

const toggleAccordion4 = (index) => {
    accordion4.value = accordion4.value === index ? -1 : index
}
</script>