<script setup lang="ts">
import type { Item } from '@/typings/item'
import { ref, type Ref } from 'vue'

defineExpose({ getItems })

const items: Ref<Array<Item>> = ref([])

function getItems() {
  return items.value
}

function createNewItemRow() {
  items.value.push({ id: crypto.randomUUID(), name: '', price: 0, description: '' });
  const lastIndex = items.value.length - 1

  // Call in next tick after item is rendered
  setTimeout(() => {
    focusItemFirstInput(lastIndex);
  });
}

function removeItem(index: number) {
  items.value.splice(index, 1)
}

function descriptionKeyDown(event: KeyboardEvent, index: number) {
  if (event.key === 'Enter' || event.key === 'Tab') {
    // Prevent default behavior to avoid form submission
    // and to allow custom navigation
    event.stopPropagation()
    event.preventDefault()
    const nextIndex = index + 1
    if (nextIndex < items.value.length) {
      focusItemFirstInput(nextIndex);
    } else {
      // If it's the last item, create a new one
      createNewItemRow()
    }
  }
}

function focusItemFirstInput(index: number) {
  // nth-child starts from 1, so we need to add 1
  const nthChild = index + 1
  const firstInput = document.querySelector(`.item-row:nth-child(${nthChild}) .item-input`)
  if (firstInput) {
    (firstInput as HTMLInputElement).focus()
  }
}
</script>

<template>
  <ul v-if="items.length" class="item-list">
    <li v-for="(item, index) in items" :key="item.id" class="item-row box">
      <!-- <span class="item-index">{{ index + 1 }}.</span> -->

      <div class="label-and-input_vertical full-width">
        <label>Name</label>
        <input v-model="item.name" class="item-input" />
      </div>

      <div class="label-and-input_vertical full-width">
        <label>Price</label>
        <input v-model="item.price" class="item-input" />
      </div>

      <div class="label-and-input_vertical full-width">
        <label>Description</label>
        <textarea v-model="item.description" @keydown="descriptionKeyDown($event, index)" class="item-input" />
      </div>

      <button @click="removeItem(index)" class="remove-item">Remove</button>
    </li>
  </ul>
  <div v-else>
    <p>No items added yet. Let's create the first one.</p>
  </div>
  <button @click="createNewItemRow()" class="button-important">Add Item</button>
</template>

<style scoped>
.item-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-inline-start: 10px;
}

.item-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-index {
  display: flex;
  align-items: center;
}

.item-input {
  padding: 4px;
}

.remove-item {
  border: red 1px solid;
  background-color: white;
  padding: 6px;
  border-radius: 2px;
  cursor: pointer;
}

.remove-item:hover {
  background-color: red;
  color: white;
}
</style>
