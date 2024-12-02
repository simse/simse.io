import { cache } from "./cache";
import { type Post, getPosts, getPost } from "./posts";

export const getPosts = async (): Promise<Post[]> => {
  if (cache.has('posts')) {
    return cache.get<Post[]>('posts') || []
  }

  const posts = await getPosts()
  cache.set('posts', posts)

  return posts
}

export const getPost = async (slug: string): Promise<Post> => {
  const cacheKey = `posts/${slug}`

  if (cache.has(cacheKey)) {
    return cache.get<Post>(cacheKey)
  }

  const post = await getPost(slug)
  cache.set(cacheKey, post)

  return post
}