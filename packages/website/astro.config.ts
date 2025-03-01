import { defineConfig, envField, passthroughImageService } from 'astro/config'
import svelte from '@astrojs/svelte'
import sitemap from '@astrojs/sitemap'
import bun from "@nurodev/astro-bun"
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";

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
    svelte(),
    sitemap()
  ],
  prefetch: true,
  env: {
    schema: {
      PEPY_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      SANITY_PROJECT_DATASET: envField.string({ context: "server", access: "public", default: "production" }),
      SANITY_PROJECT_ID: envField.string({ context: "server", access: "public", default: "rjqusm5i" }),
      IMGPROXY_ENDPOINT: envField.string({ context: 'server', access: 'public', optional: true }),
      IMGPROXY_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      IMGPROXY_SALT: envField.string({ context: 'server', access: 'secret', optional: true }),
      AXIOM_DATASET: envField.string({ context: 'server', access: 'secret', default: 'simse-io-dev' }),
      AXIOM_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
      Icons({
        compiler: 'svelte'
      })
    ],
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
