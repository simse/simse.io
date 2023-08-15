import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [mdx(), svelte(), tailwind(), preact({ compat: true })],
  experimental: {
    assets: true
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});