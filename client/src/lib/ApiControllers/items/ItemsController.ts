import type { Item } from '$lib/types/Item';
import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';

export class ItemsController {
	private BACKEND_URL: string;
	constructor(BACKEND_URL: string) {
		if (BACKEND_URL.endsWith('/')) {
			BACKEND_URL.substring(0, BACKEND_URL.length - 1);
		}
		this.BACKEND_URL = BACKEND_URL;
	}

	private url(path: string, base_url: string = this.BACKEND_URL) {
		return base_url + path;
	}

	private async fetch<T>(
		path: string,
		options?: RequestInit,
		remap: boolean = true,
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
		const response = await fetch(this.url(path), options);
		if (!response.ok) {
			if (response.status == 401) {
			} else {
			}
			throw new Error(`${response.status}: ${response.statusText}`);
		}
		const data = json ? response.json() : response.text();
		if (json && remap) {
			(data as Promise<Item[]>).then((json) =>
				Array.isArray(json) ? json.map(this.parseItem) : this.parseItem(json)
			);
		}
		return data as Promise<T>;
	}

	private parseItem(item: Item) {
		item.id = item._id as string;
		delete item._id;
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
	async getCategories() {
		const items = (await this.getItems()) as Item[];
		const categories = Array.from(new Set(items.map((item) => item.category)));
		return categories;
	}
	sellItems(shoppingBag: ShoppingBagEntry[]) {
		return Promise.all(
			shoppingBag.map(async (shoppingBagEntry) => {
				let item = (await this.getItem(shoppingBagEntry.id)) as Item;
				item.amount -= shoppingBagEntry.amount;
				return this.setItem(item);
			})
		);

		/*         return this.fetch('/sell/',
			{ method: 'PUT', body: JSON.stringify(shoppingBag) }) */
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
