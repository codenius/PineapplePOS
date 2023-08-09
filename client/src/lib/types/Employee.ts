export interface Employee {
	id: string;
	_id?: Employee['id'];
	name: string;
	username?: Employee['name'];
	password: string;
	role: 'admin' | 'edit' | 'sell' | 'read';
	level?: Employee['role'];
}

export type Credentials = Pick<Employee, 'name' | 'password'>;
