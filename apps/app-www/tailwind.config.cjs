/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['IBM Plex Sans', 'sans-serif'],
				monospace: ['IBM Plex Mono'],
				serif: ['Cormorant', 'serif']
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
