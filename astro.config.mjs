// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  adapter: cloudflare(),
  devToolbar: {
    enabled: false,
  },
});
