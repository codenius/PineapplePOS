export const allowedRoutes = {
	/* different levels of permissons; array of route names allowed for certain 
    user group directly after first `/`: http://hostname/[routename]/... */
	read: [''],
	sell: ['', 'shop'],
	edit: ['', 'shop', 'stock'],
	admin: ['', 'shop', 'stock', 'employees']
};
