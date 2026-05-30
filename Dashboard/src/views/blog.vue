<template>
  <div class="container-fluid relative px-3 dash-page">
    <div class="layout-specing">
      <div class="md:flex justify-between items-center gap-4">
        <PageHeader title="Blog" crumb="Posts on the public website /blogs page" />
        <button
          type="button"
          class="btn bg-primary hover:bg-primary-dark text-white rounded-md inline-flex items-center gap-2 mt-3 md:mt-0 shrink-0"
          :disabled="!configured"
          @click="openCreate"
        >
          <i class="ri-add-line" /> New post
        </button>
      </div>

      <div
        v-if="!configured"
        class="mt-6 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 p-4 text-sm text-amber-800 dark:text-amber-200"
      >
        Supabase is not configured. Run migration <code class="text-xs">010_blogs_and_realtime.sql</code> in Supabase.
        <pre class="mt-3 p-3 rounded bg-slate-900 text-slate-100 text-xs overflow-x-auto max-h-48"><code>{{ setupSql }}</code></pre>
      </div>

      <div
        v-else-if="loadError"
        class="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800"
      >
        {{ loadError }}
      </div>

      <CardGridSkeleton v-else-if="loading" variant="blog" :count="6" />

      <div
        v-else-if="!items.length"
        class="mt-8 rounded-md border border-dashed border-gray-200 dark:border-gray-700 p-10 text-center text-slate-400"
      >
        <p>No blog posts yet. Publish posts to show them under Helpful links on the website.</p>
        <button type="button" class="btn bg-primary text-white rounded-md mt-4" @click="openCreate">New post</button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
        <article
          v-for="item in items"
          :key="item.id"
          class="rounded-md shadow-sm bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col"
        >
          <div class="aspect-[16/9] bg-slate-100 dark:bg-slate-800">
            <img v-if="item.coverImage" :src="item.coverImage" :alt="item.title" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
              <i class="ri-article-line text-4xl"></i>
            </div>
          </div>
          <div class="p-5 flex flex-col flex-1">
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <h6 class="font-semibold truncate">{{ item.title }}</h6>
                <p class="text-xs text-slate-400 font-mono truncate">/blog/{{ item.slug }}</p>
              </div>
              <span
                class="text-xs font-medium px-2 py-0.5 rounded-sm shrink-0"
                :class="item.published ? 'bg-emerald-600/10 text-emerald-600' : 'bg-slate-500/10 text-slate-500'"
              >
                {{ item.published ? 'Published' : 'Draft' }}
              </span>
            </div>
            <p class="text-sm text-slate-500 mt-2 line-clamp-2">{{ item.excerpt || 'No excerpt' }}</p>
            <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-1">
              <button
                type="button"
                class="size-8 inline-flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
                title="Edit"
                @click="openEdit(item)"
              >
                <i class="ri-edit-line"></i>
              </button>
              <button
                type="button"
                class="size-8 inline-flex items-center justify-center rounded-md text-red-500 hover:bg-red-50"
                title="Delete"
                @click="onDelete(item)"
              >
                <i class="ri-delete-bin-line"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div
      v-if="modalOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 overflow-y-auto overscroll-contain"
      @click.self="closeModal"
    >
      <div class="w-full max-w-3xl my-8 relative">
        <button
          type="button"
          class="absolute -top-2 end-0 z-10 size-9 inline-flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow border border-gray-200 dark:border-gray-700 text-slate-500"
          aria-label="Close"
          @click="closeModal"
        >
          <i class="ri-close-line text-lg"></i>
        </button>
        <BlogPostForm
          :initial="editingItem"
          :saving="saving"
          :upload-cover="uploadBlogCover"
          @save="onSave"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import CardGridSkeleton from '@/components/skeleton/CardGridSkeleton.vue'
import BlogPostForm from '@/components/BlogPostForm.vue'
import { useToast } from '@/composables/useToast'
import { isSupabaseConfigured } from '@/lib/supabase'
import {
  fetchAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogCover,
  BLOG_SETUP_SQL,
} from '@/services/blogs'

const toast = useToast()
const configured = isSupabaseConfigured()
const setupSql = BLOG_SETUP_SQL
const items = ref([])
const loading = ref(true)
const loadError = ref('')
const modalOpen = ref(false)
const editingItem = ref(null)
const saving = ref(false)

async function load() {
  loading.value = true
  loadError.value = ''
  try {
    const { items: list } = await fetchAllBlogs()
    items.value = list
  } catch (e) {
    loadError.value = e.message || 'Could not load posts'
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingItem.value = null
  modalOpen.value = true
}

function openEdit(item) {
  editingItem.value = item
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
  editingItem.value = null
}

async function onSave(payload) {
  saving.value = true
  try {
    if (payload.id) {
      await updateBlog(payload.id, payload)
      toast.success('Post updated.')
    } else {
      await createBlog(payload)
      toast.success('Post created.')
    }
    closeModal()
    await load()
  } catch (e) {
    toast.error(e.message || 'Could not save')
  } finally {
    saving.value = false
  }
}

async function onDelete(item) {
  if (!confirm(`Delete “${item.title}”?`)) return
  try {
    await deleteBlog(item.id)
    toast.success('Post deleted.')
    await load()
  } catch (e) {
    toast.error(e.message || 'Could not delete')
  }
}

onMounted(() => {
  if (!configured) {
    loading.value = false
    return
  }
  load()
})
</script>
