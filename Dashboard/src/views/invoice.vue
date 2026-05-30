<template>
    <div class="container-fluid relative px-3">
        <div class="layout-specing">
            <div class="md:flex justify-between items-center">
                <h5 class="text-lg font-semibold">Invoice</h5>

                <ul class="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                    <li class="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-primary dark:hover:text-white"><RouterLink to="/">Hously</RouterLink></li>
                    <li class="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i class="ri-arrow-right-s-line"></i></li>
                    <li class="inline-block capitalize text-[16px] font-medium text-primary dark:text-white" aria-current="page">Invoice</li>
                </ul>
            </div>

            <div class="container relative mt-6">
                <div class="md:flex justify-center">
                    <div class="lg:w-4/5 w-full">
                        <div class="p-6 rounded-md shadow-sm dark:shadow-gray-700 bg-white dark:bg-slate-900">
                            <div class="border-b border-gray-100 dark:border-gray-700 pb-6">
                                <div class="md:flex justify-between">
                                    <div>
                                        <img :src="logoDark" class="block dark:hidden" alt=""/>
                                        <img :src="logoLight" class="hidden dark:block" alt=""/>
                                        <div class="flex mt-4">
                                            <Link class="size-4 me-3 mt-1"/>
                                            <RouterLink to="#" target="_blank" class="text-primary dark:text-white font-medium">www.hously.home</RouterLink>
                                        </div>
                                    </div>

                                    <div class="mt-6 md:mt-0 md:w-56">
                                        <h5 class="text-lg font-semibold">Address:</h5>

                                        <ul class="list-none">
                                            <li class="flex mt-3">
                                                <MapPin class="size-4 me-3 mt-1"/>
                                                <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178509925!2d55.2744!3d25.1972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e27a403e6b57!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1!5m2!1sen!2sae" data-type="iframe" class="lightbox text-slate-400">Office 1204, Index Tower, <br/> DIFC, Dubai, UAE</a>
                                            </li>
                                            
                                            <li class="flex mt-3">
                                                <Mail class="size-4 me-3 mt-1"/>
                                                <a href="mailto:contact@example.com" class="text-slate-400">info@hously.com</a>
                                            </li>
                                            
                                            <li class="flex mt-3">
                                                <Phone class="size-4 me-3 mt-1"/>
                                                <a href="tel:+152534-468-854" class="text-slate-400">(+12) 1546-456-856</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="md:flex justify-between">
                                <div class="mt-6">
                                    <h5 class="text-lg font-semibold">Invoice Details :</h5>

                                    <ul class="list-none">
                                        <li class="flex mt-3">
                                            <span class="w-24">Invoice No. :</span>
                                            <span class="text-slate-400">#h003</span>
                                        </li>
                                        
                                        <li class="flex mt-3">
                                            <span class="w-24">Name :</span>
                                            <span class="text-slate-400">Calvin Carlo</span>
                                        </li>
                                        
                                        <li class="flex mt-3">
                                            <span class="w-24">Address :</span>
                                            <span class="text-slate-400">1962 Pike Street, <br/> Diego, CA 92123</span>
                                        </li>
                                        
                                        <li class="flex mt-3">
                                            <span class="w-24">Phone :</span>
                                            <span class="text-slate-400">(+45) 4584-458-695</span>
                                        </li>
                                    </ul>
                                </div>

                                <div class="mt-3 md:w-56">
                                    <ul class="list-none">
                                        <li class="flex mt-3">
                                            <span class="w-24">Date :</span>
                                            <span class="text-slate-400">16th Aug 2027</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="relative overflow-x-auto shadow-sm dark:shadow-gray-700 rounded-md mt-6">
                                <table class="w-full text-start text-slate-500 dark:text-slate-400">
                                    <thead class="text-sm uppercase bg-slate-50 dark:bg-slate-800">
                                        <tr>
                                            <th scope="col" class="text-center px-6 py-3 w-16">
                                                No.
                                            </th>
                                            <th scope="col" class="text-start px-6 py-3">
                                                Items
                                            </th>
                                            <th scope="col" class="text-center px-6 py-3 w-20">
                                                Qty
                                            </th>
                                            <th scope="col" class="text-center px-6 py-3 w-28">
                                                Rate (AED)
                                            </th>
                                            <th scope="col" class="text-end px-6 py-3 w-20">
                                                Total($)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white dark:bg-slate-900">
                                            <td class="text-center px-6 py-4">
                                                1
                                            </td>
                                            <th scope="row" class="text-start px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                Apple MacBook Pro 17"
                                            </th>
                                            <td class="text-center px-6 py-4">
                                                1
                                            </td>
                                            <td class="text-center px-6 py-4">
                                                280
                                            </td>
                                            <td class="text-end px-6 py-4">
                                                AED 1,280
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-700">
                                            <td class="text-center px-6 py-4">
                                                2
                                            </td>
                                            <th scope="row" class="text-start px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                Microsoft Surface Pro
                                            </th>
                                            <td class="text-center px-6 py-4">
                                                1
                                            </td>
                                            <td class="text-center px-6 py-4">
                                                140
                                            </td>
                                            <td class="text-end px-6 py-4">
                                                AED 640
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-700">
                                            <td class="text-center px-6 py-4">
                                                3
                                            </td>
                                            <th scope="row" class="text-start px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                Magic Mouse 2
                                            </th>
                                            <td class="text-center px-6 py-4">
                                                2
                                            </td>
                                            <td class="text-center px-6 py-4">
                                                50
                                            </td>
                                            <td class="text-end px-6 py-4">
                                                AED 450
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="w-56 ms-auto p-5">
                                <ul class="list-none">
                                    <li class="text-slate-400 flex justify-between">
                                        <span>Subtotal :</span>
                                        <span>AED 2,370</span>
                                    </li>
                                    <li class="text-slate-400 flex justify-between mt-2">
                                        <span>Taxes :</span>
                                        <span>AED 90</span>
                                    </li>
                                    <li class="flex justify-between font-semibold mt-2">
                                        <span>Total :</span>
                                        <span>AED 2,460</span>
                                    </li>
                                </ul>
                            </div>

                            <div class="invoice-footer border-t border-gray-100 dark:border-gray-700 pt-6">
                                <div class="md:flex justify-between">
                                    <div>
                                        <div class="text-slate-400 text-center md:text-start">
                                            <h6 class="mb-0">Customer Services : <a href="tel:+152534-468-854" class="text-amber-500">(+12) 1546-456-856</a></h6>
                                        </div>
                                    </div>

                                    <div class="mt-4 md:mt-0">
                                        <div class="text-slate-400 text-center md:text-end">
                                            <h6 class="mb-0"><RouterLink to="/terms" target="_blank" class="text-primary">Terms & Conditions</RouterLink></h6>
                                        </div>
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
import logoDark from '@/assets/images/logo-dark.png'
import logoLight from '@/assets/images/logo-light.png'

import {
    Link,
    Mail,
    MapPin,
    Phone
} from 'lucide-vue-next'
</script>