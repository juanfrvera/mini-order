<script setup lang="ts">
import type { Item } from '@/typings/item';
import { ref, type Ref } from 'vue'

defineExpose({ getItems })

const items: Ref<Array<Item>> = ref([])

function getItems() {
  return items.value
}

function createNewItemRow() {
  items.value.unshift({ id: crypto.randomUUID(), name: '', price: 0, description: '' })
}
</script>

<template>
  Hi, please add your catalog
  <button @click="createNewItemRow()">Add Item</button>
  <ol>
    <li v-for="item in items" :key="item.id">
      <label>Name</label>
      <input v-model="item.name" />

      <label>Price</label>
      <input v-model="item.price" />

      <label>Description</label>
      <input v-model="item.description" />
    </li>
  </ol>
</template>

<style scoped></style>
