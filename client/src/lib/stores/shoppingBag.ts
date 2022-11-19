import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';
import { writable } from 'svelte/store';

const bag: ShoppingBagEntry[] = [];
export const shoppingBag = writable(bag);

export const clearedShoppingBag = writable(bag);
