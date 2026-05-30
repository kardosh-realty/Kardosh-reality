<template>
    <Navbar navClass="navbar-white" />

    <section :style="{backgroundImage: `url(${BackgroudImage})`}" class="relative table w-full pt-24 pb-20 lg:pt-28 lg:pb-24 bg-no-repeat bg-center bg-cover">
        <div class="absolute inset-0 bg-slate-900/80"></div>
        <div class="container relative z-[1] text-center">
            <KardoshBreadcrumbs variant="hero" />
            <div class="grid grid-cols-1 mt-6">
                <h3 class="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Terms & Services</h3>
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
            <div class="md:flex justify-center">
                <div class="md:w-3/4">
                    <div class="p-6 bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                        <h5 class="text-xl font-medium mb-4">Introduction :</h5>
                        <p class="text-slate-400">It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.</p>

                        <h5 class="text-xl font-medium mb-4 mt-8">User Agreements :</h5>
                        <p class="text-slate-400">The most well-known dummy text is the 'Lorem Ipsum', which is said to have <b class="text-danger-600">originated</b> in the 16th century. Lorem Ipsum is <b class="text-danger-600">composed</b> in a pseudo-Latin language which more or less <b class="text-danger-600">corresponds</b> to 'proper' Latin. It contains a series of real Latin words. This ancient dummy text is also <b class="text-danger-600">incomprehensible</b>, but it imitates the rhythm of most European languages in Latin script. The <b class="text-danger-600">advantage</b> of its Latin origin and the relative <b class="text-danger-600">meaninglessness</b> of Lorum Ipsum is that the text does not attract attention to itself or distract the viewer's <b class="text-danger-600">attention</b> from the layout.</p>
                        <p class="text-slate-400 mt-3">There is now an <b class="text-danger-600">abundance</b> of readable dummy texts. These are usually used when a text is <b class="text-danger-600">required purely</b> to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or <b class="text-danger-600">nonsensical</b> stories.</p>
                        <p class="text-slate-400 mt-3">It seems that only <b class="text-danger-600">fragments</b> of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.</p>

                        <h5 class="text-xl font-medium mb-4 mt-8">Restrictions :</h5>
                        <p class="text-slate-400">You are specifically restricted from all of the following :</p>
                        <ul class="list-none text-slate-400 mt-3">
                            <li class="flex mt-2 items-center"><ArrowRight :style="{ width: 17,height:17 }" class="text-primary align-middle me-2"/>Digital Marketing Solutions for Tomorrow</li>
                            <li class="flex mt-2 items-center"><ArrowRight :style="{ width: 17,height:17 }" class="text-primary align-middle me-2"/>Our Talented & Experienced Marketing Agency</li>
                            <li class="flex mt-2 items-center"><ArrowRight :style="{ width: 17,height:17 }" class="text-primary align-middle me-2"/>Create your own skin to match your brand</li>
                            <li class="flex mt-2 items-center"><ArrowRight :style="{ width: 17,height:17 }" class="text-primary align-middle me-2"/>Digital Marketing Solutions for Tomorrow</li>
                            <li class="flex mt-2 items-center"><ArrowRight :style="{ width: 17,height:17 }" class="text-primary align-middle me-2"/>Our Talented & Experienced Marketing Agency</li>
                            <li class="flex mt-2 items-center"><ArrowRight :style="{ width: 17,height:17 }" class="text-primary align-middle me-2"/>Create your own skin to match your brand</li>
                        </ul>

                        <h5 class="text-xl font-medium mt-8">Users Question & Answer :</h5>

                        <div id="accordion-collapse" data-accordion="collapse" class="mt-6">
                            <div v-for="(section, index) in accordionData" :key="index"  class="relative shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md overflow-hidden mt-4">
                                <h2 class="text-base font-medium" :id="`accordion-collapse-heading-${index}`">
                                    <button type="button" @click="handleSectionClick(index)"
                                        class="flex justify-between items-center p-5 w-full font-medium text-start"
                                        :class="activeIndex === index
                                            ? 'bg-gray-50 dark:bg-slate-800 text-primary'
                                            : ''"
                                    >
                                        <span>{{section.title}}</span>
                                        <svg class="size-4 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </h2>
                                <div v-if="activeIndex === index" :id="`accordion-collapse-body-${index}`" :aria-labelledby="`accordion-collapse-heading-${index}`">
                                    <div class="p-5">
                                        <p class="text-slate-400 dark:text-gray-400"> {{section.content}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6">
                            <RouterLink to="#" class="btn bg-primary hover:bg-primary-dark text-white rounded-md">Accept</RouterLink>
                            <RouterLink to="#" class="btn bg-transparent hover:bg-primary border border-primary text-primary hover:text-white rounded-md ms-2">Decline</RouterLink>
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
import Navbar from "@/component/navbar.vue";
import KardoshBreadcrumbs from '@/component/kardosh/KardoshBreadcrumbs.vue';
import Footer from "@/component/footer.vue";
import Switcher from "@/component/switcher.vue";

import { PAGE_HERO_IMAGES } from '@/config/dubai-images'

const BackgroudImage = PAGE_HERO_IMAGES.terms

import { ArrowRight } from 'lucide-vue-next'

import { ref } from 'vue'

import { accordionData } from '@/component/data/data'

const activeIndex = ref(0)

const handleSectionClick = (index) => {
    activeIndex.value =
        activeIndex.value === index ? null : index
}
</script>