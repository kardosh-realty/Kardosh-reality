<template>
  <Navbar nav-class="navbar-white" />

  <PageHero
    :title="post?.title || 'Blog'"
    :subtitle="post?.excerpt || ''"
    :image="post?.image || PAGE_HERO_IMAGES.about"
  />

  <section class="relative md:py-24 py-16">
    <div class="container-fluid max-w-3xl">
      <p v-if="loading" class="text-center text-slate-400">Loading…</p>
      <p v-else-if="notFound" class="text-center text-slate-400">
        Post not found.
        <RouterLink to="/blogs" class="text-primary hover:underline block mt-2">Back to blog</RouterLink>
      </p>

      <article v-else-if="post">
        <ul class="list-none flex flex-wrap gap-4 text-sm text-slate-400 mb-8">
          <li><span class="text-slate-600 dark:text-slate-300 font-medium">Author:</span> {{ post.author }}</li>
          <li v-if="post.date"><span class="text-slate-600 dark:text-slate-300 font-medium">Date:</span> {{ post.date }}</li>
          <li><span class="text-slate-600 dark:text-slate-300 font-medium">Read:</span> {{ post.readMinutes }} min</li>
        </ul>

        <img
          v-if="post.image"
          :src="post.image"
          :alt="post.title"
          class="w-full rounded-xl shadow-sm mb-8 object-cover max-h-[420px]"
        />

        <!-- eslint-disable-next-line vue/no-v-html -->
        <div
          v-if="bodyHtml"
          class="kardosh-blog-prose"
          v-html="bodyHtml"
        />

        <RouterLink
          to="/blogs"
          class="inline-flex items-center gap-2 mt-10 text-primary font-medium hover:underline"
        >
          <ArrowLeft class="size-4" /> All posts
        </RouterLink>
      </article>
    </div>
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import { PAGE_HERO_IMAGES } from '@/config/dubai-images'
import { fetchBlogBySlug } from '@/services/blogs'
import { formatBlogBodyForDisplay } from '@/utils/renderBlogBody'

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const notFound = ref(false)

const bodyHtml = computed(() => formatBlogBodyForDisplay(post.value?.body))

async function loadPost() {
  loading.value = true
  notFound.value = false
  post.value = null
  try {
    const { item } = await fetchBlogBySlug(route.params.slug)
    if (!item) notFound.value = true
    else post.value = item
  } catch {
    notFound.value = true
  } finally {
    loading.value = false
  }
}

watch(() => route.params.slug, loadPost, { immediate: true })
onMounted(loadPost)
</script>
