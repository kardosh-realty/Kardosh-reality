<template>
    <div class="fixed top-[40%] -inset-e-3 z-50">
        <button type="button" id="switchRtl">
            <span class="cursor-pointer py-1 px-3 relative inline-block rounded-b-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow-sm dark:shadow-gray-700 font-bold rtl:block ltr:hidden" @click.prevent="changeLayout($event)">LTR</span>
            <span class="cursor-pointer py-1 px-3 relative inline-block rounded-t-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow-sm dark:shadow-gray-700 font-bold ltr:block rtl:hidden" @click.prevent="changeLayout($event)">RTL</span>
        </button>
    </div>
</template>

<script setup>
const changeLayout = (event) => {
    if (event.target.innerText === 'LTR') {
        document.documentElement.setAttribute('dir', 'ltr')
    } else {
        document.documentElement.setAttribute('dir', 'rtl')
    }
}
</script>