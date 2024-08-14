import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        published: z.date(),
        updated: z.date().optional(),
        tags: z.array(z.string()),
        draft: z.boolean().default(false),
    })
});

export const collections = {
    'blog': blogCollection
};