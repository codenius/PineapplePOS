import type { Item } from "./types/Item"

class Controller {
    private BACKEND_URL: string
    constructor(BACKEND_URL: string) {
        if (BACKEND_URL.endsWith('/')) {
            BACKEND_URL.substring(0, BACKEND_URL.length - 1)
        }
        this.BACKEND_URL = BACKEND_URL
    }

    private url(path: string, base_url: string = this.BACKEND_URL) {
        console.log(base_url + path)
        return base_url + path
    }

    private async fetch(path: string, options?: RequestInit, remap: boolean = true, json: boolean = true) {
        const response = await fetch(this.url(path), options)
        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        const data = json ? response.json() : response.text()
        if (json && remap) {
            (data as Promise<Item[]>).then(json => json.map((item) => {
                item.id = item._id as string
                delete item._id
                return item
            }));
        }
            return data as Promise<Item[] | string | Object>
        };


        getItems() {
            return this.fetch('/items')
        }
    }


    export const ItemsController = new Controller('http://localhost:3000/api')


/* import type { Item } from './types/Item';
import type { ShoppingBagEntry } from './types/ShoppingBagEntry';

class MockController {
    database: Item[];

    constructor(data: Item[]) {
        this.database = data

    }

    getItems() {
        return this.database;
    }

    getItem(id: Item['id']) {
        return this.database.find((element) => element.id == id)
    }

    getCategories() {
        return Array.from(new Set(this.database.map((item) => item.category)));
    }

    setItem(item: Item) {
        const index = this.database.findIndex((dbItem) => dbItem.id == item.id);
        this.database[index] = item;
    }

    addItem(item: Item) {
        const id = crypto.randomUUID();
        this.database = [...this.database, { ...item, id }]
    }

    deleteItem(id: Item['id']) {
        const index = this.database.findIndex((dbItem) => dbItem.id == id);
        this.database.splice(index, 1);
    }

    private sellItem(shoppingBagEntry: ShoppingBagEntry) {
        const index = this.database.findIndex(
            (dbItem) => dbItem.id == shoppingBagEntry.id
        );
        if (this.database[index].amount >= shoppingBagEntry.amount) {
            this.database[index].amount -= shoppingBagEntry.amount;
        }
    }

    sellItems(shoppingBag: ShoppingBagEntry[]) {
        shoppingBag.forEach((shoppingBagEntry) => {
            this.sellItem(shoppingBagEntry);
        });
    }

}

import data from './example.json';
export const ItemsController = new MockController(data as unknown as Item[])
 */