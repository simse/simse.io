/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./internal/templates/**/*.html"],
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