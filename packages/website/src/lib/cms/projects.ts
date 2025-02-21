import { imageUrlFromAssetRef } from '@lib/image'
import { type InferType, q } from 'groqd'
import client from './client'
import { projectFields } from './common'
import type { Image } from './types'

const { query: allProjectsQuery, schema: allProjectsSchema } = q('*')
  .filter("_type == 'project' && defined(slug)")
  .order('publishedAt desc')
  .grab(projectFields)

export const transformProject = (rawProject: SanityProject): Project => {
  let image: Image | undefined = undefined

  if (rawProject.images && rawProject.images.length > 0) {
    image = {
      alt: rawProject.images[0].alt,
      caption: rawProject.images[0].caption,
      src: imageUrlFromAssetRef(rawProject.images[0].asset._ref, {
        width: 1200,
        height: 900,
        resize_type: 'fill',
      }),
      srcset: [],
    }
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
