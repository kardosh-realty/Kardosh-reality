<template>
  <div class="property-buildings">
    <p v-if="buildings.length" class="property-buildings__lead">
      {{ buildings.length }} building{{ buildings.length === 1 ? '' : 's' }} in this master development — layouts, timelines, and escrow details from the developer catalogue.
    </p>

    <div class="property-buildings__grid">
      <article
        v-for="building in buildings"
        :key="building.id"
        class="property-buildings__card"
      >
        <div v-if="building.imageUrl" class="property-buildings__media">
          <ProtectedPropertyImage
            fill
            :src="building.imageUrl"
            :alt="building.name"
            watermark-size="md"
            wrapper-class="absolute inset-0"
          />
        </div>

        <div class="property-buildings__body">
          <div class="property-buildings__title-row">
            <h5 class="property-buildings__title">
              {{ building.name }}
            </h5>
            <span v-if="building.buildingType" class="property-buildings__type">
              {{ building.buildingType }}
            </span>
          </div>

          <p v-if="building.description" class="property-buildings__description">
            {{ building.description }}
          </p>

          <dl v-if="building.hasDetails" class="property-buildings__details">
            <div
              v-for="row in building.details"
              :key="row.label"
              class="property-buildings__detail"
              :class="{
                'property-buildings__detail--wide': row.label === 'Escrow account',
                'property-buildings__detail--mono': row.label === 'Escrow account',
              }"
            >
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>

          <p
            v-else-if="!building.description"
            class="property-buildings__empty"
          >
            Additional building specifications will be published by the developer.
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import ProtectedPropertyImage from '@/component/kardosh/ProtectedPropertyImage.vue'

defineProps({
  buildings: { type: Array, default: () => [] },
})
</script>
