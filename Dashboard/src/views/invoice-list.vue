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

            <div class="grid grid-cols-1 mt-6">
                <div class="relative overflow-x-auto block w-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 rounded-md">
                    <table class="w-full text-start">
                        <thead class="text-base">
                            <tr>
                                <th class="text-start p-4 min-w-32">Invoice No.</th>
                                <th class="text-start p-4 min-w-48">Client Name</th>
                                <th class="text-center p-4 min-w-50">Phone</th>
                                <th class="text-center p-4">Amount</th>
                                <th class="text-center p-4 min-w-37.5">Generate(Dt.)</th>
                                <th class="text-center p-4">Status</th>
                                <th class="text-end p-4 min-w-50"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in invoiceData" :key="index">
                                <th class="text-start border-t border-gray-100 dark:border-gray-800 p-4">{{item.no}}</th>
                                <td class="text-start border-t border-gray-100 dark:border-gray-800 p-4">
                                    <RouterLink to="#" class="hover:text-primary">
                                        <div class="flex items-center">
                                            <img :src="item.image" class="size-9 rounded-full shadow-sm dark:shadow-gray-700" alt=""/>
                                            <span class="ms-2 font-medium">{{item.name}}</span>
                                        </div>
                                    </RouterLink>
                                </td>
                                <td class="text-center border-t border-gray-100 dark:border-gray-800 p-4">
                                    <span class="text-slate-400">{{item.phone}}</span>
                                </td>
                                <td class="text-center border-t border-gray-100 dark:border-gray-800 p-4">
                                    <span class="text-slate-400">{{item.amount}}</span>
                                </td>
                                <td class="text-center border-t border-gray-100 dark:border-gray-800 p-4">
                                    <span class="text-slate-400">{{item.date}}</span>
                                </td>
                                <td v-if="item.status === 'Unpaid'" class="text-center border-t border-gray-100 dark:border-gray-800 p-4">
                                    <span class="bg-red-600/10 dark:bg-red-600/20 text-red-600 inline-block text-[12px] font-bold px-2.5 rounded-sm leading-5 ms-1">Unpaid</span>
                                </td>
                                <td v-else-if="item.status === 'Paid'" class="text-center border-t border-gray-100 dark:border-gray-800 p-4">
                                    <span class="bg-emerald-600/10 dark:bg-emerald-600/20 text-emerald-600 inline-block text-[12px] font-bold px-2.5 rounded-sm leading-5 ms-1">Paid</span>
                                </td>
                                <td class="text-end border-t border-gray-100 dark:border-gray-800 p-4">
                                    <RouterLink to="/invoice" class="py-1 px-4 inline-block font-semibold tracking-wide border align-middle duration-500 text-sm text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md">Preview</RouterLink>
                                    <RouterLink to="#" class="py-1 px-4 inline-block font-semibold tracking-wide border align-middle duration-500 text-sm text-center bg-primary/5 hover:bg-primary border-primary/10 hover:border-primary text-primary hover:text-white rounded-md ms-2">Print</RouterLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-5 flex items-center justify-between">
                    <div>
                        <RouterLink to="#" class="size-8 inline-flex items-center justify-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 border-gray-100 dark:border-gray-700 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full"><i class="ri-arrow-left-s-line"></i></RouterLink>
                        <RouterLink to="#" class="size-8 inline-flex items-center justify-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 border-gray-100 dark:border-gray-700 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full"><i class="ri-arrow-right-s-line"></i></RouterLink>
                    </div>

                    <span class="text-slate-400">Showing 1 - 8 out of 45</span>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { invoiceData } from '@/data/data'
</script>