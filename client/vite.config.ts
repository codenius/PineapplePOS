import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: { alias: { $routes: path.resolve('./src/routes') } },
	ssr: {
		noExternal: ['@popperjs/core']
	}
};

export default config;
