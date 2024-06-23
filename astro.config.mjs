import { defineConfig, passthroughImageService } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare"
  }),
  integrations: [tailwind(), icon(), sanity({
    projectId: "rjqusm5i",
    dataset: "production",
    useCdn: true,
    studioBasePath: '/cms'
  }), react()],
  image: {
    service: passthroughImageService()
  },
  prefetch: true
});