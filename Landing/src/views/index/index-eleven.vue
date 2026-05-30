<template>
    <Navbar />

    <section class="relative h-screen pt-30 bg-no-repeat md:bg-top bg-cover" :style="{backgroundImage: `url(${bg})`}">
        <div class="container relative">
            <div class="grid grid-cols-1 items-center mt-10">
                <div class="text-center">
                    <h1 class="font-bold lg:leading-normal leading-normal text-5xl lg:text-7xl mb-6">Buy, Sell & Rent.</h1>

                    <p class="text-xl max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>

                    <div class="mt-6">
                        <ul class="list-none relative">
                            <li class="inline-block relative"><RouterLink to=""><img :src="c1" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></RouterLink></li>
                            <li class="inline-block relative -ms-4"><RouterLink to=""><img :src="c2" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></RouterLink></li>
                            <li class="inline-block relative -ms-4"><RouterLink to=""><img :src="c3" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></RouterLink></li>
                            <li class="inline-block relative -ms-4"><RouterLink to=""><img :src="c4" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></RouterLink></li>
                            <li class="inline-block relative -ms-4"><RouterLink to=""><img :src="c5" class="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></RouterLink></li>
                        </ul>
                    </div>

                    <div class="subcribe-form z-1 max-w-xl mx-auto mt-8">
                        <form class="relative">
                            <i class="ri-search-line text-xl absolute top-3.5 inset-s-4"></i>
                            <input type="name" id="search_name" name="name" class="rounded-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 ps-12!" placeholder="Area, community, or building :"/>
                            <button type="submit" class="btn bg-primary hover:bg-primary-dark border-primary dark:border-primary text-white rounded-full!">Find Out</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>   

    <section class="relative md:py-24 py-16">
        <div class="container relative">
            <div class="grid grid-cols-1 pb-8">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Featured Properties</h3>

                <p class="text-slate-400 max-w-xl">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <FeatureProperty />
        </div>

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Why Choose Us?</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <AboutThree />
        </div>
        
        <div class="container relative mt-16">
            <Categories />
        </div>

        <About />

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <TeamOne />
        </div>
            
        <ClientTwo />

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Latest Blogs & News</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <BlogOne />
        </div>

        <GetInTuch />
    </section>

    <Footer />

    <Switcher />
</template>

<script setup>
import Navbar from '@/component/navbar.vue';
import FeatureProperty from '@/component/feature-property.vue';
import AboutThree from '@/component/about-three.vue';
import Categories from '@/component/categories.vue';
import About from '@/component/about.vue';
import TeamOne from '@/component/team-one.vue';
import ClientTwo from '@/component/client-two.vue';
import BlogOne from '@/component/blog-one.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import bg from '@/assets/images/bg/bg4.png'
import c1 from '@/assets/images/client/01.jpg'
import c2 from '@/assets/images/client/02.jpg'
import c3 from '@/assets/images/client/03.jpg'
import c4 from '@/assets/images/client/04.jpg'
import c5 from '@/assets/images/client/05.jpg'
</script>