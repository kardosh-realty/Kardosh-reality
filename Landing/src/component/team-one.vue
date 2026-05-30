<template>
    <div class="grid md:grid-cols-12 grid-cols-1 mt-8 gap-7.5">
        <div v-for="(item, index) in teamdata" :key="index" class="lg:col-span-3 md:col-span-6">
            <div class="group text-center">
                <div class="relative inline-block mx-auto size-52 rounded-full overflow-hidden">
                    <img :src="item.image" class="" alt="" />
                    <div class="absolute inset-0 bg-linear-to-b from-transparent to-slate-900 size-52 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>

                    <ul class="list-none absolute inset-s-0 inset-e-0 -bottom-20 group-hover:bottom-5 transition-all duration-500 ease-in-out">
                        <li class="inline ms-1"><RouterLink to="#" class="btn btn-icon btn-sm rounded-full! border border-primary bg-primary hover:border-primary hover:bg-primary text-white"><Facebook class="size-4" /></RouterLink></li>
                        <li class="inline ms-1"><RouterLink to="#" class="btn btn-icon btn-sm rounded-full! border border-primary bg-primary hover:border-primary hover:bg-primary text-white"><Instagram class="size-4" /></RouterLink></li>
                        <li class="inline ms-1"><RouterLink to="#" class="btn btn-icon btn-sm rounded-full! border border-primary bg-primary hover:border-primary hover:bg-primary text-white"><Linkedin  class="size-4" /></RouterLink></li>
                    </ul>
                </div>

                <div class="content mt-3">
                    <RouterLink to="#" class="text-xl font-medium hover:text-primary transition-all duration-500 ease-in-out">{{item.name}}</RouterLink>
                    <p class="text-slate-400">{{item.title}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { teamdata } from './data/data'

import {
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-vue-next'
</script>