import { writable, type Writable } from 'svelte/store';
import data from './example.json';
import type { Item } from './types/Item';
import type { ShoppingBagEntry } from './types/ShoppingBagEntry';

const itemsStore: Writable<Item[]> = writable(data as unknown as Item[]);

let database: Item[];
itemsStore.subscribe((value) => (database = value));

export function getDatabase() {
	return database;
}

export function getCategories() {
	return Array.from(new Set(database.map((item) => item.category)));
}

export function setItem(item: Item) {
	const index = database.findIndex((dbItem) => dbItem.id == item.id);
	const newDb = database.slice();
	newDb[index] = item;
	itemsStore.set(newDb);
}

export function addItem(item: Item) {
	const id = crypto.randomUUID();
	itemsStore.set([...database, { ...item, id }]);
}

export function deleteItem(id: Item['id']) {
	const index = database.findIndex((dbItem) => dbItem.id == id);
	const newDb = database.slice();
	newDb.splice(index, 1);
	itemsStore.set(newDb);
}

function sellItem(shoppingBagEntry: ShoppingBagEntry) {
	const index = database.findIndex(
		(dbItem) => dbItem.id == shoppingBagEntry.id
	);
	const newDb = database.slice();
	if (newDb[index].amount >= shoppingBagEntry.amount) {
		newDb[index].amount -= shoppingBagEntry.amount;
	}
	itemsStore.set(newDb);
}

export function sellItems(shoppingBag: ShoppingBagEntry[]) {
	shoppingBag.forEach((shoppingBagEntry) => {
		sellItem(shoppingBagEntry);
	});
}
