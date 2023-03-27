/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['system-ui'],
				monospace: ['IBM Plex Mono'],
				serif: ['Cormorant', 'serif']
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
