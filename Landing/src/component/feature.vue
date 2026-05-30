<template>
    <div class="container lg:mt-24 mt-16">
        <div class="grid grid-cols-1 pb-8 text-center">
            <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">How It Works</h3>

            <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
        </div>

        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-7.5">

            <div v-for="(item, index) in featureData" :key="index" class="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-transparent overflow-hidden text-center">
                <div class="relative overflow-hidden text-transparent -m-3">
                    <Hexagon class="size-32 fill-primary/5 mx-auto" />
                    <div class="absolute top-2/4 -translate-y-2/4 inset-s-0 inset-e-0 mx-auto text-primary rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                        <component :is="item.icon" class="text-3xl" :style="{ width: 30,height:30 }" />
                    </div>
                </div>

                <div class="mt-6">
                    <h5 class="text-xl font-medium">{{item.title}}</h5>
                    <p class="text-slate-400 mt-3">{{item.desc}}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { featureData } from './data/data'

import { Hexagon } from 'lucide-vue-next'
</script>