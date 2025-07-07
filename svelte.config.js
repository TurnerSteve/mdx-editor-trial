
import adapter from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [mdsvex(mdsvexConfig), vitePreprocess()],

	compilerOptions: {
		// For Svelte 5 runes mode (if available)
		runes: true
	},
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: true,
			env: {
				host: 'HOST',
				port: 'PORT',
				origin: 'ORIGIN'
			}
		}),
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
