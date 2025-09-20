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
		plugins: [
			// @ts-expect-error
			tailwindcss(),
		],
	},
	env: {
		schema: {
			GEMINI_API_KEY: envField.string({
				context: "server",
				access: "secret",
			}),
		},
	},
});
