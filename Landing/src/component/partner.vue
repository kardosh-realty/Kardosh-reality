<template>
    <section class="pt-10">
        <div class="container relative">
            <div class="grid md:grid-cols-6 grid-cols-2 justify-center gap-7.5">
                <div class="mx-auto py-4">
                    <img :src="image1" class="h-6" alt=""/>
                </div>

                <div class="mx-auto py-4">
                    <img :src="image2" class="h-6" alt=""/>
                </div>
                
                <div class="mx-auto py-4">
                    <img :src="image3" class="h-6" alt=""/>
                </div>
                
                <div class="mx-auto py-4">
                    <img :src="image4" class="h-6" alt=""/>
                </div>
                
                <div class="mx-auto py-4">
                    <img :src="image5" class="h-6" alt=""/>
                </div>
                
                <div class="mx-auto py-4">
                    <img :src="image6" class="h-6" alt=""/>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import image1 from '@/assets/images/client/amazon.svg'
import image2 from '@/assets/images/client/google.svg'
import image3 from '@/assets/images/client/lenovo.svg'
import image4 from '@/assets/images/client/paypal.svg'
import image5 from '@/assets/images/client/shopify.svg'
import image6 from '@/assets/images/client/spotify.svg'
</script>