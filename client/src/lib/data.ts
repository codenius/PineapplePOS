import { writable } from 'svelte/store';
import data from './example.json';

let itemsStore = writable(data);

let database: any;
itemsStore.subscribe((value) => (database = value));

export function getDatabase() {
	return database;
}
