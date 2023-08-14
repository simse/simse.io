/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['National2', 'sans-serif'],
				serif: ['Feijoa', 'serif'],
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}