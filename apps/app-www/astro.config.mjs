import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";
import image from "@astrojs/image";

import sitemap from "@astrojs/sitemap";
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://simse.io',
  integrations: [tailwind(), svelte(), mdx(), compress(), image(), sitemap(), robotsTxt()],
  markdown: {
    syntaxHighlight: 'prism'
  }
});