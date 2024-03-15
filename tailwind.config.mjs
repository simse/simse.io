/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Figtree', 'sans-serif'],
			},
			keyframes: {
				'fade-in': {
					'0%': {
						opacity: '0',
					},
					'100%': {
						opacity: 'var(--opacity)',
					},
				},
			},
			animation: {
				'fadeIn': 'fade-in 0.5s ease-in-out',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
