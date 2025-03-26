<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import CatalogCreator from './components/CatalogCreator.vue'

const catalogCreator = useTemplateRef('catalogCreator')
const phoneNumber = ref('')

function publishCatalog() {
  const items = catalogCreator.value?.getItems()
  if (items && items.length) {
    if (phoneNumber.value) {
      const message = items
        .map((item) => `${item.name} - ${item.price} - ${item.description}`)
        .join('\n')
      alert(`Catalog published with success! Message:\n${message}`)
    } else {
      alert('Please add a WhatsApp number')
    }
  } else {
    alert('Please add at least one item to the catalog')
  }
}
</script>

<template>
  <header>Mini Orders</header>

  <main>
    <CatalogCreator ref="catalogCreator"></CatalogCreator>

    <label>WhatsApp number</label>
    <input v-model="phoneNumber" />
    <button @click="publishCatalog()">Publish catalog</button>
  </main>
</template>

<style scoped></style>
