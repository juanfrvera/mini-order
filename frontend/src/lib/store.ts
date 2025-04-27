import type { Item } from '@/typings/item'
import { reactive } from 'vue'

export const adminStore = reactive({
    editToken: undefined as string | undefined,
    shopUrl: undefined as string | undefined,
    items: [] as Array<Item>,
    phoneNumber: undefined as string | undefined,
    shopName: undefined as string | undefined,
    startShop(url: string, token: string, items: Array<Item>, phoneNumber: string, shopName: string) {
        this.items = items
        this.phoneNumber = phoneNumber
        this.shopName = shopName
        this.shopUrl = url
        this.editToken = token
    }
})