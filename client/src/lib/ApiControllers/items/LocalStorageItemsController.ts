import type { Item } from '$lib/types/Item';
import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';
import { persisted } from 'svelte-local-storage-store';
import type { Writable } from 'svelte/store';

export class ItemsController {
	database!: Item[];
	store: Writable<Item[]>;

	constructor(data: Item[]) {
		this.store = persisted('items', data);
		this.store.subscribe((data) => (this.database = data));
	}

	private setStore() {
		this.store.set(this.database);
	}

	async getItems() {
		return this.database;
	}

	async getItem(id: Item['id']) {
		return this.database.find((element) => element.id == id);
	}

	async getCategories() {
		return Array.from(new Set(this.database.map((item) => item.category)));
	}

	async setItem(item: Item) {
		const index = this.database.findIndex((dbItem) => dbItem.id == item.id);
		this.database[index] = item;
		this.setStore();
	}

	async addItem(item: Item) {
		const id = crypto.randomUUID();
		this.database = [...this.database, { ...item, id }];
		this.setStore();
	}

	async deleteItem(id: Item['id']) {
		const index = this.database.findIndex((dbItem) => dbItem.id == id);
		this.database.splice(index, 1);
		this.setStore();
	}

	private sellItem(shoppingBagEntry: ShoppingBagEntry) {
		const index = this.database.findIndex(
			(dbItem) => dbItem.id == shoppingBagEntry.id
		);
		if (this.database[index].amount >= shoppingBagEntry.amount) {
			this.database[index].amount -= shoppingBagEntry.amount;
		}
	}

	async sellItems(shoppingBag: ShoppingBagEntry[]) {
		shoppingBag.forEach((shoppingBagEntry) => {
			this.sellItem(shoppingBagEntry);
		});
		this.setStore();
	}
}
