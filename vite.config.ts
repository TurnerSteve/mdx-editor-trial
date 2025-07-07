// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';

import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
// Node’s URL helpers instead of raw ‘path’
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
	resolve: {
		alias: {
			// maps $lib/* → src/lib/*
			$lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
			$components: fileURLToPath(new URL('./src/lib/components', import.meta.url)),
			$routes: fileURLToPath(new URL('./src/routes', import.meta.url))
		}
	},
	optimizeDeps: {
		include: ['lodash-es' /* other lib names */]
	},
	ssr: {
		external: ['@your-ssr-external-dep']
	},
	build: {
		target: 'esnext',
		cssCodeSplit: true,
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['svelte', 'svelte/internal']
				}
			}
		}
	},
	server: {
		hmr: { overlay: true }, // show errors in overlay
		fs: { allow: ['static', 'src'] } // permit serving from these dirs
	},
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],

});
