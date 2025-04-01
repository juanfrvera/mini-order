<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import CatalogCreator from '../components/CatalogCreator.vue'
import { RequestService } from '../lib/request.service'

const catalogCreator = useTemplateRef('catalogCreator')
const shopUrl = ref('')
const phoneNumber = ref('')

async function publishCatalog() {
  const items = catalogCreator.value?.getItems()
  if (items && items.length && shopUrl.value && phoneNumber.value) {
      const response = await RequestService.publishCatalog(shopUrl.value, items, phoneNumber.value);
      console.log(response);
      const message = items
        .map((item) => `${item.name} - ${item.price} - ${item.description}`)
        .join('\n')
      alert(`Catalog published with success! Message:\n${message}`)
  } else {
    alert('Please add items, shop URL and phone number');
  }
}
</script>

<template>
    <CatalogCreator ref="catalogCreator"></CatalogCreator>

    <div>
      <label>Shop URL</label>
      <input v-model="shopUrl" />
    </div>
    <div>
      <label>Your WhatsApp number, where you want your clients to send the orders</label>
      <input v-model="phoneNumber" />
    </div>
    <button @click="publishCatalog()">Publish catalog</button>
</template>

<style scoped></style>
