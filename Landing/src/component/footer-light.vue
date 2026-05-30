<template>
    <footer class="relative bg-slate-50 dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 mt-24">
        <div class="container">
            <div class="grid grid-cols-1">
                <div class="relative py-16">
                    <!-- Subscribe -->
                    <div class="relative w-full">
                        <div class="relative -top-40 bg-slate-900 dark:bg-slate-900 lg:px-8 px-6 py-10 rounded-xl shadow-lg dark:shadow-gray-700 overflow-hidden">
                            <div class="grid md:grid-cols-2 grid-cols-1 items-center gap-7.5">
                                <div class="md:text-start text-center z-1">
                                    <h3 class="md:text-3xl text-2xl md:leading-normal leading-normal font-medium text-white">Subscribe to Newsletter!</h3>
                                    <p class="text-slate-400 max-w-xl mx-auto">Subscribe to get latest updates and information.</p>
                                </div>

                                <div class="subcribe-form z-1">
                                    <form class="relative max-w-lg md:ms-auto">
                                        <input type="email" id="subcribe" name="email" class="rounded-full bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700" placeholder="Enter your email :" />
                                        <button type="submit" class="btn bg-primary hover:bg-primary-dark text-white rounded-full!">Subscribe</button>
                                    </form>
                                </div>
                            </div>

                            <div class="absolute -top-5 -inset-s-5">
                                <div class="ri-mail-line lg:text-[150px] text-7xl text-slate-900/5 dark:text-white/5 ltr:-rotate-45 rtl:rotate-45"></div>
                            </div>

                            <div class="absolute -bottom-5 -inset-e-5">
                                <Pencil class="lg:text-[150px] text-7xl text-white/5 rtl:-rotate-90"/>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-12 grid-cols-1 gap-7.5 -mt-24">
                            <div class="lg:col-span-4 md:col-span-12">
                                <RouterLink to="#" class="text-[22px] focus:outline-none">
                                    <BrandLogo variant="full" size="footer" />
                                </RouterLink>
                                <p class="mt-6 text-slate-400">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>

                            </div>

                            <div class="lg:col-span-2 md:col-span-4">
                                <h5 class="tracking-[1px] text-slate-900 dark:text-white font-semibold">Company</h5>
                                <ul class="list-none footer-list mt-6">
                                    <li><RouterLink to="/aboutus" class="text-slate-400 inline-flex hover:text-slate-500 dark:text-slate-300 dark:hover:text-slate-400 duration-500 ease-in-out"><ChevronRight :style="{ width: 20,height:20 }" class="me-1 text-xl"/> About us</RouterLink></li>
                                    <li class="mt-2.5"><RouterLink to="/features" class="text-slate-400 inline-flex hover:text-slate-500 dark:text-slate-300 dark:hover:text-slate-400 duration-500 ease-in-out"><ChevronRight :style="{ width: 20,height:20 }" class="me-1 text-xl"/> Services</RouterLink></li>
                                    <li class="mt-2.5"><RouterLink to="/pricing" class="text-slate-400 inline-flex hover:text-slate-500 dark:text-slate-300 dark:hover:text-slate-400 duration-500 ease-in-out"><ChevronRight :style="{ width: 20,height:20 }" class="me-1 text-xl"/> Pricing</RouterLink></li>
                                    <li class="mt-2.5"><RouterLink to="/blogs" class="text-slate-400 inline-flex hover:text-slate-500 dark:text-slate-300 dark:hover:text-slate-400 duration-500 ease-in-out"><ChevronRight :style="{ width: 20,height:20 }" class="me-1 text-xl"/> Blog</RouterLink></li>
                                    <li class="mt-2.5"><RouterLink to="/auth-login" class="text-slate-400 inline-flex hover:text-slate-500 dark:text-slate-300 dark:hover:text-slate-400 duration-500 ease-in-out"><ChevronRight :style="{ width: 20,height:20 }" class="me-1 text-xl"/> Login</RouterLink></li>
                                </ul>
                            </div>

                            <div class="lg:col-span-3 md:col-span-4">
                                <h5 class="tracking-[1px] text-slate-900 dark:text-white font-semibold">Usefull Links</h5>
                                <ul class="list-none footer-list mt-6">
                                    <li><RouterLink to="/terms" class="text-slate-400 inline-flex hover:text-slate-500 dark:text-slate-300 dark:hover:text-slate-400 duration-500 ease-in-out"><ChevronRight :style="{ width: 20,height:20 }" class="me-1 text-xl"/> Terms of Services</RouterLink></li>
                                    <li class="mt-2.5"><RouterLink to="/privacy" class="text-slate-400 inline-flex hover:text-slate-500 dark:text-slate-300 dark:hover:text-slate-400 duration-500 ease-in-out"><ChevronRight :style="{ width: 20,height:20 }" class="me-1 text-xl"/> Privacy Policy</RouterLink></li>
                                    <li class="mt-2.5"><RouterLink to="/grid" class="text-slate-400 inline-flex hover:text-slate-500 dark:text-slate-300 dark:hover:text-slate-400 duration-500 ease-in-out"><ChevronRight :style="{ width: 20,height:20 }" class="me-1 text-xl"/> Listing</RouterLink></li>
                                    <li class="mt-2.5"><RouterLink to="/contact" class="text-slate-400 inline-flex hover:text-slate-500 dark:text-slate-300 dark:hover:text-slate-400 duration-500 ease-in-out"><ChevronRight :style="{ width: 20,height:20 }" class="me-1 text-xl"/> Contact</RouterLink></li>
                                </ul>
                            </div>

                            <div class="lg:col-span-3 md:col-span-4">
                                <h5 class="tracking-[1px] text-slate-900 dark:text-white font-semibold">Contact Details</h5>
                                <div class="flex mt-6">
                                    <MapPin class="size-5 text-primary me-3"/>
                                    <div class="">
                                        <h6 class="text-slate-400 mb-2">Floor 10, Office 1003, Metropolis Tower, <br /> Business Bay, Dubai, UAE</h6>
                                        <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178509925!2d55.2744!3d25.1972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e27a403e6b57!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1!5m2!1sen!2sae" data-type="iframe" class="text-primary hover:text-primary-dark duration-500 ease-in-out lightbox">View on Google map</a>
                                    </div>
                                </div>

                                <div class="flex mt-6">
                                    <Mail class="size-5 text-primary me-3"/>
                                    <div class="">
                                        <a href="mailto:info@kardoshrealty.ae" class="text-slate-400 duration-500 ease-in-out">info@kardoshrealty.ae</a>
                                    </div>
                                </div>

                                <div class="flex mt-6">
                                    <Phone class="size-5 text-primary me-3"/>
                                    <div class="">
                                        <a href="tel:+97141234567" class="text-slate-400 duration-500 ease-in-out">+971 4 123 4567</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Subscribe -->
                </div>
            </div>
        </div>

        <div class="py-7.5 px-0 border-t border-gray-200 dark:border-gray-700">
            <div class="container text-center">
                <div class="grid md:grid-cols-2 items-center gap-6">
                    <div class="md:text-start text-center">
                        <p class="mb-0 text-slate-400">© {{ year }} Kardosh Realty. Design & Develop by <a href="https://logixcontact.com/" target="_blank" rel="noopener noreferrer" class="text-reset hover:text-slate-600 transition-colors">Logix Contact</a>.</p>
                    </div>

                    <ul class="list-none md:text-end text-center">
                        <li class="inline ms-1"><a href="https://1.envato.market/hously-vue" target="_blank" class="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-200 dark:border-gray-700 rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><ShoppingCart class="size-4"/></a></li>
                        <li class="inline ms-1"><a href="https://dribbble.com/shreethemes" target="_blank" class="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-200 dark:border-gray-700 rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><Dribbble class="size-4"/></a></li>
                        <li class="inline ms-1"><a href="https://www.behance.net/shreethemes" target="_blank" class="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-200 dark:border-gray-700 rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><Globe :style="{ width: 17,height:17 }" class="align-baseline"/></a></li>
                        <li class="inline ms-1"><a href="http://linkedin.com/company/shreethemes" target="_blank" class="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-200 dark:border-gray-700 rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><Linkedin class="size-4"/></a></li>
                        <li class="inline ms-1"><a href="https://www.facebook.com/shreethemes" target="_blank" class="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-200 dark:border-gray-700 rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><Facebook class="size-4"/></a></li>
                        <li class="inline ms-1"><a href="https://www.instagram.com/shreethemes/" target="_blank" class="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-200 dark:border-gray-700 rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><Instagram class="size-4"/></a></li>
                        <li class="inline ms-1"><a href="https://twitter.com/shreethemes" target="_blank" class="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-200 dark:border-gray-700 rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><Twitter class="size-4"/></a></li>
                        <li class="inline ms-1"><a href="mailto:support@shreethemes.in" class="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-200 dark:border-gray-700 rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><Mail class="size-4"/></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import BrandLogo from '@/component/kardosh/BrandLogo.vue'

import {
    Mail,
    Pencil,
    ChevronRight,
    Dribbble,
    Facebook,
    Instagram,
    Linkedin,
    MapPin,
    Phone,
    ShoppingCart,
    Twitter,
    Globe
} from 'lucide-vue-next'

const year = new Date().getFullYear()
</script>