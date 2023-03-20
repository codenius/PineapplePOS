import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: { alias: { $routes: path.resolve('./src/routes') } }
};

export default config;
