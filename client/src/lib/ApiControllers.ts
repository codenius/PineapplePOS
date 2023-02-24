import { env } from '$env/dynamic/public';
import { Controller } from './ApiControllers/ItemsController';

import data from './ApiControllers/example.json';
import { Controller as MockController } from './ApiControllers/LocalStorageItemsController';
import type { Item } from '$lib/types/Item';

export let ItemsController: Controller | MockController;
if (env.PUBLIC_MOCK_ITEMS == 'true') {
	ItemsController = new MockController(data as unknown as Item[]);
} else {
	ItemsController = new Controller(env.PUBLIC_BACKEND_URL || '/api');
}
