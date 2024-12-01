import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('posts')

  return rss({
    title: "Simon's Blog",
    description:
      "Simon Sorensen's writings about technology and software engineering",
    site: 'https://simse.io',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.published,
      description: post.data.excerpt,
      link: `/${post.data.slug}`,
    })),
    customData: `<language>en-gb</language>`,
  })
}
