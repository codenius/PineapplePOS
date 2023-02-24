import { ItemsController } from '$lib/ApiControllers';
import type { Item } from '$lib/types/Item';
import type { PageLoad } from './$types';

export const ssr = false; // necessary to use adapter-static

export const load = (async ({ url }) => {
	const id = url.searchParams.get('id');
	let item: Item;
	try {
		item = (await ItemsController.getItem(id as string)) as Item;
	} catch {
		item = {} as Item;
	}
	return item;
}) satisfies PageLoad;
