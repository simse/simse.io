import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Soehne', 'sans-serif'],
        mono: ['SoehneMono', 'monospace']
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
        fadeIn: 'fade-in 0.5s ease-in-out',
      },
    }
  },

  plugins: []
} satisfies Config;
