import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import {imagetools} from 'vite-imagetools';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
		mdsvex(mdsvexConfig)
	],

	kit: {
		adapter: adapter(),
		prerender: {
			default: true,
			onError: 'continue'
		},
		vite: {
			plugins: [imagetools({
				include: '**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}*',
				defaultDirectives: new URLSearchParams('?width=400;1200;1600&aspect=5:3&webp'),
			})]
		},
	}
};

export default config;
