<template>
    <div class="container-fluid relative px-3">
        <div class="layout-specing">
            <div class="md:flex justify-between items-center">
                <h5 class="text-lg font-semibold">
                    {{
                        data?.title
                            ? data.title
                            : 'Skills That You Can Learn In The Real Estate Market'
                    }}
                </h5>

                <ul class="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                    <li class="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-primary dark:hover:text-white"><RouterLink to="/">Hously</RouterLink></li>
                    <li class="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i class="ri-arrow-right-s-line"></i></li>
                    <li class="inline-block capitalize text-[16px] font-medium text-primary dark:text-white" aria-current="page">Blog Detail</li>
                </ul>
            </div>

            <div class="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
                <div class="lg:col-span-8 md:order-1 order-2">
                    <div class="relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700">

                        <img :src="data?.image ? data.image : property9" alt=""/>

                        <div class="p-6">
                            <p class="text-slate-400">The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century. Lorem Ipsum is composed in a pseudo-Latin language which more or less corresponds to 'proper' Latin. It contains a series of real Latin words. This ancient dummy text is also incomprehensible, but it imitates the rhythm of most European languages in Latin script.</p>
                            <p class="text-slate-400 italic border-x-4 border-primary rounded-ss-xl rounded-ee-xl mt-3 p-3">" There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. "</p>
                            <p class="text-slate-400 mt-3">The advantage of its Latin origin and the relative meaninglessness of Lorum Ipsum is that the text does not attract attention to itself or distract the viewer's attention from the layout.</p>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-900 rounded-md p-6 shadow-sm shadow-gray-200 dark:shadow-gray-700 mt-6">
                        <h5 class="text-lg font-semibold">Leave A Comment:</h5>

                        <form class="mt-8">
                            <div class="grid lg:grid-cols-12 lg:gap-6">
                                <div class="lg:col-span-6 mb-5">
                                    <div class="text-start">
                                        <label for="name" class="font-semibold">Your Name:</label>
                                        <div class="form-icon relative mt-2">
                                            <User class="size-4 absolute top-3 inset-s-4"/>
                                            <input name="name" id="name" type="text" class="form-input border border-gray-200! dark:border-gray-800! ps-11!" placeholder="Name :"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="lg:col-span-6 mb-5">
                                    <div class="text-start">
                                        <label for="email" class="font-semibold">Your Email:</label>
                                        <div class="form-icon relative mt-2">
                                            <Mail class="size-4 absolute top-3 inset-s-4"/>
                                            <input name="email" id="email" type="email" class="form-input border border-gray-200! dark:border-gray-800! ps-11!" placeholder="Email :"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-1">
                                <div class="mb-5">
                                    <div class="text-start">
                                        <label for="comments" class="font-semibold">Your Comment:</label>
                                        <div class="form-icon relative mt-2">
                                            <MessageCircle class="size-4 absolute top-3 inset-s-4"/>
                                            <textarea name="comments" id="comments" class="form-input border border-gray-200! dark:border-gray-800! ps-11! h-28!" placeholder="Message :"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" id="submit" name="send" class="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md w-full">Send Message</button>
                        </form>
                    </div>
                </div>

                <div class="lg:col-span-4 md:order-2 order-1">
                    <div class="bg-white dark:bg-slate-900 rounded-md p-6 shadow-sm shadow-gray-200 dark:shadow-gray-700">
                        <form>
                            <div>
                                <label for="searchname" class="font-medium text-lg">Search Properties</label>
                                <div class="relative mt-2">
                                    <i class="ri-search-line text-lg absolute top-1.5 inset-s-3"></i>
                                    <input name="search" id="searchname" type="text" class="form-input border border-gray-200! dark:border-gray-800! ps-10!" placeholder="Search"/>
                                </div>
                            </div>
                        </form>

                        <h5 class="font-medium text-lg mt-7.5">Recent post</h5>
                            <div v-for="(item, index) in recentPost" :key="index" class="flex items-center mt-4">
                                <img :src="item.image" class="h-16 rounded-md shadow-sm  dark:shadow-gray-800" alt=""/>

                                <div class="ms-3">
                                    <RouterLink to="" class="font-medium hover:text-primary">{{item.title}}</RouterLink>
                                    <p class="text-sm text-slate-400">{{item.date}}</p>
                                </div>
                            </div>

                        <h5 class="font-medium text-lg mt-7.5">Social sites</h5>
                        <ul class="list-none mt-4">
                            <li class="inline"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><Facebook class="size-4"/></RouterLink></li>
                            <li class="inline"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><Instagram class="size-4"/></RouterLink></li>
                            <li class="inline"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><Twitter class="size-4"/></RouterLink></li>
                            <li class="inline"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><Linkedin class="size-4"/></RouterLink></li>
                            <li class="inline"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><Github class="size-4"/></RouterLink></li>
                            <li class="inline"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><Youtube class="size-4"/></RouterLink></li>
                            <li class="inline"><RouterLink to="" class="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><Gitlab class="size-4"/></RouterLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'

import property9 from '@/assets/images/property/9.jpg'

import { blogData, recentPost } from "@/data/data";

import {
  Facebook,
  Github,
  Gitlab,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Twitter,
  User,
  Youtube
} from 'lucide-vue-next'

const route = useRoute()

const id = route.params.id

// find blog
const data = blogData.find(
    (blog) => blog.id === parseInt(id)
)
</script>