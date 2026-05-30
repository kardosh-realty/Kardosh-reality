<template>
    <div class="top-header">
        <div class="header-bar flex justify-between">
            <div class="flex items-center space-x-1">
                
                <RouterLink to="/" class="xl:hidden block me-2">
                    <BrandLogo variant="icon" size="nav" class="md:hidden block" />
                    <span class="md:block hidden">
                        <BrandLogo variant="full" size="nav" />
                    </span>
                </RouterLink>
                
                <RouterLink id="close-sidebar" @click="props.setToggle(!props.toggle)" class="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[20px] text-center bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-white rounded-md" to="#">
                    <Menu class="size-4"/>
                </RouterLink>
                
                <div ref="searchDropdownEl" class="relative sm:block hidden ps-1.5">
                    <div class="form-icon relative">
                        <i class="ri-search-line absolute top-1/2 -translate-y-1/2 mt-px inset-s-3 z-10 pointer-events-none"></i>
                        <input
                            v-model="searchQuery"
                            type="search"
                            autocomplete="off"
                            class="form-input w-56 py-2 px-3 ps-9! h-8! bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-200! dark:border-gray-800! focus:ring-0"
                            placeholder="Search inquiries, projects…"
                            @input="onSearchInput"
                            @focus="searchOpen = true"
                        />
                    </div>
                    <div
                        v-show="searchOpen && (searchQuery.trim() || searchLoading)"
                        class="absolute start-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-lg z-[1100] overflow-hidden"
                        @click.stop
                    >
                        <p v-if="searchLoading" class="px-4 py-3 text-sm text-slate-400">Searching…</p>
                        <p v-else-if="searchQuery.trim() && !searchResults.length" class="px-4 py-3 text-sm text-slate-400">
                            No results for “{{ searchQuery.trim() }}”
                        </p>
                        <ul v-else class="list-none m-0 p-1 max-h-72 overflow-y-auto">
                            <li v-for="(hit, i) in searchResults" :key="i">
                                <RouterLink
                                    :to="hit.to"
                                    class="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                    @click="onSearchPick"
                                >
                                    <span class="size-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <i :class="hit.icon"></i>
                                    </span>
                                    <span class="min-w-0">
                                        <span class="text-sm font-medium block truncate">{{ hit.label }}</span>
                                        <span class="text-xs text-slate-400 block truncate">{{ hit.sub }}</span>
                                    </span>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>

            <ul class="list-none mb-0 space-x-1">
                
                <li ref="langDropdownEl" class="dropdown inline-block relative">
                    <button 
                        class="dropdown-toggle h-8 inline-flex items-center justify-center gap-1.5 px-2.5 tracking-wide align-middle duration-500 text-center bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-white rounded-md"
                        type="button"
                        @click="onToggleLang"
                    >
                        <Languages class="size-4" />
                        <span class="text-[13px] font-medium">{{ currentLocale.short }}</span>
                        <ChevronDown class="size-3.5" />
                    </button>
                    
                    <div 
                        v-show="showLang"
                        class="dropdown-menu absolute end-0 m-0 mt-2 z-[1100] w-40 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow-md shadow-gray-200 dark:shadow-gray-700 border border-gray-100 dark:border-gray-800"
                        @click.stop
                    >
                        <ul class="list-none py-2 text-start">
                            <li v-for="loc in locales" :key="loc.id" class="my-1 ms-0">
                                <button
                                    type="button"
                                    @click="onLocale(loc.id)"
                                    class="w-full flex items-center justify-between text-[15px] font-medium py-1.5 px-4 dark:text-white/70 hover:text-primary dark:hover:text-white"
                                    :class="loc.id === locale ? 'text-primary' : ''"
                                >
                                    <span>{{ loc.label }}</span>
                                    <i v-if="loc.id === locale" class="ri-check-line"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </li>
                
                <li ref="notifDropdownEl" class="dropdown inline-block relative">
                    <button 
                        class="dropdown-toggle relative size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[20px] text-center bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-white rounded-md" 
                        type="button"
                        aria-label="Notifications"
                        @click="onToggleNotifications"
                    >
                        <Bell class="size-4"></Bell>
                        <span
                            v-if="unreadCount"
                            class="absolute -top-0.5 -inset-e-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-[10px] font-bold rounded-full"
                        >
                            {{ unreadCount > 9 ? '9+' : unreadCount }}
                        </span>
                    </button>
                    
                    <div 
                        v-show="notificationsOpen"
                        class="dropdown-menu absolute end-0 m-0 mt-2 z-[1100] w-72 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow-md shadow-gray-200 dark:shadow-gray-700 border border-gray-100 dark:border-gray-800"
                        @click.stop
                    >
                        <div class="px-4 py-3 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
                            <span class="font-semibold">Notifications</span>
                            <span
                                v-if="unreadCount"
                                class="flex items-center justify-center bg-red-600/20 text-red-600 text-[10px] font-bold rounded-md min-w-5 h-5 px-1.5"
                            >
                                {{ unreadCount }}
                            </span>
                        </div>
                        <SimpleBar class="h-64">
                            <div v-if="notifLoading" class="py-8 text-center text-sm text-slate-400">
                                <i class="ri-loader-4-line animate-spin"></i>
                            </div>
                            <p v-else-if="!previewItems.length" class="py-8 px-4 text-center text-sm text-slate-400">
                                No notifications yet.
                            </p>
                            <ul v-else class="py-2 text-start border-t border-gray-100 dark:border-gray-800 list-none m-0 p-0">
                                <li v-for="item in previewItems" :key="item.id" class="ms-0">
                                    <div
                                        class="py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        :class="!item.read ? 'bg-primary/5' : ''"
                                    >
                                        <button
                                            type="button"
                                            class="w-full text-start"
                                            @click="onNotificationClick(item)"
                                        >
                                            <div class="flex items-start gap-3">
                                                <div class="size-9 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                    <i :class="`${item.icon} text-base`"></i>
                                                </div>
                                                <div class="min-w-0 flex-1">
                                                    <span class="text-sm font-medium block leading-snug">{{ item.title }}</span>
                                                    <span class="text-xs text-slate-400 block mt-0.5 line-clamp-2">{{ item.detail }}</span>
                                                    <small class="text-slate-400 block mt-1">{{ formatTime(item.createdAt) }}</small>
                                                </div>
                                            </div>
                                        </button>
                                        <button
                                            v-if="item.type === 'lead' && item.entityId"
                                            type="button"
                                            class="mt-2 text-xs font-medium text-primary hover:underline"
                                            @click.stop="onMarkLeadContacted(item)"
                                        >
                                            Mark contacted
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </SimpleBar>
                        <div class="border-t border-gray-100 dark:border-gray-800 p-2">
                            <RouterLink
                                to="/notifications"
                                class="block text-center text-sm font-medium py-2 text-primary hover:bg-primary/5 rounded-md"
                                @click="notificationsOpen = false"
                            >
                                View all notifications
                            </RouterLink>
                        </div>
                    </div>
                </li>

                <li ref="userDropdownEl" class="dropdown inline-block relative">
                    <button class="dropdown-toggle items-center" type="button" @click="onToggleUserMenu">
                        <span class="size-8 inline-flex items-center justify-center overflow-hidden tracking-wide align-middle duration-500 text-center bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-white rounded-md">
                            <img
                                v-if="adminAvatar"
                                :src="adminAvatar"
                                alt=""
                                class="size-full object-cover rounded-md"
                            />
                            <span
                                v-else
                                class="size-full flex items-center justify-center bg-primary/10 text-primary text-sm font-semibold rounded-md"
                            >
                                {{ adminInitials }}
                            </span>
                        </span>
                    </button>
                    <div 
                        v-show="userMenu"
                        class="dropdown-menu absolute end-0 m-0 mt-2 z-[1100] w-44 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow-md shadow-gray-200 dark:shadow-gray-700 border border-gray-100 dark:border-gray-800"
                        @click.stop
                    >
                        <ul class="py-2 text-start">
                            <li class="px-4 py-1">
                                <span class="block font-semibold">{{ adminDisplayName }}</span>
                                <span class="block text-slate-400 text-sm truncate">{{ authUser?.email || BRAND.name }}</span>
                            </li>
                            <li class="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                            <li class="ms-0">
                                <RouterLink to="/inquiries" @click="userMenu = false" class="block py-1 px-4 dark:text-white/70 hover:text-primary dark:hover:text-white"><i class="ri-mail-line me-2"></i>Inquiries</RouterLink>
                            </li>
                            <li class="ms-0">
                                <RouterLink to="/settings" @click="userMenu = false" class="block py-1 px-4 dark:text-white/70 hover:text-primary dark:hover:text-white"><i class="ri-settings-line me-2"></i>Settings</RouterLink>
                            </li>
                            <li class="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                            <li class="ms-0">
                                <button type="button" @click="onLogout" class="w-full text-start block py-1 px-4 dark:text-white/70 hover:text-primary dark:hover:text-white"><i class="ri-logout-circle-r-line me-2"></i>Logout</button>
                            </li>
                        </ul>
                    </div>
                </li>
                
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import BrandLogo from '@/components/BrandLogo.vue'
import { BRAND } from '@/config/brand'
import { useLanguage } from '@/composables/useLanguage'
import { useAuth } from '@/composables/useAuth'
import { useNotifications } from '@/composables/useNotifications'
import { useHeaderSearch } from '@/composables/useHeaderSearch'
import { formatRelativeTime } from '@/services/notifications'
import { markLeadContacted } from '@/services/leads'
import { useToast } from '@/composables/useToast'

import SimpleBar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

import {
    Bell,
    ChevronDown,
    Languages,
    Menu,
} from 'lucide-vue-next'

const props = defineProps({
    toggle: Boolean,
    setToggle: Function
})

const { locale, locales, setLocale } = useLanguage()
const currentLocale = computed(
    () => locales.find((l) => l.id === locale.value) ?? locales[0]
)

function onLocale(id) {
    setLocale(id)
    showLang.value = false
}

const showLang = ref(false)
const notificationsOpen = ref(false)
const userMenu = ref(false)

const langDropdownEl = ref(null)
const notifDropdownEl = ref(null)
const userDropdownEl = ref(null)
const searchDropdownEl = ref(null)
const searchOpen = ref(false)

const router = useRouter()
const toast = useToast()
const {
    query: searchQuery,
    results: searchResults,
    loading: searchLoading,
    runSearch,
    clearSearch,
} = useHeaderSearch()
const { user: authUser, signOut, isAdmin, ready } = useAuth()
const {
    items: notificationItems,
    loading: notifLoading,
    unreadCount,
    refresh: refreshNotifications,
    markRead,
    ensureLoaded: ensureNotifications,
    unsubscribeRealtime: unsubscribeNotifications,
} = useNotifications()

const previewItems = computed(() => {
    const unread = notificationItems.value.filter((n) => !n.read)
    const read = notificationItems.value.filter((n) => n.read)
    return [...unread, ...read].slice(0, 8)
})

const formatTime = formatRelativeTime

const adminAvatar = computed(() => authUser.value?.user_metadata?.avatar_url || '')
const adminDisplayName = computed(
    () => authUser.value?.user_metadata?.display_name || 'Admin'
)
const adminInitials = computed(() => {
    const name = adminDisplayName.value !== 'Admin'
        ? adminDisplayName.value
        : authUser.value?.email || 'A'
    return String(name).trim().charAt(0).toUpperCase() || 'A'
})

watch(
    () => [ready.value, isAdmin.value],
    ([isReady, admin]) => {
        if (isReady && admin) {
            refreshNotifications()
            ensureNotifications()
        } else {
            unsubscribeNotifications()
        }
    },
    { immediate: true }
)

function closeAllDropdowns() {
    showLang.value = false
    notificationsOpen.value = false
    userMenu.value = false
    searchOpen.value = false
}

function isInsideDropdown(target) {
    if (!(target instanceof Node)) return false
    return (
        langDropdownEl.value?.contains(target) ||
        notifDropdownEl.value?.contains(target) ||
        userDropdownEl.value?.contains(target) ||
        searchDropdownEl.value?.contains(target)
    )
}

function onToggleLang() {
    const next = !showLang.value
    closeAllDropdowns()
    showLang.value = next
}

function onToggleNotifications() {
    const next = !notificationsOpen.value
    closeAllDropdowns()
    notificationsOpen.value = next
    if (next) refreshNotifications()
}

function onToggleUserMenu() {
    const next = !userMenu.value
    closeAllDropdowns()
    userMenu.value = next
}

function onSearchInput() {
    runSearch(searchQuery.value)
    searchOpen.value = true
}

function onSearchPick() {
    clearSearch()
    searchOpen.value = false
    closeAllDropdowns()
}

async function onNotificationClick(item) {
    await markRead(item.id)
    notificationsOpen.value = false
    if (item.type === 'lead' && item.entityId) {
        router.push({ path: '/inquiries', query: { lead: item.entityId } })
    } else {
        router.push(item.href || '/notifications')
    }
}

async function onMarkLeadContacted(item) {
    if (!item.entityId) return
    try {
        await markLeadContacted(item.entityId)
        await markRead(item.id)
        await refreshNotifications()
        toast.success('Marked as contacted.')
    } catch (e) {
        toast.error(e.message || 'Could not update lead')
    }
}

async function onLogout() {
    userMenu.value = false
    await signOut()
    router.replace('/login')
}

function handleDocumentClick(event) {
    if (isInsideDropdown(event.target)) return
    closeAllDropdowns()
}

onMounted(() => {
    document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleDocumentClick)
    unsubscribeNotifications()
})
</script>