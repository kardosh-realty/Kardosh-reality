<template>
    <Navbar navClass="navbar-white" />

    <section class="relative md:h-screen flex items-center md:py-0 py-30 bg-no-repeat bg-center bg-cover" :style="{backgroundImage: `url(${bg})`}">
        <div class="absolute inset-0 bg-slate-950/40"></div>
        <div class="container relative">
            <div class="grid md:grid-cols-12 grid-cols-1 items-center gap-7.5 mt-10">
                <div class="lg:col-span-7 md:col-span-6">
                    <h1 class="font-bold lg:leading-normal leading-normal text-white text-5xl lg:text-7xl mb-4">Discover Your Dream Home</h1>

                    <p class="text-xl max-w-xl text-white/70">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>

                    <div class="mt-8">
                        <RouterLink to="" class="btn bg-primary hover:bg-primary-dark border border-primary text-white rounded-md">Explore More</RouterLink>
                        <RouterLink to="" class="btn border border-white text-white hover:bg-primary hover:border-primary rounded-md">Contact Us</RouterLink>
                    </div>
                </div>

                <FormTab />
            </div>
        </div>
    </section>

        <section class="relative md:py-24 py-16">
        <div class="container relative">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Why Choose Us?</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <AboutThree />
        </div>
        
        <div class="container relative mt-16">
            <Categories />
        </div>

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Featured Properties</h3>

                <p class="text-slate-400 max-w-xl">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <FeatureProperty />
        </div>

        <About />

        <div class="container relative lg:mt-24 mt-16">
            <div class="grid grid-cols-1 pb-8 text-center">
                <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                <p class="text-slate-400 max-w-xl mx-auto">Your trusted platform to buy, sell, and rent verified properties across the UAE with RERA-licensed transparency.</p>
            </div>

            <TeamOne />
        </div>
            
        <div class="container relative lg:mt-24 mt-16">
            <ClientTwo />
        </div>

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
import FormTab from '@/component/form-tab.vue';
import AboutThree from '@/component/about-three.vue';
import Categories from '@/component/categories.vue';
import FeatureProperty from '@/component/feature-property.vue';
import About from '@/component/about.vue';
import TeamOne from '@/component/team-one.vue';
import ClientTwo from '@/component/client-two.vue';
import BlogOne from '@/component/blog-one.vue';
import GetInTuch from '@/component/get-in-tuch.vue';
import Footer from '@/component/footer.vue';
import Switcher from '@/component/switcher.vue';

import bg from '@/assets/images/bg/7.jpg'
</script>