/// <reference types="vitest" />
import { configDefaults } from 'vitest/config'
import { getViteConfig } from 'astro/config'

export default getViteConfig({
  test: {
    exclude:[
      ...configDefaults.exclude,
      'tests/*'
    ],
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
