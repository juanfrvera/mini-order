<script setup lang="ts">
import type { Item } from '@/typings/item'
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
  <button @click="createNewItemRow()">Add Item</button>
  <ol v-if="items.length">
    <li v-for="item in items" :key="item.id">
      <label>Name</label>
      <input v-model="item.name" />

      <label>Price</label>
      <input v-model="item.price" />

      <label>Description</label>
      <input v-model="item.description" />
    </li>
  </ol>
  <div v-else>
    <p>No items added yet. Click the button above to add an item.</p>
  </div>
</template>

<style scoped></style>
