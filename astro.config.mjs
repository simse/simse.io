import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://simse.io',
  integrations: [mdx(), svelte(), tailwind(), preact({
    compat: true
  }), sitemap()],
  build : {
    inlineStylesheets: 'auto'
  },
  image: {
    domains: ["img.0x1.earth"],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  },
  compressHTML: true
});