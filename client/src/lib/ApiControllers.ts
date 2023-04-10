import { env } from '$env/dynamic/public';

import type { Item } from '$lib/types/Item';
import items from './ApiControllers/items/example.json';
import { ItemsController as ApiItemsController } from './ApiControllers/items/ItemsController';
import { ItemsController as MockItemsController } from './ApiControllers/items/LocalStorageItemsController';

import type { Employee } from '$lib/types/Employee';
import employees from './ApiControllers/employees/example.json';
import { EmployeesController as MockEmployeesController } from './ApiControllers/employees/LocalStorageEmployeesController';

export let ItemsController: ApiItemsController | MockItemsController;
export let EmployeesController: MockEmployeesController;

(async () => {
	if (env.PUBLIC_MOCK_API == 'true') {
		ItemsController = new MockItemsController(items as unknown as Item[]);
		EmployeesController = new MockEmployeesController(
			employees as unknown as Employee[]
		);
	} else {
		ItemsController = new ApiItemsController(env.PUBLIC_BACKEND_URL || '/api');
	}
})();
