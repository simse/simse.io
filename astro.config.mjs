import { defineConfig, passthroughImageService } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro';
import icon from "astro-icon";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: cloudflare({
    imageService: 'cloudflare'
  }),
  integrations: [
    tailwind(), 
    mdx(), 
    markdoc(), 
    keystatic(), 
    icon(), 
    preact({
      compat: true,
      include: '**/preact/*'
    }),
    react({
      include: '**/react/*'
    })
  ],
  image: {
    service: passthroughImageService()
  },
  prefetch: true
});