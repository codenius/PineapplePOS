import type { Category } from '$lib/types/Category';
import type { Item } from '$lib/types/Item';
import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';
import { persisted } from 'svelte-local-storage-store';
import type { Writable } from 'svelte/store';

export class ItemsController {
	items!: Item[];
	itemsStore: Writable<Item[]>;
	categories!: Category[];
	categoriesStore: Writable<Category[]>;

	constructor(items: Item[], categories: Category[]) {
		this.itemsStore = persisted('items', items);
		this.itemsStore.subscribe((data) => (this.items = data));

		this.categoriesStore = persisted('categories', categories);
		this.categoriesStore.subscribe((data) => (this.categories = data));
	}

	private setStores() {
		this.itemsStore.set(this.items);
		this.categoriesStore.set(this.categories);
	}

	async getItems() {
		return this.items.map((item) => ({
			...item,
			category: this.getCategory(item.category)
		}));
	}

	async getItem(id: Item['id']) {
		const item = this.items.find((element) => element.id == id) as Item;
		return { ...item, category: this.getCategory(item.category) };
	}

	async getCategories() {
		return this.categories;
	}

	private getCategory(id: Category['id']) {
		return { ...this.categories.find((category) => category.id == id) };
	}

	async orderCategories(categories: Category[]) {
		this.categories = categories;
		this.setStores();
	}

	private addCategory(name: Category['name'], _isDefault: boolean = false) {
		const id = crypto.randomUUID();
		this.categories = [...this.categories, { name, id, _isDefault }];
		this.setStores();
		return id;
	}

	private garbageCollectCategories() {
		for (const category of this.categories) {
			const remainingItems = this.items.filter(
				(item) => item.category == category.id
			).length;
			if (remainingItems <= 0) {
				this.deleteCategory(category.id);
			}
		}
	}

	private getDefaultCategoryId() {
		const defaultCategory = this.categories.find(
			(category) => category._isDefault
		);
		if (defaultCategory) {
			return defaultCategory.id;
		} else {
			return this.addCategory('–', true);
		}
	}

	private deleteCategory(id: Category['id']) {
		this.categories = this.categories.filter((category) => category.id != id);
		this.setStores();
	}

	async setItem(item: Item) {
		const index = this.items.findIndex((dbItem) => dbItem.id == item.id);
		const prevItem = this.items[index];
		let newCategoryId: Category['id'] | undefined = undefined;
		if (item.category != prevItem.category) {
			if (!item.category) {
				newCategoryId = this.getDefaultCategoryId();
			} else if (
				// no category with this id exists
				!this.categories.find((category) => category.id == item.category)
			) {
				newCategoryId = this.addCategory(item.category as string);
			}
		}
		this.items[index] = { ...item, category: newCategoryId || item.category };
		this.setStores();
		this.garbageCollectCategories();
	}

	async addItem(item: Item) {
		const id = crypto.randomUUID();
		let newCategoryId: Category['id'] | undefined = undefined;
		if (!item.category) {
			newCategoryId = this.getDefaultCategoryId();
		} else if (
			// no category with this id exists
			!this.categories.find((category) => category.id == item.category)
		) {
			newCategoryId = this.addCategory(item.category as string);
		}
		this.items = [
			...this.items,
			{ ...item, id, category: newCategoryId || item.category }
		];
		this.setStores();
		this.garbageCollectCategories();
	}

	async deleteItem(id: Item['id']) {
		const index = this.items.findIndex((dbItem) => dbItem.id == id);
		this.items.splice(index, 1);
		this.setStores();
		this.garbageCollectCategories();
	}

	private sellItem(shoppingBagEntry: ShoppingBagEntry) {
		const index = this.items.findIndex(
			(dbItem) => dbItem.id == shoppingBagEntry.id
		);
		if (this.items[index].amount >= shoppingBagEntry.amount) {
			this.items[index].amount -= shoppingBagEntry.amount;
		}
	}

	async sellItems(shoppingBag: ShoppingBagEntry[]) {
		shoppingBag.forEach((shoppingBagEntry) => {
			this.sellItem(shoppingBagEntry);
		});
		this.setStores();
	}
}
