import { defineConfig, passthroughImageService, envField } from 'astro/config'
import bun from '@nurodev/astro-bun'
import tailwind from '@astrojs/tailwind'
import preact from '@astrojs/preact'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: bun(),
  integrations: [tailwind(), preact()],
  image: {
    service: passthroughImageService(),
  },
  prefetch: true,
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  }
})
