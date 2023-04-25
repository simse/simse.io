/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./internal/templates/**/*.jet"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Wotfard', 'system-ui'],
        monospace: ['IBM Plex Mono'],
        serif: ['Novela', 'serif']
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