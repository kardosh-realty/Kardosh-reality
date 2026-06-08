<template>
  <div class="container-fluid relative px-3 dash-page">
    <div class="layout-specing">
      <PageHeader title="Settings" crumb="Branding, contact, socials, and admin account" />

      <div
        v-if="!configured"
        class="mt-6 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 p-4 text-sm text-amber-800 dark:text-amber-200"
      >
        Supabase is not configured, so changes can't be saved or shared with the public website.
        Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to <code>.env</code>.
      </div>

      <!-- Website settings -->
      <form @submit.prevent="onSaveSite">
        <div class="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-6">
          <!-- Logo + branding -->
          <div class="lg:col-span-6">
            <div class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900 p-6 h-full">
              <h6 class="text-lg font-semibold border-b border-gray-100 dark:border-gray-800 pb-4">Branding</h6>

              <div class="flex items-center gap-4 mt-4">
                <div class="size-20 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                  <img v-if="form.logo" :src="form.logo" alt="Logo preview" class="max-h-16 max-w-full object-contain" />
                  <i v-else class="ri-image-line text-2xl text-slate-400"></i>
                </div>
                <div>
                  <input ref="logoInput" type="file" accept="image/*" class="hidden" @change="onLogoChange" />
                  <button
                    type="button"
                    class="btn bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md text-sm"
                    :disabled="uploadingLogo || !configured"
                    @click="logoInput?.click()"
                  >
                    {{ uploadingLogo ? 'Uploading…' : 'Upload logo' }}
                  </button>
                  <p class="text-xs text-slate-400 mt-2">PNG or SVG, transparent background recommended.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4 mt-5">
                <div>
                  <label class="font-medium">Company name</label>
                  <input v-model.trim="form.companyName" type="text" class="form-input border border-gray-200! dark:border-gray-800! mt-2" />
                </div>
                <div>
                  <label class="font-medium">Tagline</label>
                  <textarea v-model.trim="form.tagline" rows="2" class="form-input border border-gray-200! dark:border-gray-800! mt-2"></textarea>
                </div>
                <div>
                  <label class="font-medium">RERA license</label>
                  <input v-model.trim="form.reraLicense" type="text" class="form-input border border-gray-200! dark:border-gray-800! mt-2" />
                </div>
              </div>
            </div>
          </div>

          <!-- Contact -->
          <div class="lg:col-span-6">
            <div class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900 p-6 h-full">
              <h6 class="text-lg font-semibold border-b border-gray-100 dark:border-gray-800 pb-4">Contact</h6>
              <div class="grid grid-cols-1 gap-4 mt-4">
                <div>
                  <label class="font-medium">Email</label>
                  <input v-model.trim="form.email" type="email" class="form-input border border-gray-200! dark:border-gray-800! mt-2" />
                </div>
                <div>
                  <label class="font-medium">Phone</label>
                  <input v-model.trim="form.phone" type="text" class="form-input border border-gray-200! dark:border-gray-800! mt-2" />
                </div>
                <div>
                  <label class="font-medium">WhatsApp number</label>
                  <input v-model.trim="form.whatsappPhone" type="text" placeholder="Defaults to phone if empty" class="form-input border border-gray-200! dark:border-gray-800! mt-2" />
                </div>
                <div>
                  <label class="font-medium">Address (full)</label>
                  <input v-model.trim="form.address" type="text" class="form-input border border-gray-200! dark:border-gray-800! mt-2" />
                </div>
                <div>
                  <label class="font-medium">Address (short)</label>
                  <input v-model.trim="form.addressShort" type="text" class="form-input border border-gray-200! dark:border-gray-800! mt-2" />
                </div>
              </div>
            </div>
          </div>

          <!-- Socials -->
          <div class="lg:col-span-12">
            <div class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900 p-6">
              <h6 class="text-lg font-semibold border-b border-gray-100 dark:border-gray-800 pb-4">Social profiles</h6>

              <div class="space-y-3 mt-4">
                <div
                  v-for="(social, i) in form.socials"
                  :key="i"
                  class="grid grid-cols-[1fr_auto] sm:grid-cols-[11rem_minmax(0,1fr)_auto] gap-3 items-center"
                >
                  <select
                    v-model="social.platform"
                    class="form-select form-input border border-gray-200! dark:border-gray-800! w-full min-w-0 col-span-2 sm:col-span-1"
                  >
                    <option v-for="opt in SOCIAL_PLATFORM_OPTIONS" :key="opt.value" :value="opt.value">
                      {{ opt.label }}
                    </option>
                  </select>
                  <input
                    v-model.trim="social.url"
                    type="url"
                    placeholder="https://…"
                    class="form-input border border-gray-200! dark:border-gray-800! w-full min-w-0"
                  />
                  <button
                    type="button"
                    class="inline-flex items-center justify-center size-10 rounded-md border border-red/30 text-red hover:bg-red hover:text-white transition-colors shrink-0"
                    aria-label="Remove social profile"
                    @click="removeSocial(i)"
                  >
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </div>

                <p v-if="!form.socials.length" class="text-sm text-slate-400">No social profiles yet.</p>
              </div>

              <button
                type="button"
                class="btn bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md text-sm mt-4"
                @click="addSocial"
              >
                <i class="ri-add-line me-1"></i> Add social
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" :disabled="savingSite || !configured" class="btn bg-primary hover:bg-primary-dark text-white rounded-md disabled:opacity-60 disabled:cursor-not-allowed">
            {{ savingSite ? 'Saving…' : 'Save website settings' }}
          </button>
        </div>
      </form>

      <!-- Account -->
      <form @submit.prevent="onSaveAccount">
        <div class="grid grid-cols-1 mt-8 gap-6">
          <div>
            <div class="relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-white dark:bg-slate-900 p-6">
              <h6 class="text-lg font-semibold border-b border-gray-100 dark:border-gray-800 pb-4">Admin account</h6>

              <div class="flex items-center gap-4 mt-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div class="size-20 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    v-if="account.avatarUrl"
                    :src="account.avatarUrl"
                    alt="Profile preview"
                    class="size-full object-cover"
                  />
                  <span
                    v-else
                    class="text-xl font-semibold text-primary"
                  >
                    {{ profileInitials }}
                  </span>
                </div>
                <div>
                  <input ref="avatarInput" type="file" accept="image/*" class="hidden" @change="onAvatarChange" />
                  <button
                    type="button"
                    class="btn bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md text-sm"
                    :disabled="uploadingAvatar || !configured"
                    @click="avatarInput?.click()"
                  >
                    {{ uploadingAvatar ? 'Uploading…' : 'Upload profile photo' }}
                  </button>
                  <p class="text-xs text-slate-400 mt-2">Shown in the top-right profile menu. Square photo recommended.</p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                <div>
                  <label class="font-medium">Display name (username)</label>
                  <input v-model.trim="account.displayName" type="text" class="form-input border border-gray-200! dark:border-gray-800! mt-2" />
                </div>
                <div>
                  <label class="font-medium">Login email</label>
                  <input v-model.trim="account.email" type="email" class="form-input border border-gray-200! dark:border-gray-800! mt-2" />
                </div>
                <div>
                  <div class="flex items-center justify-between">
                    <label class="font-medium">New password</label>
                    <div class="relative" @mouseenter="hoverReqs = true" @mouseleave="hoverReqs = false">
                      <Info :size="18" class="cursor-pointer transition-colors" :class="account.password ? strengthTextColor : 'text-slate-400'" />
                      <Transition name="fade">
                        <div v-if="reqsOpen" class="absolute right-0 z-20 mt-2 w-60 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 p-3 shadow-lg">
                          <ul class="space-y-1.5" aria-label="Password requirements">
                            <li v-for="req in passwordRequirements" :key="req.text" class="flex items-center gap-2">
                              <Check v-if="req.met" :size="16" class="text-emerald-500 shrink-0" />
                              <X v-else :size="16" class="text-slate-400 shrink-0" />
                              <span class="text-xs" :class="req.met ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'">{{ req.text }}</span>
                            </li>
                          </ul>
                        </div>
                      </Transition>
                    </div>
                  </div>
                  <div class="relative mt-2">
                    <input
                      v-model="account.password"
                      :type="showPassword ? 'text' : 'password'"
                      autocomplete="new-password"
                      placeholder="Leave blank to keep current"
                      class="form-input border-2! pr-10!"
                      :class="account.password ? strengthBorder : 'border-gray-200! dark:border-gray-800!'"
                      @focus="focusReqs = true"
                      @blur="focusReqs = false"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-slate-400 hover:text-primary"
                      :aria-label="showPassword ? 'Hide password' : 'Show password'"
                      @click="showPassword = !showPassword"
                    >
                      <EyeOff v-if="showPassword" :size="16" />
                      <Eye v-else :size="16" />
                    </button>
                  </div>
                  <div v-if="account.password" class="mt-2">
                    <div class="flex gap-1">
                      <span
                        v-for="n in 5"
                        :key="n"
                        class="h-1 flex-1 rounded-full transition-colors"
                        :class="n <= strengthScore ? strengthBarColor : 'bg-gray-200 dark:bg-slate-700'"
                      />
                    </div>
                    <p class="mt-1 text-xs" :class="strengthTextColor">{{ strengthText }}</p>
                  </div>
                </div>
                <div>
                  <label class="font-medium">Confirm new password</label>
                  <div class="relative mt-2">
                    <input
                      v-model="account.confirm"
                      :type="showPassword ? 'text' : 'password'"
                      autocomplete="new-password"
                      class="form-input border-2! pr-10!"
                      :class="!account.confirm ? 'border-gray-200! dark:border-gray-800!' : (passwordsMatch ? 'border-green-400!' : 'border-red-500!')"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-slate-400 hover:text-primary"
                      :aria-label="showPassword ? 'Hide password' : 'Show password'"
                      @click="showPassword = !showPassword"
                    >
                      <EyeOff v-if="showPassword" :size="16" />
                      <Eye v-else :size="16" />
                    </button>
                  </div>
                  <p v-if="account.confirm && !passwordsMatch" class="mt-1 text-xs text-red-500">Passwords do not match</p>
                </div>
              </div>
              <div class="mt-6">
                <button type="submit" :disabled="savingAccount || !configured" class="btn bg-primary hover:bg-primary-dark text-white rounded-md disabled:opacity-60 disabled:cursor-not-allowed">
                  {{ savingAccount ? 'Updating…' : 'Update account' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { Eye, EyeOff, Check, X, Info } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import { site, loadSiteSettings, applySettings } from '@/composables/useSiteSettings'
import { saveSiteSettings, uploadLogo, uploadAdminAvatar } from '@/services/siteSettings'
import { useAuth } from '@/composables/useAuth'
import { useToast } from '@/composables/useToast'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const configured = isSupabaseConfigured()
const { user } = useAuth()
const toast = useToast()

const SITE_FIELDS = [
  'logo', 'companyName', 'tagline', 'email', 'phone',
  'address', 'addressShort', 'reraLicense', 'whatsappPhone', 'socials',
]

const SOCIAL_PLATFORM_OPTIONS = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'x', label: 'X (Twitter)' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'website', label: 'Website' },
]

const cloneSocials = (arr) => (arr || []).map((s) => ({ platform: s.platform || 'website', url: s.url || '' }))

const form = reactive(Object.fromEntries(SITE_FIELDS.map((k) => [k, site[k]])))
form.socials = cloneSocials(site.socials)
const account = reactive({ displayName: '', email: '', password: '', confirm: '', avatarUrl: '' })

const showPassword = ref(false)
const focusReqs = ref(false)
const hoverReqs = ref(false)
const reqsOpen = computed(() => focusReqs.value || hoverReqs.value)

const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, text: 'At least 8 characters' },
  { regex: /[0-9]/, text: 'At least 1 number' },
  { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
  { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
  { regex: /[!-/:-@[-`{-~]/, text: 'At least 1 special character' },
]

const passwordRequirements = computed(() =>
  PASSWORD_REQUIREMENTS.map((r) => ({ text: r.text, met: r.regex.test(account.password) }))
)
const strengthScore = computed(() => passwordRequirements.value.filter((r) => r.met).length)

const strengthBorder = computed(
  () =>
    ['border-gray-200!', 'border-red-500!', 'border-orange-500!', 'border-amber-500!', 'border-green-400!', 'border-emerald-500!'][
      strengthScore.value
    ]
)
const strengthBarColor = computed(
  () => ['bg-gray-200', 'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-green-400', 'bg-emerald-500'][strengthScore.value]
)
const strengthTextColor = computed(
  () => ['text-slate-400', 'text-red-500', 'text-orange-500', 'text-amber-500', 'text-green-500', 'text-emerald-500'][strengthScore.value]
)
const strengthText = computed(
  () =>
    ['Enter a password', 'Weak password', 'Medium password', 'Strong password', 'Very strong password', 'Very strong password'][
      strengthScore.value
    ]
)

const passwordsMatch = computed(() => account.password !== '' && account.confirm === account.password)

const profileInitials = computed(() => {
  const name = account.displayName || account.email || 'A'
  return String(name).trim().charAt(0).toUpperCase() || 'A'
})

function addSocial() {
  form.socials.push({ platform: 'website', url: '' })
}

function removeSocial(i) {
  form.socials.splice(i, 1)
}

const logoInput = ref(null)
const avatarInput = ref(null)
const uploadingLogo = ref(false)
const uploadingAvatar = ref(false)
const savingSite = ref(false)
const savingAccount = ref(false)

function syncForm() {
  SITE_FIELDS.forEach((k) => {
    form[k] = k === 'socials' ? cloneSocials(site.socials) : site[k]
  })
}

onMounted(async () => {
  await loadSiteSettings()
  syncForm()
  account.email = user.value?.email || ''
  account.displayName = user.value?.user_metadata?.display_name || ''
  account.avatarUrl = user.value?.user_metadata?.avatar_url || ''
})

async function onAvatarChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  uploadingAvatar.value = true
  try {
    const url = await uploadAdminAvatar(file)
    account.avatarUrl = url
    const { data, error } = await supabase.auth.updateUser({
      data: {
        display_name: account.displayName || user.value?.user_metadata?.display_name || '',
        avatar_url: url,
      },
    })
    if (error) throw error
    if (data?.user) user.value = data.user
    toast.success('Profile photo updated.')
  } catch (err) {
    toast.error(`Photo upload failed: ${err.message || err}`)
  } finally {
    uploadingAvatar.value = false
    if (avatarInput.value) avatarInput.value.value = ''
  }
}

async function onLogoChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  uploadingLogo.value = true
  try {
    form.logo = await uploadLogo(file)
    toast.success('Logo uploaded. Save to apply it.')
  } catch (err) {
    toast.error(`Logo upload failed: ${err.message || err}`)
  } finally {
    uploadingLogo.value = false
    if (logoInput.value) logoInput.value.value = ''
  }
}

async function onSaveSite() {
  savingSite.value = true
  try {
    const patch = Object.fromEntries(SITE_FIELDS.map((k) => [k, form[k]]))
    await saveSiteSettings(patch)
    applySettings(patch)
    toast.success('Website settings saved. The public site updates on next load.')
  } catch (err) {
    toast.error(`Could not save: ${err.message || err}`)
  } finally {
    savingSite.value = false
  }
}

async function onSaveAccount() {
  if (account.password && account.password !== account.confirm) {
    toast.warning('Passwords do not match.')
    return
  }
  if (account.password && account.password.length < 8) {
    toast.warning('Password must be at least 8 characters.')
    return
  }

  savingAccount.value = true
  try {
    const payload = {
      data: {
        display_name: account.displayName,
        avatar_url: account.avatarUrl || user.value?.user_metadata?.avatar_url || '',
      },
    }
    if (account.email && account.email !== user.value?.email) payload.email = account.email
    if (account.password) payload.password = account.password

    const { data, error } = await supabase.auth.updateUser(payload)
    if (error) throw error
    if (data?.user) user.value = data.user

    account.password = ''
    account.confirm = ''
    toast.success(
      payload.email
        ? 'Account updated. Check your new email to confirm the change.'
        : 'Account updated.'
    )
  } catch (err) {
    toast.error(`Could not update account: ${err.message || err}`)
  } finally {
    savingAccount.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
