import { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID } from 'astro:env/server'
import client from '@lib/cms/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityAsset } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

export const getSanityFileUrl = (sanityFile: string): string => {
  const fileName = sanityFile.replace('file-', '').replace(/-(?=[^-]*$)/, '.')

  return `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/${SANITY_PROJECT_DATASET}/${fileName}`
}

interface Image {
  alt: string
  caption?: string
  asset: SanityAsset
}

const getImageBuilder = (image: any) => {
  return builder.image(image)
}

export { getImageBuilder }

export type { Image }
