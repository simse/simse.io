import { sanityClient } from 'sanity:client'
import { type InferType, q } from 'groqd'
import { projectFields } from './common'

const { query: allProjectsQuery, schema: allProjectsSchema } = q('*')
  .filter("_type == 'project' && defined(slug)")
  .order('publishedAt desc')
  .grab(projectFields)

export const getProjects = async () => {
  return allProjectsSchema.parse(await sanityClient.fetch(allProjectsQuery))
}

export const getProject = async (slug: string): Promise<Project | null> => {
  const { query: projectQuery, schema: projectSchema } = q('*')
    .filter(`_type == 'project' && slug.current == '${slug}'`)
    .order('publishedAt desc')
    .grab(projectFields)

  const sanityResponse = await sanityClient.fetch(projectQuery)
  const parsedResponse = projectSchema.parse(sanityResponse)

  if (!parsedResponse.length) {
    return null
  }

  return parsedResponse[0]
}

export type Project = InferType<typeof allProjectsSchema>[0]
