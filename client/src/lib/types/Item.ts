import type { Category } from './Category';

export interface Item {
	id: string;
	_id?: string;
	name: string;
	category: Category | Category['id'] | Category['name'];
	company: string;
	price: number;
	sell_price?: number;
	amount: number;
	image: string;
}
