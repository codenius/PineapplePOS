import { EmployeesController } from '$lib/ApiControllers';
import type { Employee } from '$lib/types/Employee';
import type { PageLoad } from './$types';

export const ssr = false; // necessary to use adapter-static

export const load = (async ({ url }) => {
	const id = url.searchParams.get('id');
	let employee: Employee;
	try {
		employee = (await EmployeesController.getEmployee(
			id as string
		)) as Employee;
	} catch {
		employee = {} as Employee;
	}
	return employee;
}) satisfies PageLoad;
