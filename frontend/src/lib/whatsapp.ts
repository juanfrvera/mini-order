import type { OrderedItem } from "@/typings/item";

export function sendOrder(items: OrderedItem[], phone: string) {
    // Adds the message to the body
    let body = `*Order detail*\n`;
    let total = 0;

    // Adds items, their quantities and subtotal to body
    for (const e of items) {
        const pluralPrice = (Number(e.price) ?? 0) * Number(e.amount);
        body += `_${e.amount} X ${e.name} : $${pluralPrice}_\n`;
        total += pluralPrice;
    }
    // Adds total to body
    body += `\n*TOTAL*\n$${total}`;

    // Generates whatsapp message link
    const url = `https://wa.me/${phone}/?text=` + encodeURI(body);
    // Opens the link
    window.open(url, '_blank');
}