import { env } from '$env/dynamic/public';

import type { Item } from '$lib/types/Item';
import type { ItemsController as ApiItemsController } from './ApiControllers/items/ItemsController';
import type { ItemsController as MockItemsController } from './ApiControllers/items/LocalStorageItemsController';

import type { Employee } from '$lib/types/Employee';
import type { EmployeesController as MockEmployeesController } from './ApiControllers/employees/LocalStorageEmployeesController';

export let ItemsController: ApiItemsController | MockItemsController;
export let EmployeesController: MockEmployeesController;

(async () => {
	if (env.PUBLIC_MOCK_API == 'true') {
		ItemsController = new (
			await import('./ApiControllers/items/LocalStorageItemsController')
		).ItemsController(
			(await import('./ApiControllers/items/example.json'))
				.default as unknown as Item[]
		);
		EmployeesController = new (
			await import('./ApiControllers/employees/LocalStorageEmployeesController')
		).EmployeesController(
			(await import('./ApiControllers/employees/example.json'))
				.default as unknown as Employee[]
		);
	} else {
		ItemsController = new (
			await import('./ApiControllers/items/ItemsController')
		).ItemsController(env.PUBLIC_BACKEND_URL || '/api');
	}
})();
