import cloudflare from "@astrojs/cloudflare";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, passthroughImageService } from "astro/config";

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	integrations: [
		preact({
			compat: true,
			devtools: true,
		}),
	],
	image: {
		service: passthroughImageService(),
	},
	prefetch: true,
	markdown: {
		shikiConfig: {
			theme: "github-light",
		},
	},
	vite: {
		// biome-ignore lint/suspicious/noExplicitAny: vite 6/7 type duplication between astro and @tailwindcss/vite
		plugins: [tailwindcss() as any],
	},
	env: {
		schema: {
			OPENROUTER_API_KEY: envField.string({
				context: "server",
				access: "secret",
			}),
		},
	},
});
