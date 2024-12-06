import { defineConfig, envField, passthroughImageService } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import sanity from '@sanity/astro'
import svelte from '@astrojs/svelte'
import { loadEnv } from "vite"
import sitemap from '@astrojs/sitemap'
import bun from "@nurodev/astro-bun"

const { SANITY_PROJECT_ID, SANITY_PROJECT_DATASET } = loadEnv(process.env.NODE_ENV, process.cwd(), "")

// https://astro.build/config
export default defineConfig({
  site: 'https://simse.io',
  output: 'server',
  adapter: bun(),
  trailingSlash: 'ignore',
  redirects: {
    '/project/pymitv': '/pymitv',
    '/posts': '/blog',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_PROJECT_DATASET,
      useCdn: false,
    }),
    svelte(),
    sitemap()
  ],
  prefetch: true,
  env: {
    schema: {
      PEPY_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      SANITY_PROJECT_DATASET: envField.string({ context: "server", access: "public" }),
      SANITY_PROJECT_ID: envField.string({ context: "server", access: "public" }),
      IMGPROXY_ENDPOINT: envField.string({ context: 'server', access: 'public', optional: true }),
      IMGPROXY_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      IMGPROXY_SALT: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        },
      },
    },
  },
  image: {
    service: passthroughImageService()
  }
})