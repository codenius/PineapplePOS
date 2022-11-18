import type { Item } from './Item';

export interface ShoppingBagEntry {
	id: Item['id'];
	amount: Item['amount'];
}
