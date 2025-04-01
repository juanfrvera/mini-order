import type { Item } from "@/typings/item";
import { API_URL } from "./environment";

export class RequestService {
    public static publishCatalog(shopUrl: string, items: Item[], phone: string) {
        return fetch(`${API_URL}/publishCatalog`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json' // Indicate JSON payload
            },
            body: JSON.stringify({ shopUrl, items, phone })
        });
    }

    public static getCatalog(shopUrl: string) {
        return fetch(`${API_URL}/catalog/${shopUrl}`, { method: 'GET' });;
    }
}