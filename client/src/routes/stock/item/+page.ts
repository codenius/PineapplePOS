import { getDatabase } from '$lib/data';
import type { PageLoad } from './$types';

export const ssr = false; // necessary to use adapter-static

export const load = (({ url }) => {
	const id = url.searchParams.get('id');
	const item = getDatabase().find((element) => element.id == id);
	return item;
}) satisfies PageLoad;
