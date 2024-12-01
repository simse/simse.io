import { defineCollection, z } from 'astro:content'
import { getPosts, getProjects } from '@cms'

const imageType = z.object({
  alt: z.string().optional(),
  caption: z.string().optional(),
  asset: z.object({
    _ref: z.string(),
  }),
})

const posts = defineCollection({
  loader: async () => {
    const posts = await getPosts()

    return posts.map((post) => ({
      id: post.slug,
      ...post,
    }))
  },
  schema: z.object({
    _type: z.enum(['post']),
    title: z.string(),
    excerpt: z.string().optional(),
    slug: z.string(),
    published: z.date(),
    image: imageType.optional(),
    content: z.any(),
    tags: z.string().array().optional(),
  }),
})

const projects = defineCollection({
  loader: async () => {
    const projects = await getProjects()

    return projects.map((project) => ({
      id: project.slug,
      ...project,
    }))
  },
  schema: z.object({
    _type: z.enum(['project']),
    title: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    slug: z.string(),
    icon: imageType.optional(),
    published: z.date(),
    details: z.any(),
    languages: z.string().array().default([]),
    technologies: z.string().array().default([]),
    sourceCode: z.string().optional(),
    demo: z.string().optional(),
    type: z.string(),
    images: imageType.array().optional(),
  }),
})

export const collections = { posts, projects }
