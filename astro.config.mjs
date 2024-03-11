import { defineConfig, passthroughImageService } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: cloudflare({
    imageService: 'cloudflare'
  }),
  integrations: [tailwind(), mdx(), react(), markdoc(), keystatic(), icon()],
  image: {
    service: passthroughImageService()
  },
  prefetch: true
});