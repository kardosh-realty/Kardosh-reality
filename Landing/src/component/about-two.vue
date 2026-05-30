<template>
    <div class="container lg:mt-24 mt-16">
        <div class="grid md:grid-cols-12 grid-cols-1 items-center gap-7.5">
            <div class="md:col-span-5">
                <div class="relative">
                    <div class="p-5 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-t-full bg-white dark:bg-slate-900">
                        <img :src="Image" class="shadow-md rounded-t-full rounded-md" alt="" />
                    </div>
                    <div class="absolute bottom-2/4 translate-y-2/4 inset-s-0 inset-e-0 text-center">
                        <RouterLink to="#" @click.prevent="toggleModal" class="lightbox size-20 rounded-full shadow-md dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-primary">
                            <i class="ri-play-fill inline-flex items-center justify-center text-2xl"></i>
                        </RouterLink>
                    </div>
                </div>
            </div>

            <div class="md:col-span-7">
                <div class="lg:ms-4">
                    <h4 class="mb-6 md:text-3xl text-2xl lg:leading-normal leading-normal font-semibold">Efficiency. Transparency. <br /> Control.</h4>
                    <p class="text-slate-400 max-w-xl">Kardosh Realty developed a platform for the Real Estate marketplace that allows buyers and sellers to easily execute a transaction on their own. The platform drives efficiency, cost transparency and control into the hands of the consumers. Kardosh Realty is Real Estate Redefined.</p>

                    <div class="mt-4">
                        <RouterLink to="#" class="btn bg-primary hover:bg-primary-dark text-white rounded-md mt-3">Learn More </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="isOpen" class="flex bg-[#00000099] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-1 w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div class="flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <button type="button" @click="toggleModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-1 md:p-1 space-y-4">
                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/yba7hPeTSjk?playlist=yba7hPeTSjk&loop=1"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import Image from "@/assets/images/hero.jpg";

const isOpen = ref(false)

const toggleModal = () => {
    isOpen.value = !isOpen.value
}
</script>