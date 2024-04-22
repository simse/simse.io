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

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        published: z.date(),
        technologies: z.array(z.string()),
        languages: z.array(z.string()),
        sourceCode: z.string().url().optional(),
        liveDemo: z.string().url().optional(),
        status: z.string()
    })
});

export const collections = {
    'blog': blogCollection,
    'projects': projectsCollection
};