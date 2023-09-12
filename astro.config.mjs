import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://simse.io',
  output: 'static',
  integrations: [mdx(), svelte(), tailwind(), preact({
    compat: true
  }), sitemap()],
  build : {
    inlineStylesheets: 'auto'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  },
  compressHTML: true
});