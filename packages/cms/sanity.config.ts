import { CodeIcon, RocketIcon } from "@sanity/icons";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig([
	{
		name: "simse-io-prod",
		title: "simse.io",
		basePath: "/prod",
		icon: RocketIcon,
		projectId: "rjqusm5i",
		dataset: "production",
		plugins: [structureTool(), media()],
		schema: {
			types: schemaTypes,
		},
	},
	{
		name: "simse-io-test",
		title: "simse.io [TEST]",
		basePath: "/test",
		icon: CodeIcon,
		projectId: "rjqusm5i",
		dataset: "test",
		plugins: [structureTool(), media(), visionTool()],
		schema: {
			types: schemaTypes,
		},
	},
]);
