import { defineConfig, passthroughImageService } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare"
  }),
  integrations: [tailwind({
    applyBaseStyles: false,
  }), icon(), sanity({
    projectId: "rjqusm5i",
    dataset: "production",
    useCdn: true,
    studioBasePath: '/cms'
  }), react(), svelte()],
  image: {
    service: passthroughImageService()
  },
  prefetch: true
});