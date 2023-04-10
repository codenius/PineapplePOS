export interface Employee {
	id: string;
	name: string;
	password: string;
	role: 'admin' | 'edit' | 'sell' | 'read';
}

export type Credentials = Pick<Employee, 'name' | 'password'>;
