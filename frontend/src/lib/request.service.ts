import type { Item } from "@/typings/item";
import { API_URL } from "./environment";

export class RequestService {
    /** Token used to edit a created catalog */
    private static catalogEditToken?: string;

    public static async publishCatalog(shopUrl: string, items: Item[], phone: string) {
        const response = await fetch(`${API_URL}/publishCatalog`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json' // Indicate JSON payload
            },
            body: JSON.stringify({ shopUrl, items, phone })
        });

        const typed = await response.json() as { catalogEditToken: string, message: string };

        this.catalogEditToken = typed.catalogEditToken;

        return typed;
    }

    public static getCatalog(shopUrl: string) {
        return fetch(`${API_URL}/catalog/${shopUrl}`, { method: 'GET' });;
    }
}