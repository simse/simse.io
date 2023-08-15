import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    excerpt: z.string(),
    publishedOn: z.date(),
    tags: z.array(z.string()),
    cover: image().refine((img) => img.width >= 1080, {
      message: "Cover image must be at least 1080 pixels wide!",
    }),
    coverAlt: z.string(),
    coverCaption: z.string().optional(),
    coverLayout: z.enum(['fullscreen', 'half', 'third', 'below-title']),
  })
});

export const collections = {
  'blog': blogCollection,
};