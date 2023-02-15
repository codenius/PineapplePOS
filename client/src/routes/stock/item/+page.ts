import { ItemsController } from '$lib/ItemsController';
import type { PageLoad } from './$types';

export const ssr = false; // necessary to use adapter-static

export const load = (async({ url }) => {
	const id = url.searchParams.get('id');
	const item = await ItemsController.getItem(id);
	return item;
}) satisfies PageLoad;
