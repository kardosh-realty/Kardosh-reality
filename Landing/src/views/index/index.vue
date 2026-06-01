<template>
  <Navbar nav-class="navbar-white" />

  <HomeHero />

  <section class="relative md:pb-24 pb-16 home-page-stack">
    <Property />
    <WhyInvestDubai />
    <FeaturedDevelopers />
    <MostSoldOffPlan />
    <About />
    <InternationalBrokerStrip />
    <Client />
    <HomeCta />
    <DeveloperLogoMarquee />
    <GetInTuch />
  </section>
  <Footer />
  <Switcher />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import Navbar from '@/component/navbar.vue'
import HomeHero from '@/component/kardosh/home/HomeHero.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'

/** Below-fold sections — smaller initial JS parse for faster FCP / TBT */
const Property = defineAsyncComponent(() => import('@/component/Properties/property.vue'))
const WhyInvestDubai = defineAsyncComponent(() => import('@/component/kardosh/home/WhyInvestDubai.vue'))
const DeveloperLogoMarquee = defineAsyncComponent(
  () => import('@/component/kardosh/home/DeveloperLogoMarquee.vue')
)
const FeaturedDevelopers = defineAsyncComponent(() => import('@/component/kardosh/home/FeaturedDevelopers.vue'))
const MostSoldOffPlan = defineAsyncComponent(() => import('@/component/kardosh/home/MostSoldOffPlan.vue'))
const About = defineAsyncComponent(() => import('@/component/about.vue'))
const InternationalBrokerStrip = defineAsyncComponent(
  () => import('@/component/kardosh/home/InternationalBrokerStrip.vue')
)
const Client = defineAsyncComponent(() => import('@/component/client.vue'))
const HomeCta = defineAsyncComponent(() => import('@/component/kardosh/home/HomeCta.vue'))
const GetInTuch = defineAsyncComponent(() => import('@/component/get-in-tuch.vue'))
</script>
