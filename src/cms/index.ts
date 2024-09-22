import { sanityClient } from 'sanity:client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityAsset } from '@sanity/image-url/lib/types/types'
import { type InferType, nullToUndefined, q } from 'groqd'

const builder = imageUrlBuilder(sanityClient)

export const getSanityFileUrl = (
  sanityFile: string,
  projectId = 'rjqusm5i',
): string => {
  const dataset = import.meta.env.PROD ? 'production' : 'test'
  let fileName = sanityFile.replace('file-', '').replace(/-(?=[^-]*$)/, '.')

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileName}`
}

interface Image {
  alt: string
  caption?: string
  asset: SanityAsset
}

interface SanityWorkExperience {
  slug: {
    current: string
  }
  title: string
  officialTitle: string
  location: string
  details: any
  employer: string
  employerLogo?: SanityAsset
  startDate: string
  endDate?: string
}

interface WorkExperience {
  slug: string
  title: string
  officialTitle: string
  location: string
  details: any
  employer: string
  employerLogo?: string
  startDate: Date
  endDate?: Date
}

const contentBlocks = q
  .union([
    q.contentBlock(),
    q.object({
      _type: q.literal('break'),
      style: q.string(),
    }),
    q.object({
      _type: q.literal('codeBlock'),
      sourceCode: q.string(),
      language: q.string(),
    }),
    q.object({
      _type: q.literal('image'),
      asset: q.object({
        _ref: q.string(),
      }),
    }),
    q.object({
      _type: q.literal('graphBlock'),
      type: q.literal('line'),
      datasets: q.object({
        asset: q.object({
          _ref: q.string(),
        }),
        _type: q.literal('file'),
      }),
      title: q.string(),
    }),
    q.object({
      _type: q.literal('terminalRecordingBlock'),
      title: q.string(),
      cast_file: q.object({
        asset: q.object({
          _ref: q.string(),
        }),
        _type: q.literal('file'),
      }),
    }),
  ])
  .array()

const { query: postsQuery, schema: postsSchema } = q('*')
  .filter("_type == 'post' && defined(slug)")
  .order('publishedAt desc')
  .grab({
    _type: q.string(),
    title: q.string(),
    slug: q.slug('slug'),
    excerpt: nullToUndefined(q.string().optional()),
    image: nullToUndefined(
      q
        .object({
          asset: q.object({
            _ref: q.string(),
          }),
          caption: q.string().optional(),
          alt: q.string(),
        })
        .optional(),
    ),
    published: q.date(),
    content: contentBlocks,
    tags: nullToUndefined(q.string().array().optional()),
  })

const { query: projectsQuery, schema: projectsSchema } = q('*')
  .filter("_type == 'project' && defined(slug)")
  .order('publishedAt desc')
  .grab({
    _type: q.string(),
    title: q.string(),
    description: q.string(),
    featured: nullToUndefined(q.boolean().default(false)),
    slug: q.slug('slug'),
    icon: nullToUndefined(
      q
        .object({
          asset: q.object({
            _ref: q.string(),
          }),
        })
        .optional(),
    ),
    published: q.date(),
    details: nullToUndefined(contentBlocks.optional()),
    languages: nullToUndefined(q.string().array().optional()),
    technologies: nullToUndefined(q.string().array().optional()),
    sourceCode: nullToUndefined(q.string().optional()),
    demo: nullToUndefined(q.string().optional()),
    type: q.string(),
    images: nullToUndefined(
      q
        .object({
          alt: q.string().optional(),
          caption: q.string().optional(),
          asset: q.object({
            _ref: q.string(),
          }),
        })
        .array()
        .optional(),
    ),
  })

const getPosts = async () => {
  const sanityResponse = await sanityClient.fetch(postsQuery)

  return postsSchema.parse(sanityResponse)
}

const transformWorkExperience = (
  workExperience: SanityWorkExperience,
): WorkExperience => {
  const convertedWorkExperience: WorkExperience = {
    ...workExperience,
    employerLogo: undefined,
    slug: workExperience.slug.current,
    startDate: new Date(workExperience.startDate),
    endDate: workExperience.endDate
      ? new Date(workExperience.endDate)
      : undefined,
  }

  if (workExperience.employerLogo) {
    convertedWorkExperience.employerLogo = builder
      .image(workExperience.employerLogo)
      .width(64)
      .height(64)
      .url()
  }

  return convertedWorkExperience
}

const getWorkExperiences = async (): Promise<WorkExperience[]> => {
  const rawWorkExperiences = await sanityClient.fetch<SanityWorkExperience[]>(
    `*[_type == "experience" && defined(slug)] | order(startDate desc)`,
  )

  return rawWorkExperiences.map((workExperience) =>
    transformWorkExperience(workExperience),
  )
}

const getImageBuilder = (image: any) => {
  return builder.image(image)
}

const getProjects = async () => {
  return projectsSchema.parse(await sanityClient.fetch(projectsQuery))
}

const getWorkExperienceBySlug = async (
  slug: string,
): Promise<WorkExperience> => {
  const rawWorkExperiences = await sanityClient.fetch<SanityWorkExperience[]>(
    `*[_type == "experience" && slug.current == "${slug}"]`,
  )

  if (rawWorkExperiences.length < 1) {
    throw Error('work experience with slug: ' + slug + ' not found')
  }

  return transformWorkExperience(rawWorkExperiences[0])
}

export {
  getPosts,
  getProjects,
  getImageBuilder,
  getWorkExperiences,
  getWorkExperienceBySlug,
}

type Post = InferType<typeof postsSchema>[0]
type Project = InferType<typeof projectsSchema>[0]

export type { Post, Project, WorkExperience, Image }
