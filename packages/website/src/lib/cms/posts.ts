import { postFields } from '@lib/cms/common'
import { type InferType, q } from 'groqd'
import client from './client'

const { query: allPostsQuery, schema: allPostsSchema } = q('*')
  .filter("_type == 'post' && defined(slug)")
  .order('publishedAt desc')
  .grab(postFields)

const blocksToText = (blocks: Post['content']): string => {
  return blocks.map(block => {
    if (block._type !== "block" || !block.children) {
      return "";
    }

    return block.children.map(child => child.text).join('')
  })
    .join(" ")
}

const shortenText = (text: string, maxChars = 160): string => {
  if (text.length < maxChars) {
    return text;
  }

  return text.slice(0, maxChars) + '...';
}

const excerptFromPost = (post: Post): string => {
  if (post.excerpt) {
    return post.excerpt;
  }

  return shortenText(blocksToText(post.content));
}

export const getPosts = async () => {
  const sanityResponse = await client.fetch(allPostsQuery)

  return allPostsSchema.parse(sanityResponse).map(post => {
    let transformedPost = {
      ...post,
      excerpt: excerptFromPost(post)
    };

    return transformedPost
  });
}

export const getPost = async (slug: string): Promise<Post | null> => {
  const { query: postQuery, schema: postSchema } = q('*')
    .filter(`_type == 'post' && slug.current == '${slug}'`)
    .order('publishedAt desc')
    .grab(postFields)

  const sanityResponse = await client.fetch(postQuery)
  const parsedResponse = postSchema.parse(sanityResponse)

  if (!parsedResponse.length) {
    return null
  }

  return parsedResponse[0]
}

export type Post = InferType<typeof allPostsSchema>[0]
