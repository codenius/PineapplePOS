import type { Credentials, Employee } from '$lib/types/Employee';

export class EmployeesController {
	private BACKEND_URL: string;
	constructor(BACKEND_URL: string) {
		if (BACKEND_URL.endsWith('/')) {
			BACKEND_URL.substring(0, BACKEND_URL.length - 1);
		}
		this.BACKEND_URL = BACKEND_URL;
	}

	private url(path: string, base_url: string = this.BACKEND_URL) {
		return base_url + path;
	}

	private async fetch<T>(
		path: string,
		options: RequestInit = {},
		remap: boolean = true,
		json: boolean = true
	) {
		if (
			json &&
			options &&
			['POST', 'PUT'].includes(options?.method as string)
		) {
			options.headers = {
				'Content-Type': 'application/json'
			};
		}
		options.credentials = 'include';
		const response = await fetch(this.url(path), options);
		if (!response.ok) {
			throw new Error(`${response.status}: ${response.statusText}`);
		}
		const data = json ? response.json() : response.text();
		if (json && remap) {
			(data as Promise<Employee[]>).then((json) =>
				Array.isArray(json)
					? json.map(this.parseEmployee)
					: this.parseEmployee(json)
			);
		}
		return data as Promise<T>;
	}

	private parseEmployee(employee: Employee) {
		employee.id = employee._id as Employee['id'];
		delete employee._id;
		employee.role = employee.level as Employee['role'];
		delete employee.level;
		employee.name = employee.username as Employee['name'];
		delete employee.username;
		return employee;
	}

	private remapEmployee(employee: Employee) {
		employee.level = employee.role;
		employee.username = employee.name;
		return employee;
	}

	async getEmployees() {
		return this.fetch<Employee[]>('/employees');
	}

	async getEmployee(id: Employee['id']) {
		return this.fetch<Employee[]>(`/employees/${id}`);
	}

	async setEmployee(employee: Employee) {
		return this.fetch<Employee>(`/employees/${employee.id}`, {
			method: 'PUT',
			body: JSON.stringify(this.remapEmployee(employee))
		});
	}

	async addEmployee(employee: Employee) {
		return this.fetch<Employee>('/employees/register', {
			method: 'POST',
			body: JSON.stringify(this.remapEmployee(employee))
		});
	}

	async deleteEmployee(id: Employee['id']) {
		return this.fetch<Employee>(
			`/employees/${id}`,
			{ method: 'DELETE' },
			false,
			false
		);
	}

	async getRoles() {
		return ['admin', 'edit', 'sell', 'read'];
	}

	async loginEmployee({ name, password }: Credentials) {
		return this.fetch('/employees/login', {
			method: 'POST',
			body: JSON.stringify({ username: name, password })
		});
	}

	async logoutCurrentEmployee() {
		return this.fetch('/employees/logout', { method: 'POST' }, false, false);
	}

	async getCurrentEmployee() {
		return this.fetch('/employees/current');
	}
}
