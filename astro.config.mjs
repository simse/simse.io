import { defineConfig } from 'astro/config';
import glsl from 'vite-plugin-glsl';
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [mdx(), svelte(), tailwind()],
  experimental: {
    assets: true
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    }
  },
  vite: {
    plugins: [glsl()]
  }
});