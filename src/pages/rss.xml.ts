import { getPosts } from '@lib/cms'
import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const posts = await getPosts()

  return rss({
    title: "Simon's Blog",
    description:
      "Simon Sorensen's writings about technology and software engineering",
    site: 'https://simse.io',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.published),
      description: post.excerpt,
      link: `/${post.slug}`,
    })),
    customData: `<language>en-gb</language>`,
  })
}
