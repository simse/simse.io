import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const wallpapers = defineCollection({
	loader: file("src/data/wallpapers.yml"),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		contrastColour: z.string(),
		image: z.object({
			src: z.string(),
			repeat: z.string().optional(),
			size: z.string().optional(),
		}),
	}),
});

const music = defineCollection({
	loader: file("src/data/music.yml"),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		artist: z.string(),
		url: z.string(),
	}),
});

export const collections = { wallpapers, music };
