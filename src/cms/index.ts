import { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID } from 'astro:env/server'
import { sanityClient } from 'sanity:client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityAsset } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(sanityClient)

export const getSanityFileUrl = (sanityFile: string): string => {
  let fileName = sanityFile.replace('file-', '').replace(/-(?=[^-]*$)/, '.')

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
