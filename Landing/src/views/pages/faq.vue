<template>
    <Navbar navClass="navbar-white" />

    <section class="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover" :style="{ backgroundImage: `url(${bgImage})` }">
        <div class="absolute inset-0 bg-slate-900/80"></div>
        <div class="container relative">
            <div class="grid grid-cols-1 text-center mt-10">
                <h3 class="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Frequently Asked Questions</h3>
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
                <div class="lg:col-span-4 md:col-span-5">
                    <div class="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 sticky top-20">
                        <ul class="list-unstyled sidebar-nav mb-0 py-0" id="navmenu-nav">
                            <li class="navbar-item p-0">
                                <button @click="scrollToSection('tech')" class="text-base font-medium navbar-link" :class="activeSection === 'tech' ? 'active' : ''">
                                    Buying Questions
                                </button>
                            </li>
                            <li class="navbar-item mt-3 p-0">
                                <button @click="scrollToSection('general')" class="text-base font-medium navbar-link" :class="activeSection === 'general' ? 'active' : ''">
                                    General Questions
                                </button>
                            </li>
                            <li class="navbar-item mt-3 p-0">
                                <button @click="scrollToSection('payment')" class="text-base font-medium navbar-link" :class="activeSection === 'payment' ? 'active' : ''">
                                    Payments Questions
                                </button>
                            </li>
                            <li class="navbar-item mt-3 p-0">
                                <button @click="scrollToSection('support')" class="text-base font-medium navbar-link" :class="activeSection === 'support' ? 'active' : ''">
                                    Support Questions
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="lg:col-span-8 md:col-span-7">
                    <div id="tech">
                        <h5 class="text-2xl font-semibold">Buying Product</h5>

                        <div id="accordion-collapse" data-accordion="collapse" class="mt-6">
                            <div v-for="(section, index) in accordionData" :key="index"
                                class="relative shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md overflow-hidden mt-4">
                                <h2 class="text-base font-medium" id="accordion-collapse-heading-1">
                                    <button type="button" @click="toggleAccordion(index)"
                                        class="flex justify-between items-center p-5 w-full font-medium text-start"
                                        :class="activeIndex === index ? 'bg-gray-50 dark:bg-slate-800 text-primary' : ''"
                                    >
                                        <span>{{section.title}}</span>
                                        <svg class="size-4 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </h2>
                                <div v-if="activeIndex === index" id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
                                    <div class="p-5">
                                        <p class="text-slate-400 dark:text-gray-400"> {{section.content}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="general" class="mt-8">
                        <h5 class="text-2xl font-semibold">General Questions</h5>

                        <div id="accordion-collapse" data-accordion="collapse" class="mt-6">
                            <div v-for="(section, index) in accordionData" :key="index"
                                class="relative shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md overflow-hidden mt-4">
                                <h2 class="text-base font-medium" id="accordion-collapse-heading-1">
                                    <button type="button" @click="toggleGeneral(index)"
                                        class="flex justify-between items-center p-5 w-full font-medium text-start"
                                        :class="activeGeneral === index ? 'bg-gray-50 dark:bg-slate-800 text-primary' : ''"
                                    >
                                        <span>{{section.title}}</span>
                                        <svg class="size-4 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </h2>
                                <div v-if="activeGeneral === index" id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
                                    <div class="p-5">
                                        <p class="text-slate-400 dark:text-gray-400"> {{section.content}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="payment" class="mt-8">
                        <h5 class="text-2xl font-semibold">Payments Questions</h5>

                        <div id="accordion-collapse" data-accordion="collapse" class="mt-6">
                            <div v-for="(section, index) in accordionData" :key="index"
                                class="relative shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md overflow-hidden mt-4">
                                <h2 class="text-base font-medium" id="accordion-collapse-heading-1">
                                    <button type="button" @click="togglePayment(index)"
                                        class="flex justify-between items-center p-5 w-full font-medium text-start"
                                        :class="activePayment === index ? 'bg-gray-50 dark:bg-slate-800 text-primary' : ''"
                                    >
                                        <span>{{section.title}}</span>
                                        <svg class="size-4 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </h2>
                                <div v-if="activePayment === index" id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
                                    <div class="p-5">
                                        <p class="text-slate-400 dark:text-gray-400"> {{section.content}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="support" class="mt-8">
                        <h5 class="text-2xl font-semibold">Support Questions</h5>

                        <div id="accordion-collapse" data-accordion="collapse" class="mt-6">
                            <div v-for="(section, index) in accordionData" :key="index"
                                class="relative shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md overflow-hidden mt-4">
                                <h2 class="text-base font-medium" id="accordion-collapse-heading-1">
                                    <button type="button" @click="toggleSupport(index)"
                                        class="flex justify-between items-center p-5 w-full font-medium text-start"
                                        :class="activeSupport === index ? 'bg-gray-50 dark:bg-slate-800 text-primary' : ''"
                                    >
                                        <span>{{section.title}}</span>
                                        <svg class="size-4 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </h2>
                                <div v-if="activeSupport === index" id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
                                    <div class="p-5">
                                        <p class="text-slate-400 dark:text-gray-400"> {{section.content}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
import { ref, onMounted, onUnmounted } from 'vue'

import Navbar from '@/component/navbar.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import bgImage from '../../assets/images/bg/01.jpg'

import { accordionData } from '../../component/data/data'

const activeIndex = ref(0)
const activeGeneral = ref(0)
const activePayment = ref(0)
const activeSupport = ref(0)

const toggleAccordion = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index
}

const toggleGeneral = (index) => {
    activeGeneral.value = activeGeneral.value === index ? null : index
}

const togglePayment = (index) => {
    activePayment.value = activePayment.value === index ? null : index
}

const toggleSupport = (index) => {
    activeSupport.value = activeSupport.value === index ? null : index
}

const activeSection = ref('tech')

const scrollToSection = (id) => {
    activeSection.value = id

    const element = document.getElementById(id)

    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        })
    }
}

const handleScroll = () => {
    const sections = ['tech', 'general', 'payment', 'support']

    sections.forEach((id) => {
        const element = document.getElementById(id)

        if (element) {
            const rect = element.getBoundingClientRect()

            if (rect.top <= 150 && rect.bottom >= 150) {
                activeSection.value = id
            }
        }
    })
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>