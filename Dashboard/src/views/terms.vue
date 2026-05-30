<template>
    <div class="container-fluid relative px-3">
        <div class="layout-specing">
            <div class="md:flex justify-between items-center">
                <h5 class="text-lg font-semibold">Terms & Conditions</h5>

                <ul class="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                    <li class="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-primary dark:hover:text-white"><RouterLink to="index">Hously</RouterLink></li>
                    <li class="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i class="ri-arrow-right-s-line"></i></li>
                    <li class="inline-block capitalize text-[16px] font-medium text-primary dark:text-white" aria-current="page">Terms</li>
                </ul>
            </div>

            <div class="container relative mt-6">
                <div class="md:flex justify-center">
                    <div class="lg:w-4/5 w-full">
                        <div class="p-6 bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                            <h5 class="text-lg font-semibold mb-4">Introduction :</h5>
                            <p class="text-slate-400">It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.</p>

                            <h5 class="text-lg font-semibold mb-4 mt-6">User Agreements :</h5>
                            <p class="text-slate-400">The most well-known dummy text is the 'Lorem Ipsum', which is said to have <b class="text-red-600">originated</b> in the 16th century. Lorem Ipsum is <b class="text-red-600">composed</b> in a pseudo-Latin language which more or less <b class="text-red-600">corresponds</b> to 'proper' Latin. It contains a series of real Latin words. This ancient dummy text is also <b class="text-red-600">incomprehensible</b>, but it imitates the rhythm of most European languages in Latin script. The <b class="text-red-600">advantage</b> of its Latin origin and the relative <b class="text-red-600">meaninglessness</b> of Lorum Ipsum is that the text does not attract attention to itself or distract the viewer's <b class="text-red-600">attention</b> from the layout.</p>
                            <p class="text-slate-400 mt-3">There is now an <b class="text-red-600">abundance</b> of readable dummy texts. These are usually used when a text is <b class="text-red-600">required purely</b> to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or <b class="text-red-600">nonsensical</b> stories.</p>
                            <p class="text-slate-400 mt-3">It seems that only <b class="text-red-600">fragments</b> of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.</p>
                            
                            <h5 class="text-lg font-semibold mb-4 mt-6">Restrictions :</h5>
                            <p class="text-slate-400">You are specifically restricted from all of the following :</p>
                            <ul class="list-none text-slate-400 mt-3">
                                <li class="flex mt-2 ms-0"><i class="ri-arrow-right-s-line text-primary text-lg align-middle me-2"></i>Digital Marketing Solutions for Tomorrow</li>
                                <li class="flex mt-2 ms-0"><i class="ri-arrow-right-s-line text-primary text-lg align-middle me-2"></i>Our Talented & Experienced Marketing Agency</li>
                                <li class="flex mt-2 ms-0"><i class="ri-arrow-right-s-line text-primary text-lg align-middle me-2"></i>Create your own skin to match your brand</li>
                                <li class="flex mt-2 ms-0"><i class="ri-arrow-right-s-line text-primary text-lg align-middle me-2"></i>Digital Marketing Solutions for Tomorrow</li>
                                <li class="flex mt-2 ms-0"><i class="ri-arrow-right-s-line text-primary text-lg align-middle me-2"></i>Our Talented & Experienced Marketing Agency</li>
                                <li class="flex mt-2 ms-0"><i class="ri-arrow-right-s-line text-primary text-lg align-middle me-2"></i>Create your own skin to match your brand</li>
                            </ul>

                            <h5 class="text-lg font-semibold mt-6">Users Question & Answer :</h5>

                            <div id="accordion-collapse" data-accordion="collapse" class="mt-6">
                                <div v-for="(item, index) in accordianData" :key="index" class="relative shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md overflow-hidden mt-4" key={index}>
                                    <h2 class="text-base font-semibold" id="accordion-collapse-heading-1">
                                        <button 
                                            type="button"
                                            :class="accordion1 === index
                                                ? 'bg-gray-50 dark:bg-slate-800 text-primary'
                                                : 'text-dark dark:text-white'"
                                            class="flex justify-between items-center p-5 w-full font-medium text-start"
                                            @click="toggleAccordion(index)" 
                                        >
                                            <span>{{item.title}}</span>
                                            <ChevronDown :class="accordion1 === index ? 'rotate-180' : ''" class="size-4 shrink-0 duration-300"/>
                                        </button>
                                    </h2>
                                    <div v-show="accordion1 === index">
                                        <div class="p-5">
                                            <p class="text-slate-400 dark:text-gray-400">{{item.desc}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-6">
                                <RouterLink to="" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md">Accept</RouterLink>
                                <RouterLink to="" class="btn bg-transparent hover:bg-primary border border-primary text-primary hover:text-white rounded-md ms-2">Decline</RouterLink>
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

import { ChevronDown } from 'lucide-vue-next'

import { accordianData } from '@/data/data'

const accordion1 = ref(0)

const toggleAccordion = (index) => {
    accordion1.value = accordion1.value === index ? -1 : index
}
</script>