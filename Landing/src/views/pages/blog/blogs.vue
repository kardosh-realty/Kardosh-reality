<template>
  <Navbar nav-class="navbar-white" />

  <PageHero
    title="Blog & insights"
    subtitle="Dubai property market updates, off-plan guides, and investor tips from Kardosh Realty."
    :image="PAGE_HERO_IMAGES.about"
  />

  <section class="relative md:py-24 py-16">
    <div class="container-fluid">
      <p v-if="loading" class="text-center text-slate-400">Loading posts…</p>
      <p v-else-if="loadError" class="text-center text-red-600 max-w-lg mx-auto">{{ loadError }}</p>
      <p v-else-if="!supabaseReady" class="text-center text-amber-700 dark:text-amber-400 max-w-lg mx-auto">
        Blog is not connected to the database. Add <code class="text-xs">VITE_SUPABASE_URL</code> and
        <code class="text-xs">VITE_SUPABASE_ANON_KEY</code> to <code class="text-xs">kardosh/.env</code> and restart the landing dev server.
      </p>
      <p v-else-if="!posts.length" class="text-center text-slate-400 max-w-md mx-auto">
        No published posts yet. In the dashboard, open <strong>Blog</strong>, edit a post, and enable
        <strong>Visible on /blogs</strong>, then save.
      </p>

      <div v-else class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7.5">
        <article
          v-for="item in posts"
          :key="item.id"
          class="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow-sm shadow-gray-200 dark:shadow-gray-700 transition-all duration-500 hover:-mt-1"
        >
          <div class="relative overflow-hidden aspect-[16/10] bg-slate-100 dark:bg-slate-800">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div class="absolute inset-e-4 top-4">
              <span class="bg-primary text-white text-sm px-2.5 py-1 font-medium rounded-full">
                {{ item.type }}
              </span>
            </div>
          </div>

          <div class="p-6">
            <div class="flex justify-between mb-4 text-sm text-slate-400">
              <span class="flex items-center gap-1.5">
                <Calendar class="size-3.5" />
                {{ item.date }}
              </span>
              <span class="flex items-center gap-1.5">
                <Clock3 class="size-3.5" />
                {{ item.readMinutes }} min read
              </span>
            </div>

            <RouterLink
              :to="`/blog/${item.slug}`"
              class="text-xl font-medium hover:text-primary duration-500 block"
            >
              {{ item.title }}
            </RouterLink>
            <p v-if="item.excerpt" class="text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-2">
              {{ item.excerpt }}
            </p>
            <RouterLink
              :to="`/blog/${item.slug}`"
              class="btn btn-link hover:text-primary after:bg-primary duration-500 ease-in-out mt-3 inline-flex items-center"
            >
              Read more
              <ArrowRight class="size-4 ms-1" />
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, Calendar, Clock3 } from 'lucide-vue-next'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import { PAGE_HERO_IMAGES } from '@/config/dubai-images'
import { fetchPublishedBlogs } from '@/services/blogs'

const posts = ref([])
const loading = ref(true)
const loadError = ref('')
const supabaseReady = ref(true)

onMounted(async () => {
  try {
    const result = await fetchPublishedBlogs()
    supabaseReady.value = result.configured !== false
    if (result.error) {
      loadError.value = result.error
      posts.value = []
    } else {
      posts.value = result.items
    }
  } catch (e) {
    loadError.value = e.message || 'Could not load blog posts'
  } finally {
    loading.value = false
  }
})
</script>
