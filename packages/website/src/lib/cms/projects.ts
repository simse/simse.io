import { type InferType, q } from 'groqd'
import client from './client'
import { assetRefToImage, projectFields } from './common'
import type { Image } from './types'

const { query: allProjectsQuery, schema: allProjectsSchema } = q('*')
  .filter("_type == 'project' && defined(slug)")
  .order('publishedAt desc')
  .grab(projectFields)

export const transformProject = (rawProject: SanityProject): Project => {
  let image: Image | undefined = undefined

  if (rawProject.images && rawProject.images.length > 0) {
    const { asset, alt, caption } = rawProject.images[0]

    image = assetRefToImage(asset._ref, alt || '', caption)
  }

  return {
    ...rawProject,
    image,
    url: rawProject.sourceCode || rawProject.demo || `/${rawProject.slug}`,
  }
}

export const getProjects = async () => {
  return allProjectsSchema
    .parse(await client.fetch(allProjectsQuery))
    .map((project) => transformProject(project))
}

export const getProject = async (slug: string): Promise<Project | null> => {
  const { query: projectQuery, schema: projectSchema } = q('*')
    .filter(`_type == 'project' && slug.current == '${slug}'`)
    .order('publishedAt desc')
    .grab(projectFields)

  const sanityResponse = await client.fetch(projectQuery)
  const parsedResponse = projectSchema.parse(sanityResponse)

  if (!parsedResponse.length) {
    return null
  }

  return transformProject(parsedResponse[0])
}

export type SanityProject = InferType<typeof allProjectsSchema>[0]
export type Project = SanityProject & {
  image?: Image
  url: string
}
