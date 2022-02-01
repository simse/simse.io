module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Articulat CF"']
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
