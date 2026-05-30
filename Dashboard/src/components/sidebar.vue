<template>
  <nav id="sidebar" class="sidebar-wrapper sidebar-dark">
    <div class="sidebar-content kardosh-sidebar-layout">
      <div class="sidebar-brand kardosh-sidebar-brand text-center">
        <RouterLink to="/" class="inline-block">
          <BrandLogo variant="full" size="sidebar" img-class="kardosh-sidebar-brand__img mx-auto" />
        </RouterLink>
      </div>

      <div class="kardosh-sidebar-scroll-host">
        <SimpleBar class="kardosh-sidebar-scroll h-full">
        <ul class="sidebar-menu border-t border-white/10">
          <template v-for="item in DASHBOARD_NAV" :key="item.path || item.id">
            <li
              v-if="!item.children"
              :class="[manu === item.path ? 'active' : '', 'ms-0']"
            >
              <RouterLink :to="item.path">
                <i :class="`${item.icon} me-2`" />
                {{ item.label }}
              </RouterLink>
            </li>

            <li
              v-else
              :class="[
                'sidebar-dropdown ms-0',
                isGroupActive(item) ? 'active' : '',
              ]"
            >
              <a href="javascript:void(0)" @click="toggleSubMenu(item.id)">
                <i :class="`${item.icon} me-2`" />
                {{ item.label }}
              </a>
              <div
                :class="[
                  'sidebar-submenu',
                  openGroups[item.id] || isGroupActive(item) ? 'block' : '',
                ]"
              >
                <ul>
                  <li
                    v-for="child in item.children"
                    :key="child.path"
                    :class="[manu === child.path ? 'active' : '', 'ms-0']"
                  >
                    <RouterLink :to="child.path">
                      <i v-if="child.icon" :class="`${child.icon} me-2`" />
                      {{ child.label }}
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </li>
          </template>
        </ul>
        </SimpleBar>
      </div>

      <div class="kardosh-sidebar-footer">
        <p class="mb-0 text-xs text-slate-400 text-center leading-relaxed">
          © {{ year }} {{ BRAND.name }}. Developed by Logix Contact.
        </p>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'
import { BRAND } from '@/config/brand'
import { DASHBOARD_NAV } from '@/config/navigation'
import SimpleBar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

const year = new Date().getFullYear()

const route = useRoute()
const manu = ref('')
const openGroups = reactive({})

watch(
  () => route.path,
  (current) => {
    manu.value = current
    for (const item of DASHBOARD_NAV) {
      if (item.children?.some((c) => c.path === current)) {
        openGroups[item.id] = true
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  { immediate: true }
)

function isGroupActive(item) {
  return item.children?.some((c) => c.path === manu.value)
}

function toggleSubMenu(id) {
  openGroups[id] = !openGroups[id]
}
</script>
