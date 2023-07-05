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
			category: this.categories.find((category) => category.id == item.category)
		}));
	}

	async getItem(id: Item['id']) {
		return this.items.find((element) => element.id == id);
	}

	async getCategories() {
		return this.categories;
	}

	async orderCategories(categories: Category[]) {
		this.categories = categories;
		this.setStores();
	}

	private addCategory(name: Category['name'], _isDefault?: boolean) {
		const id = crypto.randomUUID();
		this.categories = [...this.categories, { name, id, _isDefault }];
		this.setStores();
		return id;
	}

	private deleteCategory(id: Category['id']) {
		this.categories = this.categories.filter((category) => category.id != id);
		this.setStores();
	}

	async setItem(item: Item) {
		const index = this.items.findIndex((dbItem) => dbItem.id == item.id);
		const modifiedItem = this.items[index];
		let newCategoryId!: Category['id'];
		if (
			this.items.filter((item) => item.category == modifiedItem.category)
				.length <= 1
		) {
			this.deleteCategory(modifiedItem.category as string);
		}
		if (item.category != modifiedItem.category) {
			if (!item.category) {
				const defaultCategory = this.categories.find(
					(category) => category._isDefault
				);
				if (defaultCategory) {
					item.category = defaultCategory.id;
				} else {
					newCategoryId = this.addCategory('–', true);
				}
			} else if (
				!this.categories.find((category) => category.id == item.category)
			) {
				newCategoryId = this.addCategory(item.category as string);
			}
		}
		this.items[index] = { ...item, category: newCategoryId || item.category };
		this.setStores();
	}

	async addItem(item: Item) {
		const id = crypto.randomUUID();
		let newCategoryId!: Category['id'];
		if (!item.category) {
			const defaultCategory = this.categories.find(
				(category) => category._isDefault
			);
			if (defaultCategory) {
				item.category = defaultCategory.id;
			} else {
				newCategoryId = this.addCategory('–', true);
			}
		} else if (
			!this.categories.find((category) => category.id == item.category)
		) {
			newCategoryId = this.addCategory(item.category as string);
		}
		this.items = [
			...this.items,
			{ ...item, id, category: newCategoryId || item.category }
		];
		this.setStores();
	}

	async deleteItem(id: Item['id']) {
		const index = this.items.findIndex((dbItem) => dbItem.id == id);
		const deletedItem = this.items[index];
		this.items.splice(index, 1);
		if (
			this.items.filter((item) => item.category == deletedItem.category)
				.length == 0
		) {
			this.deleteCategory(deletedItem.category as string);
		}
		this.setStores();
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
