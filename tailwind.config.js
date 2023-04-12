/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Wotfard', 'system-ui'],
                monospace: ['IBM Plex Mono'],
                serif: ['Cormorant', 'serif']
            },
        },
    },
  plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/container-queries'),
  ],
}

