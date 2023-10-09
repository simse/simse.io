import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    excerpt: z.string(),
    draft: z.boolean(),
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

const projectsCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    sourceCode: z.string().url(),
    liveDemo: z.optional(z.string().url()),
    techStack: z.array(z.string()),
  })
})

const photographyCollection = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    images: z.array(z.object({
      image: image(),
      alt: z.string().optional(),
      caption: z.string().optional(),
    })),
    title: z.string(),
    titleSuffix: z.string().optional(),
    story: z.string(),
    seo: z.object({
      description: z.string(),
      slug: z.string(),
    }).optional(),
    cover: image(),
    category: z.string(),
    camera: z.string().default('Olympus OM-10'),
    lens: z.array(z.string()).default(['Zuiko 50mm f1.8']),
    film: z.array(z.string()),
    lastUpdated: z.date()
  })
})


export const collections = {
  'blog': blogCollection,
  'projects': projectsCollection,
  'photography': photographyCollection
};