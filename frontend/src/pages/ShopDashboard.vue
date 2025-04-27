<script setup lang="ts">
import { adminStore } from '@/lib/store'
import { ref } from 'vue'

// Store the current base URL of the application
const baseUrl = window.location.origin
const shopPublicUrl = `${baseUrl}/shop/${adminStore.shopUrl}`
const ui = ref({
    editCatalog: false,
    pendingChanges: false
});

function copyPublicUrl() {
    navigator.clipboard.writeText(shopPublicUrl).then(() => {
        alert('Shop public URL copied to clipboard!')
    }).catch(err => {
        console.error('Failed to copy: ', err)
        alert('Failed to copy the URL. Please try again.')
    })
}

function editCatalog() {
    ui.value.editCatalog = true;
}

function publishCatalog() {
    ui.value.editCatalog = false;
}

</script>

<template>
    Welcome shop owner!
    <div>You can share the following link with your clients so they can see your catalog and order:</div>
    <div class="public-url box">
        <span class="public-url__text">{{ shopPublicUrl }}</span>
        <button @click="copyPublicUrl()" class="button-important public-url__copy">Copy link</button>
        <a :href="shopPublicUrl" target="_blank"><button class="button-important public-url__view-as-client">View as
                client</button></a>
    </div>

    <div class="catalog box" :class="{ box_highlight: ui.editCatalog }">
        <div class="catalog__header">
            <span class="catalog__title">Current Catalog</span>
            <button v-if="!ui.editCatalog" @click="editCatalog()" class="button-important">Edit</button>
            <button v-if="ui.editCatalog" @click="publishCatalog()" class="button-important">Publish</button>
        </div>
        <div class="items">
            <div v-for="item in adminStore.items" :key="item.id" class="item">
                <div v-if="!ui.editCatalog" class="item-info">
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.description }}</p>
                    <p>Price: {{ item.price }}</p>
                </div>
                <div v-else class="item-edit">
                    <div class="label-and-input label-and-input_vertical">
                        <label class="full-width">Name</label>
                        <input v-model="item.name" placeholder="Item name" class="full-width edit-input" />
                    </div>
                    <div class="label-and-input label-and-input_vertical">
                        <label class="full-width">Description</label>
                        <input v-model="item.description" placeholder="Item description"
                            class="full-width edit-input" />
                    </div>
                    <div class="label-and-input label-and-input_vertical">
                        <label class="full-width">Price</label>
                        <input v-model="item.price" type="number" placeholder="Item price"
                            class="full-width edit-input" />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="ui.pendingChanges" class="catalog__pending-changes">
            You have unsaved changes, click "Publish" to apply them.
        </div>
    </div>
</template>

<style scoped>
.public-url {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.catalog__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.catalog__title {
    font-size: 24px;
    font-weight: bold;
}

.catalog__pending-changes {
    margin-top: 10px;
    color: red;
}

.item-edit {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 8px;
    padding-bottom: 8px;
    gap: 8px;
}

.full-width {
    width: 100%;
}

.edit-input {
    padding: 4px;
}
</style>