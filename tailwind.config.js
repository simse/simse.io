/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./internal/server/templates/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

