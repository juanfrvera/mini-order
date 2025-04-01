export interface Item { id: string; name: string; price: number; description: string }

export interface OrderedItem extends Item { amount: number }