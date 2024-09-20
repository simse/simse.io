import { defineConfig, passthroughImageService, envField } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import sanity from '@sanity/astro'
import svelte from '@astrojs/svelte'
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
    sanity({
      projectId: 'rjqusm5i',
      dataset: 'production',
      useCdn: false,
    }),
    svelte(),
  ],
  image: {
    service: passthroughImageService(),
  },
  prefetch: true,
  env: {
    schema: {
      PEPY_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    },
  },
})