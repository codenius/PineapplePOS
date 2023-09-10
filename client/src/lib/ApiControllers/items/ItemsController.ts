import type { Category } from '$lib/types/Category';
import type { Item } from '$lib/types/Item';
import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';
import { persisted } from 'svelte-local-storage-store';
import { get, type Writable } from 'svelte/store';

export class ItemsController {
	private BACKEND_URL: string;
	private categoriesOrder!: Writable<Pick<Category, 'id' | 'index'>[]>;
	constructor(BACKEND_URL: string) {
		if (BACKEND_URL.endsWith('/')) {
			BACKEND_URL.substring(0, BACKEND_URL.length - 1);
		}
		this.BACKEND_URL = BACKEND_URL;
		this.categoriesOrder = persisted('categoriesOrder', []);
	}

	private url(path: string, base_url: string = this.BACKEND_URL) {
		return base_url + path;
	}

	private async fetch<T>(
		path: string,
		options: RequestInit = {},
		parser: <T>(arg: T) => T = this.parseItem,
		json: boolean = true
	) {
		if (
			json &&
			options &&
			['POST', 'PUT'].includes(options?.method as string)
		) {
			options.headers = {
				'Content-Type': 'application/json'
			};
		}
		options.credentials = 'include';
		const response = await fetch(this.url(path), options);
		if (!response.ok) {
			throw new Error(`${response.status}: ${response.statusText}`);
		}
		const data = json ? response.json() : response.text();
		if (json && parser) {
			(data as Promise<Item[]>).then((json) =>
				Array.isArray(json) ? json.map(parser) : parser(json)
			);
		}
		return data as Promise<T>;
	}

	private static parseCategory(category: Category) {
		category.id = category._id as string;
		delete category._id;
		return category;
	}

	private parseItem(item: Item) {
		item.id = item._id as string;
		delete item._id;
		item.category = ItemsController.parseCategory(item.category as Category);
		item.price = item.sell_price as number;
		delete item.sell_price;
		return item;
	}

	private remapItem(item: Item) {
		item.sell_price = item.price;
		return item;
	}

	getItems() {
		return this.fetch<Item[]>('/items');
	}
	getItem(id: Item['id']) {
		return this.fetch<Item>(`/items/${id}`);
	}
	getCategories() {
		return this.fetch<Category[]>(
			'/categories',
			{},
			ItemsController.parseCategory
		).then((categories) => {
			const categoriesOrder = get(this.categoriesOrder);
			return categories.map((category) => ({
				...category,
				index: categoriesOrder.find((c) => c.id == category.id)?.index
			}));
		});
	}
	orderCategories(categories: Category[]) {
		this.categoriesOrder.set(
			categories.map((category) => ({ id: category.id, index: category.index }))
		);
	}
	sellItems(shoppingBag: ShoppingBagEntry[]) {
		return this.fetch('/sellpoint/sell', {
			method: 'POST',
			body: JSON.stringify(shoppingBag)
		});
	}
	addItem(item: Item) {
		return this.fetch<Item>('/items/new', {
			method: 'POST',
			body: JSON.stringify(this.remapItem(item))
		});
	}
	setItem(item: Item) {
		return this.fetch<Item>(`/items/${item.id}`, {
			method: 'PUT',
			body: JSON.stringify(this.remapItem(item))
		});
	}
	deleteItem(id: Item['id']) {
		return this.fetch<Item>(`/items/${id}`, { method: 'DELETE' });
	}
}
