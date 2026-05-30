<template>
  <nav
    v-if="visible && items.length"
    :class="['kardosh-breadcrumbs', `kardosh-breadcrumbs--${variant}`]"
    aria-label="Breadcrumb"
  >
    <div :class="containerClass">
      <ol class="kardosh-breadcrumbs__list">
        <li
          v-for="(crumb, index) in items"
          :key="`${crumb.label}-${index}`"
          class="kardosh-breadcrumbs__item"
        >
          <ChevronRight
            v-if="index > 0"
            class="kardosh-breadcrumbs__sep"
            aria-hidden="true"
          />
          <RouterLink
            v-if="crumb.to && !crumb.current"
            :to="crumb.to"
            class="kardosh-breadcrumbs__link"
          >
            {{ crumb.label }}
          </RouterLink>
          <span
            v-else
            class="kardosh-breadcrumbs__current"
            :aria-current="crumb.current ? 'page' : undefined"
          >
            {{ crumb.label }}
          </span>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup>
import { computed, inject, unref } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'
import { buildBreadcrumbItems, shouldShowBreadcrumbs } from '@/config/breadcrumbs'

const props = defineProps({
  /** hero = inside PageHero (white). light = compact pages (slate). bar = strip below nav */
  variant: { type: String, default: 'bar' },
})

const route = useRoute()
const injectedLabel = inject('breadcrumbLabel', null)

const visible = computed(() => shouldShowBreadcrumbs(route))

const containerClass = computed(() =>
  props.variant === 'hero' ? 'container' : 'container-fluid'
)

const items = computed(() => {
  const current =
    unref(injectedLabel) ||
    route.meta.breadcrumbLabel ||
    null
  return buildBreadcrumbItems(route, current)
})
</script>

<style scoped>
.kardosh-breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25rem 0;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.8125rem;
}

.kardosh-breadcrumbs__item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-width: 0;
}

.kardosh-breadcrumbs__sep {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

/* Below navbar (property detail, etc.) */
.kardosh-breadcrumbs--bar {
  margin-top: 5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background: #ffffff;
  border-bottom: 1px solid #eef2f6;
}

.dark .kardosh-breadcrumbs--bar {
  background: #0f172a;
  border-bottom-color: #1e293b;
}

.kardosh-breadcrumbs--bar .kardosh-breadcrumbs__list {
  justify-content: flex-start;
}

.kardosh-breadcrumbs--bar .kardosh-breadcrumbs__sep {
  color: #94a3b8;
}

.kardosh-breadcrumbs--bar .kardosh-breadcrumbs__link {
  color: #64748b;
}

.kardosh-breadcrumbs--bar .kardosh-breadcrumbs__link:hover {
  color: #0f172a;
}

.kardosh-breadcrumbs--bar .kardosh-breadcrumbs__current {
  color: #0f172a;
  font-weight: 600;
}

.dark .kardosh-breadcrumbs--bar .kardosh-breadcrumbs__link:hover {
  color: #f1f5f9;
}

.dark .kardosh-breadcrumbs--bar .kardosh-breadcrumbs__current {
  color: #f8fafc;
}

/* Inside PageHero — white on dark image */
.kardosh-breadcrumbs--hero {
  margin: 0 0 1rem;
  padding: 0;
  background: transparent;
  border: none;
}

.kardosh-breadcrumbs--hero .kardosh-breadcrumbs__sep {
  color: rgb(255 255 255 / 0.45);
}

.kardosh-breadcrumbs--hero .kardosh-breadcrumbs__link {
  color: rgb(255 255 255 / 0.75);
}

.kardosh-breadcrumbs--hero .kardosh-breadcrumbs__link:hover {
  color: #ffffff;
}

.kardosh-breadcrumbs--hero .kardosh-breadcrumbs__current {
  color: #ffffff;
  font-weight: 600;
}

/* Map / light toolbar */
.kardosh-breadcrumbs--light {
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
}

.kardosh-breadcrumbs--light .kardosh-breadcrumbs__list {
  justify-content: flex-start;
}

.kardosh-breadcrumbs--light .kardosh-breadcrumbs__sep {
  color: #94a3b8;
}

.kardosh-breadcrumbs--light .kardosh-breadcrumbs__link {
  color: #64748b;
}

.kardosh-breadcrumbs--light .kardosh-breadcrumbs__link:hover {
  color: #0f172a;
}

.kardosh-breadcrumbs--light .kardosh-breadcrumbs__current {
  color: #0f172a;
  font-weight: 600;
}

.kardosh-breadcrumbs__current {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: min(100%, 28rem);
}

@media (min-width: 992px) {
  .kardosh-breadcrumbs--bar {
    margin-top: 5.25rem;
  }
}
</style>
