import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), mdx(), compress()],
  output: 'server',
  adapter: cloudflare(),
});