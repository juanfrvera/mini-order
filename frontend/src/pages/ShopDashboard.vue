<script setup lang="ts">
import { adminStore } from '@/lib/store'
</script>

<template>

    Welcome shop owner!
    <div>The url of the shop is <b>{{ adminStore.shopUrl }}</b> and will be used to load the catalog</div>

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