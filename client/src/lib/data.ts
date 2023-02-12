import { writable, type Writable } from 'svelte/store';
import data from './example.json';
import type { Item } from './types/Item';

const itemsStore: Writable<Item[]> = writable(data as unknown as Item[]);

let database: Item[];
itemsStore.subscribe((value) => (database = value));

export function getDatabase() {
	return database;
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
