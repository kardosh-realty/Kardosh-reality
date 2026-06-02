<template>
  <section
    class="share-review-page relative min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4 sm:p-6"
    :style="{ backgroundImage: `url(${pageBg})` }"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900/75 to-slate-950/80" aria-hidden="true" />

    <div class="share-review-card relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl flex flex-col md:flex-row bg-white dark:bg-slate-900 shadow-2xl">
      <!-- Brand panel -->
      <div
        class="share-review-panel hidden md:flex md:w-[42%] relative overflow-hidden border-r border-gray-100 dark:border-slate-800 bg-cover bg-center"
        :style="{ backgroundImage: `url(${panelBg})` }"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-dark/85 to-slate-900/90" />
        <div class="relative z-10 flex flex-col items-center justify-center p-8 lg:p-10 text-center min-h-[520px]">
          <RouterLink
            to="/"
            class="mb-6 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3.5 shadow-lg shadow-black/15 max-w-[220px]"
          >
            <BrandLogo variant="full" size="inline" class="share-review-logo" />
          </RouterLink>
          <h2 class="text-2xl lg:text-3xl font-bold text-white leading-tight">{{ site.companyName }}</h2>
          <p class="text-sm text-white/85 max-w-[260px] mt-3 leading-relaxed">
            We value your feedback. Share your Dubai property journey with us in a few minutes.
          </p>
          <ul class="mt-8 space-y-2 text-left text-sm text-white/80 max-w-[260px] list-none p-0 m-0">
            <li class="flex items-start gap-2">
              <ShieldCheck class="size-4 text-white mt-0.5 shrink-0" aria-hidden="true" />
              <span>Reviews are checked before publishing</span>
            </li>
            <li class="flex items-start gap-2">
              <Clock class="size-4 text-white mt-0.5 shrink-0" aria-hidden="true" />
              <span>Takes about 2 minutes</span>
            </li>
          </ul>
          <p v-if="reraLabel" class="text-xs text-white/55 mt-auto pt-8">{{ reraLabel }}</p>
        </div>
      </div>

      <!-- Form panel -->
      <div class="share-review-form w-full md:w-[58%] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center min-h-[420px]">
        <div class="md:hidden flex justify-center mb-6">
          <RouterLink to="/" class="inline-flex max-w-[180px]">
            <BrandLogo variant="full" size="inline" />
          </RouterLink>
        </div>

        <div v-if="validating" class="py-12 text-center text-slate-400 text-sm">
          <Loader2 class="size-6 mx-auto animate-spin" aria-hidden="true" />
          <p class="mt-2">Checking your link…</p>
        </div>

        <template v-else-if="!invite">
          <div class="text-center py-6">
            <span class="inline-flex size-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40 text-red-500 mb-4">
              <Link2Off class="size-7" aria-hidden="true" />
            </span>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white">Link not valid</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
              This review link is invalid or has expired. Please contact {{ site.companyName }} for a new link.
            </p>
            <RouterLink
              to="/"
              class="btn bg-primary hover:bg-primary-dark text-white rounded-lg mt-6 inline-flex px-6"
            >
              Back to website
            </RouterLink>
          </div>
        </template>

        <template v-else-if="submitted">
          <div class="text-center py-6">
            <span class="inline-flex size-14 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-600 mb-4">
              <Check class="size-7" aria-hidden="true" />
            </span>
            <h1 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Thank you!</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
              Your review was submitted. Our team will approve it before it appears on the website.
            </p>
            <RouterLink
              to="/"
              class="btn btn-secondary mt-6 inline-flex"
            >
              Visit {{ site.companyName }}
            </RouterLink>
          </div>
        </template>

        <template v-else>
          <h1 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Share your experience</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Tell us about working with {{ site.companyName }}. Your review helps future buyers and investors.
            This link is shared with many clients — please submit only your own experience.
          </p>

          <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
            <div
              v-if="formError"
              class="rounded-md border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40 p-3 text-sm text-red-700 dark:text-red-200"
            >
              {{ formError }}
            </div>

            <div>
              <span class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your photo</span>
              <div class="flex items-center gap-4">
                <div
                  class="size-16 rounded-full border-2 border-slate-200 dark:border-slate-600 overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0"
                >
                  <img
                    v-if="photoPreview"
                    :src="photoPreview"
                    alt="Preview"
                    class="size-full object-cover"
                  />
                  <User v-else class="size-8 text-slate-400" aria-hidden="true" />
                </div>
                <div class="min-w-0 flex-1">
                  <input
                    ref="photoInput"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    class="hidden"
                    @change="onPhotoPick"
                  />
                  <button
                    type="button"
                    class="text-sm font-medium text-primary hover:underline"
                    @click="photoInput?.click()"
                  >
                    {{ photoFile ? 'Change photo' : 'Add photo (optional)' }}
                  </button>
                  <button
                    v-if="photoFile || photoPreview"
                    type="button"
                    class="block text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 mt-1"
                    @click="clearPhoto"
                  >
                    Remove photo
                  </button>
                  <p class="text-xs text-slate-400 mt-1">JPG, PNG or WebP · max 2 MB</p>
                </div>
              </div>
            </div>

            <div>
              <label for="review-name" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Your name <span class="text-primary">*</span>
              </label>
              <input
                id="review-name"
                v-model.trim="form.name"
                type="text"
                required
                autocomplete="name"
                placeholder="Full name"
                class="share-review-input"
              />
            </div>

            <div>
              <label for="review-role" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Role / title
              </label>
              <input
                id="review-role"
                v-model.trim="form.role"
                type="text"
                placeholder="e.g. Investor, UK"
                class="share-review-input"
              />
            </div>

            <div>
              <label for="review-text" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Your review <span class="text-primary">*</span>
              </label>
              <textarea
                id="review-text"
                v-model.trim="form.text"
                rows="4"
                required
                placeholder="What stood out about your experience?"
                class="share-review-input min-h-[100px] resize-y"
              />
            </div>

            <div>
              <span class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Rating</span>
              <div
                class="flex items-center gap-0.5"
                role="group"
                aria-label="Star rating"
                @mouseleave="hoverRating = 0"
              >
                <button
                  v-for="n in 5"
                  :key="n"
                  type="button"
                  class="p-1.5 rounded-md transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  :aria-label="`Rate ${n} out of 5 stars`"
                  :aria-pressed="form.rating >= n"
                  @click="form.rating = n"
                  @mouseenter="hoverRating = n"
                >
                  <Star
                    :size="32"
                    :stroke-width="1.5"
                    :class="
                      n <= displayRating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-transparent text-slate-300 dark:text-slate-500'
                    "
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              :disabled="submitting"
              class="share-review-submit group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary-dark py-3 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              <span class="flex items-center justify-center">
                {{ submitting ? 'Submitting…' : 'Submit review' }}
                <ArrowRight v-if="!submitting" class="ms-2 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </button>
          </form>
        </template>

        <p class="text-center text-xs text-slate-400 mt-8">© {{ year }} {{ site.companyName }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  ArrowRight,
  Check,
  Clock,
  Link2Off,
  Loader2,
  ShieldCheck,
  Star,
  User,
} from 'lucide-vue-next'
import { useRoute, RouterLink } from 'vue-router'
import BrandLogo from '@/component/kardosh/BrandLogo.vue'
import { site, reraLabel } from '@/composables/useSiteSettings'
import {
  validateInviteToken,
  submitCustomerReview,
  uploadCustomerTestimonialPhoto,
} from '@/services/testimonialInvite'
import panelBg from '@/assets/images/bg/001-hero.webp'
import pageBg from '@/assets/images/bg/01.jpg'

const route = useRoute()
const year = new Date().getFullYear()
const invite = ref(null)
const validating = ref(true)
const submitted = ref(false)
const submitting = ref(false)
const formError = ref('')

const form = ref({
  name: '',
  role: '',
  text: '',
  rating: 5,
  image: '',
})

const photoInput = ref(null)
const photoFile = ref(null)
const photoPreview = ref('')
const hoverRating = ref(0)

const displayRating = computed(() => hoverRating.value || form.value.rating)

function onPhotoPick(ev) {
  const file = ev.target?.files?.[0]
  if (!file) return
  if (photoPreview.value?.startsWith('blob:')) {
    URL.revokeObjectURL(photoPreview.value)
  }
  photoFile.value = file
  photoPreview.value = URL.createObjectURL(file)
  form.value.image = ''
}

function clearPhoto() {
  if (photoPreview.value?.startsWith('blob:')) {
    URL.revokeObjectURL(photoPreview.value)
  }
  photoFile.value = null
  photoPreview.value = ''
  form.value.image = ''
  if (photoInput.value) photoInput.value.value = ''
}

onMounted(async () => {
  invite.value = await validateInviteToken(route.params.token)
  validating.value = false
})

async function onSubmit() {
  if (!invite.value) return
  formError.value = ''
  submitting.value = true
  try {
    let imageUrl = form.value.image
    if (photoFile.value) {
      imageUrl = await uploadCustomerTestimonialPhoto(photoFile.value)
    }
    await submitCustomerReview(invite.value.id, { ...form.value, image: imageUrl })
    clearPhoto()
    submitted.value = true
  } catch (e) {
    formError.value = e.message || 'Could not submit your review. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.share-review-logo :deep(.kardosh-brand-img) {
  max-height: 2.5rem;
  width: auto;
}

.share-review-input {
  display: flex;
  width: 100%;
  min-height: 2.75rem;
  margin-top: 0.25rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: rgb(15 23 42);
  background: rgb(248 250 252);
  border: 1px solid rgb(226 232 240);
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.dark .share-review-input {
  color: #fff;
  background: rgb(30 41 59);
  border-color: rgb(71 85 105);
}

.share-review-input:focus {
  border-color: var(--color-primary, #1e3a5f);
  box-shadow: 0 0 0 2px rgb(0 166 62 / 0.2);
}

.share-review-card {
  animation: share-review-in 0.5s ease both;
}

@keyframes share-review-in {
  from {
    opacity: 0;
    transform: scale(0.97) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .share-review-card {
    animation: none;
  }
}
</style>
