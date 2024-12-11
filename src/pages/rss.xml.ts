import { getRssString } from '@astrojs/rss'
import { getPosts } from '@lib/cms'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const posts = await getPosts()

  const rssString = await getRssString({
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
    stylesheet: '/pretty-feed-v3.xsl',
  })

  return new Response(rssString, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
