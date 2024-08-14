import { defineConfig, passthroughImageService } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: 'cloudflare'
  }),
  integrations: [
    tailwind(), 
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