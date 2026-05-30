<template>
    <div class="container-fluid relative px-3">
        <div class="layout-specing">
            <div class="md:flex justify-between items-center">
                <h5 class="text-lg font-semibold">Calendar</h5>

                <ul class="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                    <li class="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-primary dark:hover:text-white"><RouterLink to="/">{{ BRAND.name }}</RouterLink></li>
                    <li class="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i class="ri-arrow-right-s-line"></i></li>
                    <li class="inline-block capitalize text-[16px] font-medium text-primary dark:text-white" aria-current="page">Calendar</li>
                </ul>
            </div>
            <div class="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-2">
                <div class="xl:col-span-2 lg:col-span-4">
                    <div id="external-events">
                        <div class="rounded-md shadow-sm dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900">
                            <span class="h6 font-semibold">All Events</span>
                        
                            <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event m-1 cursor-pointer bg-primary">
                                <div class="fc-event-main py-1 px-2">Metting</div>
                            </div>
                            <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event m-1 cursor-pointer bg-primary">
                                <div class="fc-event-main py-1 px-2">Operations</div>
                            </div>
                            <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event m-1 cursor-pointer bg-primary">
                                <div class="fc-event-main py-1 px-2">Lunch</div>
                            </div>
                            <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event m-1 cursor-pointer bg-primary">
                                <div class="fc-event-main py-1 px-2">Conference</div>
                            </div>
                            <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event m-1 cursor-pointer bg-primary">
                                <div class="fc-event-main py-1 px-2">Business Metting</div>
                            </div>
                        
                            <div class="mt-2">
                                <div class="flex items-center mb-0">
                                    <input class="form-checkbox rounded-sm border-gray-200 dark:border-gray-800 text-primary focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="drop-remove"/>
                                    <label class="form-checkbox-label text-slate-400" for="drop-remove">Remove after drop</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:col-span-10 lg:col-span-8">
                    <div id="calendar-container" class="rounded-md shadow-sm dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900">
                        <FullCalendar
                            :options="calendarOptions"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { BRAND } from '@/config/brand'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'

const events = ref([
    {
        date: '2023-09-16T13:00:00',
        title: 'Business Lunch'
    }
])

const calendarOptions = ref({
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',

    events: events.value,

    headerToolbar: {
        left: 'prev,next today addEventButton',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },

    customButtons: {
        addEventButton: {
            text: 'Add Event',
            click() {
                alert('Add Event Clicked!')
            }
        }
    }
})

onMounted(() => {
    document.documentElement.setAttribute('dir', 'ltr')

    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
})
</script>