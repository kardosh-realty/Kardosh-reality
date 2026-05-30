<template>
    <div class="container-fluid relative px-3">
        <div class="layout-specing">
            <div class="md:flex justify-between items-center">
                <h5 class="text-lg font-semibold">Add Property</h5>

                <ul class="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                    <li class="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-primary dark:hover:text-white"><RouterLink to="/">{{ BRAND.name }}</RouterLink></li>
                    <li class="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i class="ri-arrow-right-s-line"></i></li>
                    <li class="inline-block capitalize text-[16px] font-medium text-primary dark:text-white" aria-current="page">Add Property</li>
                </ul>
            </div>

            <div class="container relative">
                <div class="grid md:grid-cols-2 grid-cols-1 gap-6 mt-6">
                    <div class="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900 h-fit">
                        <div>
                            <p class="font-medium mb-4">Upload your property image here, Please click "Upload Image" Button.</p>
                            
                            <img v-if="file" :src="file" alt="" class="preview-content" />
                            <div v-else class="preview-box flex justify-center rounded-md shadow-sm  dark:shadow-gray-800 overflow-hidden bg-gray-50 dark:bg-slate-800 text-slate-400 p-2 text-center small w-auto max-h-60">Supports JPG, PNG and MP4 videos. Max file size : 10MB.</div>
                            <input type="file" id="input-file" name="input-file" accept="image/*" @change="handleChange"  hidden/>
                            <label class="btn-upload btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md mt-6 cursor-pointer" for="input-file">Upload Image</label>
                        </div>
                    </div>

                    <div class="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900 h-fit">
                        <form class="">
                            <div class="grid grid-cols-12 gap-5">
                                <div class="col-span-12">
                                    <label for="name" class="font-medium">Title:</label>
                                    <input name="name" id="name" type="text" class="form-input border border-gray-200! dark:border-gray-800! mt-2" placeholder="Property Title :"/>
                                </div>

                                <div class="md:col-span-4 col-span-12">
                                    <label for="name" class="font-medium">Area (sqm):</label>
                                    <div class="form-icon relative mt-2">
                                        <i class="ri-expand-diagonal-line absolute top-2 inset-s-4 text-primary"></i>
                                        <input name="number" id="sqf" type="number" class="form-input border border-gray-200! dark:border-gray-800! ps-11!" placeholder="Size (sqf) :"/>
                                    </div>
                                </div>

                                <div class="md:col-span-4 col-span-12">
                                    <label for="name" class="font-medium">Beds:</label>
                                    <div class="form-icon relative mt-2">
                                        <i class="ri-layout-4-line absolute top-2 inset-s-4 text-primary"></i>
                                        <input name="number" id="beds" type="number" class="form-input border border-gray-200! dark:border-gray-800! ps-11!" placeholder="Total Beds :"/>
                                    </div>
                                </div>

                                <div class="md:col-span-4 col-span-12">
                                    <label for="name" class="font-medium">Baths:</label>
                                    <div class="form-icon relative mt-2">
                                        <i class="ri-shape-line absolute top-2 inset-s-4 text-primary"></i>
                                        <input name="number" id="baths" type="number" class="form-input border border-gray-200! dark:border-gray-800! ps-11!" placeholder="Baths :"/>
                                    </div>
                                </div>

                                <div class="col-span-12">
                                    <label for="name" class="font-medium">Price:</label>
                                    <div class="form-icon relative mt-2">
                                        <i class="ri-money-dollar-circle-line absolute top-2 inset-s-4 text-primary"></i>
                                        <input name="number" id="price" type="number" class="form-input border border-gray-200! dark:border-gray-800! ps-11!" placeholder="Price :"/>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" id="submit" name="send" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md mt-5">Add Property</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { BRAND } from '@/config/brand'

const file = ref(null)

const handleChange = (event) => {

    const selectedFile = event.target.files[0]

    if (selectedFile) {
        file.value = URL.createObjectURL(selectedFile)
    }
}
</script>