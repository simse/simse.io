// @ts-check
import cloudflare from "@astrojs/cloudflare";
import markdoc from "@astrojs/markdoc";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import { default as icons } from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare-binding",
  }),
  integrations: [preact(), markdoc()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Figtree",
      cssVariable: "--font-figtree",
      weights: ["300 900"],
      styles: ["normal", "italic"],
    },
    {
      provider: fontProviders.google(),
      name: "Fraunces",
      cssVariable: "--font-fraunces",
      weights: ["300 900"],
      styles: ["normal", "italic"],
    },
  ],
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [
      tailwindcss(),
      icons({
        compiler: "jsx",
        jsx: "preact",
      }),
    ],
  },
});
