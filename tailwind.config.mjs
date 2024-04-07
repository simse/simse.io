/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			boxShadow: {
				'window': '4px 4px 0px 0 rgba(0,0,0,0.25)'
			},
			fontFamily: {
				sans: ['Chicago', 'sans-serif'],
				'sans-alt': ['ArialPixel', 'sans-serif'],
				mono: ['ArialPixel', 'monospace']
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwind-scrollbar'),
	],
}
