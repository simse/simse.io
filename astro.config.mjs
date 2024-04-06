import { defineConfig, passthroughImageService } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
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
    icon(), 
    preact(),
  ],
  image: {
    service: passthroughImageService()
  },
  prefetch: true,
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});