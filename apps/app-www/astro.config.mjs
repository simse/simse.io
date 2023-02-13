import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import robotsTxt from 'astro-robots-txt';
import prefetch from '@astrojs/prefetch';

// https://astro.build/config
export default defineConfig({
  site: 'https://simse.io',
  integrations: [tailwind(), robotsTxt(), prefetch()],
  markdown: {
    syntaxHighlight: 'prism'
  }
});