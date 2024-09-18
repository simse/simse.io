/// <reference types="vitest" />
import { configDefaults } from 'vitest/config'
import { getViteConfig } from 'astro/config'

export default getViteConfig({
  // @ts-ignore FIX LATER
  test: {
    exclude:[
      ...configDefaults.exclude,
      'tests/*'
    ]
  },
})