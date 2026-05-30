<template>
    <div class="fixed bottom-3 inset-e-3 z-50">
        <RouterLink to="/" class="back-button btn btn-icon bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md"><ArrowLeft class="size-4"/></RouterLink>
    </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
</script>