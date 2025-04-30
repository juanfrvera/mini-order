<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import CatalogCreator from '../components/CatalogCreator.vue'
import { RequestService } from '../lib/request.service'
import { adminStore } from '@/lib/store'
import { router } from '@/router'

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

    adminStore.startShop(shopUrl.value, response.catalogEditToken, items, phoneNumber.value, 'Shop Name');

    // Go to shop's dashboard
    router.push({
      path: 'dashboard',
    })
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
  <div class="label-and-input_vertical">
    <label>Shop URL</label>
    <input v-model="shopUrl" class="input-important" />
  </div>

  <h2>WhatsApp phone number</h2>
  <div>
    <p>Please add your WhatsApp number, where you want your clients to send the orders</p>
    <div class="label-and-input_vertical">
      <label>WhatsApp number</label>
      <input v-model="phoneNumber" class="input-important" />
    </div>
  </div>

  <h2>Publish</h2>
  <button @click="publishCatalog()" class="button-important">Publish catalog</button>
</template>

<style scoped></style>
