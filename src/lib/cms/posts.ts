import { sanityClient } from 'sanity:client'
import { postFields } from '@lib/cms/common'
import { type InferType, q } from 'groqd'

const { query: allPostsQuery, schema: allPostsSchema } = q('*')
  .filter("_type == 'post' && defined(slug)")
  .order('publishedAt desc')
  .grab(postFields)

export const getPosts = async () => {
  const sanityResponse = await sanityClient.fetch(allPostsQuery)

  return allPostsSchema.parse(sanityResponse)
}

export const getPost = async (slug: string): Promise<Post | null> => {
  const { query: postQuery, schema: postSchema } = q('*')
    .filter(`_type == 'post' && slug.current == '${slug}'`)
    .order('publishedAt desc')
    .grab(postFields)

  const sanityResponse = await sanityClient.fetch(postQuery)
  const parsedResponse = postSchema.parse(sanityResponse)

  if (!parsedResponse.length) {
    return null
  }

  return parsedResponse[0]
}

export type Post = InferType<typeof allPostsSchema>[0]
