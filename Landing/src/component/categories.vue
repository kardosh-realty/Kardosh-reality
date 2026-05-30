<template>
    <div class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mt-8 md:gap-7.5 gap-3">
        <div v-for="(item, index) in categoriesData" :key="index" class="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
            <img :src="item.image" alt="" />
            <div class="p-4">
                <RouterLink to="#" class="text-xl font-medium hover:text-primary">{{item.name}}</RouterLink>
                <p class="text-slate-400 text-sm mt-1">{{item.title}}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { categoriesData } from "./data/data";
</script>