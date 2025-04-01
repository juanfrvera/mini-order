<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { RequestService } from '../lib/request.service'
import type { Item, OrderedItem } from '@/typings/item'
import { sendOrder } from '@/lib/whatsapp'
const route = useRoute()

const catalog: Ref<{items: OrderedItem[], phone: string} | null> = ref(null)

// Lifecycle hook called when the page loads
onMounted(() => {
  console.log('Page loaded with shopUrl:', route.params.shopUrl);
  loadCatalog(route.params.shopUrl as string)
})


async function loadCatalog(shopUrl: string){
    RequestService.getCatalog(shopUrl)
        .then(async (response) => {
            console.log('Catalog loaded:', response);
            catalog.value = await response.json();
        })
        .catch((error) => {
            console.error('Error loading catalog:', error);
        });
}

async function orderClicked(){
  if(catalog.value && catalog.value.items){
    const orderedItems = catalog.value.items.filter((item) => item.amount > 0);
    sendOrder(orderedItems, catalog.value?.phone);
  }
}

</script>

<template>
    Welcome Final User!
    <div>The url of the shop is <b>{{ $route.params.shopUrl }}</b> and will be used to load the catalog</div>
    <div v-if="catalog">
      <div v-for="item in catalog.items" :key="item.id">
        <input v-model="item.amount" />
        <span>{{ item.price }}</span>
        <span>{{ item.name }}</span>
        <span>{{ item.description }}</span>
      </div>
      <button @click="orderClicked()">Order</button>
    </div>
    <div v-if="!catalog">
      Loading the catalog...
    </div>
</template>

<style scoped></style>
