<script setup lang="ts">
import { adminStore } from '@/lib/store'

// Store the current base URL of the application
const baseUrl = window.location.origin
const shopPublicUrl = `${baseUrl}/shop/${adminStore.shopUrl}`

function copyPublicUrl() {
    navigator.clipboard.writeText(shopPublicUrl).then(() => {
        alert('Shop public URL copied to clipboard!')
    }).catch(err => {
        console.error('Failed to copy: ', err)
        alert('Failed to copy the URL. Please try again.')
    })
}

</script>

<template>

    Welcome shop owner!
    <div>You can share the following link with your clients so they can see your catalog and order:</div>
    <div class="public-url">
        <span class="public-url__text">{{ shopPublicUrl }}</span>
        <button @click="copyPublicUrl()" class="button-important public-url__copy">Copy link</button>
        <a :href="shopPublicUrl" target="_blank"><button class="button-important public-url__view-as-client">View as
                client</button></a>
    </div>

    <div>
        This is your current catalog:
        <div class="items">
            <div v-for="item in adminStore.items" :key="item.id" class="item">
                <div class="item-info">
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.description }}</p>
                    <p>Price: {{ item.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.public-url {
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>