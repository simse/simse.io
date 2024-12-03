import { cache } from './cache'
import {
  type Post,
  getPost as getPostRaw,
  getPosts as getPostsRaw,
} from './posts'
import {
  type Project,
  getProject as getProjectRaw,
  getProjects as getProjectsRaw,
} from './projects'

export const getPosts = async (): Promise<Post[]> => {
  if (cache.has('posts')) {
    return cache.get<Post[]>('posts') || []
  }

  const posts = await getPostsRaw()
  cache.set('posts', posts)

  return posts
}

export const getPost = async (slug: string): Promise<Post> => {
  const cacheKey = `posts/${slug}`

  if (cache.has(cacheKey)) {
    const cachedResult = cache.get<Post>(cacheKey)

    if (cachedResult) return cachedResult
  }

  const post = await getPostRaw(slug)
  cache.set(cacheKey, post)

  return post
}

export const getProjects = async (): Promise<Project[]> => {
  if (cache.has('projects')) {
    return cache.get<Project[]>('projects') || []
  }

  const projects = await getProjectsRaw()
  cache.set('projects', projects)

  return projects
}

export const getProject = async (slug: string): Promise<Project> => {
  const cacheKey = `projects/${slug}`
  const cachedResult = cache.get<Project>(cacheKey)

  if (cachedResult) {
    return cachedResult
  }

  const project = await getProjectRaw(slug)
  cache.set(cacheKey, project)

  return project
}
