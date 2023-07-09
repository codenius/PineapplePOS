import { browser } from '$app/environment';
import type { Credentials, Employee } from '$lib/types/Employee';
import { persisted } from 'svelte-local-storage-store';
import type { Writable } from 'svelte/store';

export class EmployeesController {
	database!: Employee[];
	store: Writable<Employee[]>;

	constructor(data: Employee[]) {
		this.store = persisted('employees', data);
		this.store.subscribe((data) => (this.database = data));
	}

	private setStore() {
		this.store.set(this.database);
	}

	async getEmployees() {
		return this.database;
	}

	async getEmployee(id: Employee['id']) {
		return this.database.find((element) => element.id == id);
	}

	async setEmployee(employee: Employee) {
		const index = this.database.findIndex(
			(dbEmployee) => dbEmployee.id == employee.id
		);
		this.database[index] = employee;
		this.setStore();
	}

	async addEmployee(employee: Employee) {
		const id = crypto.randomUUID();
		this.database = [...this.database, { ...employee, id }];
		this.setStore();
	}

	async deleteEmployee(id: Employee['id']) {
		const index = this.database.findIndex((dbEmployee) => dbEmployee.id == id);
		this.database.splice(index, 1);
		this.setStore();
	}

	async getRoles() {
		return ['admin', 'edit', 'sell', 'read'];
	}

	async loginEmployee({ name, password }: Credentials) {
		const index = this.database.findIndex(
			(dbEmployee) => dbEmployee.name == name
		);
		const employee = this.database[index];
		if (employee.password == password) {
			if (browser) {
				localStorage.setItem('employee', employee.id);
				return employee;
			}
		} else {
			throw new Error('Authentication failed.');
		}
	}

	async logoutCurrentEmployee() {
		if (browser) {
			localStorage.removeItem('employee');
			return;
		}
	}

	async getCurrentEmployee() {
		if (browser) {
			let employee: Employee | null = null;
			const id = localStorage.getItem('employee') as string;
			if (id) {
				employee = (await this.getEmployee(id)) as Employee;
			}
			if (employee) {
				return employee;
			} else {
				throw new Error('422');
			}
		}
	}
}
