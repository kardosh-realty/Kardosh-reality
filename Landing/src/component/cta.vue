<template>
    <section class="relative py-24 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div class="absolute inset-0 bg-slate-900/60"></div>
        <div class="container relative">
            <div class="grid lg:grid-cols-12 grid-cols-1 md:text-start text-center justify-center">
                <div class="lg:col-start-2 lg:col-span-10">
                    <div class="grid md:grid-cols-3 grid-cols-1 items-center">
                        
                        <div class="counter-box text-center">
                            <h1 class="text-white lg:text-5xl text-4xl font-semibold mb-2">{{counts[0]}}+</h1>
                            <h5 class="counter-head text-white text-lg font-medium">Properties Sell</h5>
                        </div>
    
                        
                        <div class="counter-box text-center">
                            <h1 class="text-white lg:text-5xl text-4xl font-semibold mb-2">{{counts[1]}}+</h1>
                            <h5 class="counter-head text-white text-lg font-medium">Award Gained</h5>
                        </div>
    
                        
                        <div class="counter-box text-center">
                            <h1 class="text-white lg:text-5xl text-4xl font-semibold mb-2">{{counts[2]}}+</h1>
                            <h5 class="counter-head text-white text-lg font-medium">Years Experience</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const counts = ref([1010, 5, 1])

let timer = null

onMounted(() => {
    const starts = [1010, 5, 1]
    const ends = [1548, 25, 9]

    const duration = 500

    const increments = starts.map(
        (start, i) => (ends[i] - start) / (duration / 16)
    )

    let current = [...starts]

    timer = setInterval(() => {
        let completed = true

        current = current.map((value, i) => {
            value += increments[i]

            if (value < ends[i]) {
                completed = false
                return value
            } else {
                return ends[i]
            }
        })

        counts.value = current.map(v => Math.floor(v))

        if (completed) {
            clearInterval(timer)
        }

    }, 16)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
})
</script>