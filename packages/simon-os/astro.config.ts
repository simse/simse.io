import { defineConfig, passthroughImageService } from 'astro/config'
import bun from '@nurodev/astro-bun'
import preact from '@astrojs/preact'
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: bun(),
  integrations: [preact()],
  image: {
    service: passthroughImageService(),
  },
  prefetch: true,
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
})
