import { persisted } from 'svelte-local-storage-store';

const defaultShoppingBagWidth = 30;
export const shoppingBagWidth = persisted(
	'shoppingBagWidth',
	defaultShoppingBagWidth
);
