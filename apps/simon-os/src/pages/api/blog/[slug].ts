import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug

  if (!slug) {
    return new Response(null, { status: 404 })
  }

  // load markdown files
  const post = await import(`../../../content/blog/${slug}.md`)

  return new Response(
    JSON.stringify({
      frontmatter: post.frontmatter,
      html: post.compiledContent().replaceAll('’', "'").replaceAll('…', '...'),
    }),
  )
}
