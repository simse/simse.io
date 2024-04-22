import { defineConfig, passthroughImageService } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import icon from "astro-icon";
import preact from "@astrojs/preact";

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
  integrations: [
    tailwind(),
    markdoc(),
    icon(),
    preact({
      compat: true,
      include: "**/preact/*",
    }),
    react({
      include: "**/react/*",
    }),
    sanity({
      projectId: "rjqusm5i",
      dataset: "production",
      useCdn: true,
      studioBasePath: '/cms',
    }),
  ],
  image: {
    service: passthroughImageService(),
  },
  prefetch: true,
});
