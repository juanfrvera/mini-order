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
    const response = await RequestService.publishCatalog(shopUrl.value, items, phoneNumber.value)
    console.log(response)
    const message = items
      .map((item) => `${item.name} - ${item.price} - ${item.description}`)
      .join('\n')
    alert(`Catalog published with success! Message:\n${message}`)
  } else {
    alert('Please add items, shop URL and phone number')
  }
}
</script>

<template>
  Welcome to mini-orders, here you can create your catalog and publish it to your clients.
  <p>To publish your catalog, please add the items, your shop URL and your WhatsApp number.</p>
  <p>After publishing, you will be able to send the catalog to your clients.</p>

  <h2>Items</h2>
  <CatalogCreator ref="catalogCreator"></CatalogCreator>

  <h2>Shop URL</h2>
  <div>
    <label>Shop URL</label>
    <input v-model="shopUrl" />
  </div>

  <h2>WhatsApp phone number</h2>
  <div>
    <p>Please add your WhatsApp number, where you want your clients to send the orders</p>
    <label>WhatsApp number</label>
    <input v-model="phoneNumber" />
  </div>

  <h2>Publish</h2>
  <button @click="publishCatalog()">Publish catalog</button>
</template>

<style scoped></style>
