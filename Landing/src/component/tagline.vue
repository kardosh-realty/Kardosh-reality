<template>
    <div class="tagline bg-slate-900">
        <div class="container relative">                
            <div class="grid grid-cols-1">
                <div class="flex items-center justify-between">
                    <ul class="list-none">
                        <li class="inline-flex items-center">
                            <Clock3 class="text-primary size-4"/>
                            <span class="ms-2 text-slate-300">Sun – Thu: 9am to 6pm</span>
                        </li>
                        <li class="inline-flex items-center ms-2">
                            <MapPin class="text-primary size-4"/>
                            <span class="ms-2 text-slate-300">Business Bay, Dubai, UAE</span>
                        </li>
                    </ul>

                    <ul class="list-none">
                        <li class="inline-flex items-center">
                            <Mail class="text-primary size-4"/>
                            <a href="mailto:info@kardoshrealty.ae" class="ms-2 text-slate-300 hover:text-slate-200">info@kardoshrealty.ae</a>
                        </li>
                        <li class="inline-flex items-center ms-2">
                            <ul class="list-none">
                                <li class="inline-flex mb-0"><RouterLink to="#!" class="text-slate-300 hover:text-primary"><Facebook class="size-4 align-middle" title="facebook"/></RouterLink></li>
                                <li class="inline-flex ms-2 mb-0"><RouterLink to="#!" class="text-slate-300 hover:text-primary"><Instagram class="size-4 align-middle" title="instagram"/></RouterLink></li>
                                <li class="inline-flex ms-2 mb-0"><RouterLink to="#!" class="text-slate-300 hover:text-primary"><Twitter class="size-4 align-middle" title="twitter"/></RouterLink></li>
                                <li class="inline-flex ms-2 mb-0"><a href="tel:+97141234567" class="text-slate-300 hover:text-primary"><Phone class="size-4 align-middle" title="phone"/></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    Clock3,
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Twitter
} from 'lucide-vue-next'
</script>