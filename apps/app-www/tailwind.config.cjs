/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html}'],
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
