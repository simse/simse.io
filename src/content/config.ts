import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        published: z.date(),
        updated: z.date().optional(),
        tags: z.array(z.string()),
    })
});

export const collections = {
    'blog': blogCollection
};