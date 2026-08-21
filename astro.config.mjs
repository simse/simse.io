// @ts-check
import cloudflare from "@astrojs/cloudflare";
import markdoc from "@astrojs/markdoc";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import { default as icons } from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare-binding",
  }),
  integrations: [preact({ compat: true }), markdoc()],
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
  env: {
    schema: {
      OPENROUTER_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
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
