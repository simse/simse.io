import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import robotsTxt from 'astro-robots-txt';
import prefetch from '@astrojs/prefetch';
import node from '@astrojs/node';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'middleware'
  }),
  site: 'https://simse.io',
  integrations: [tailwind(), robotsTxt(), prefetch(), react()]
});