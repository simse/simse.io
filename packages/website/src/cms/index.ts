import { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID } from 'astro:env/server'

export const getSanityFileUrl = (sanityFile: string): string => {
  const fileName = sanityFile.replace('file-', '').replace(/-(?=[^-]*$)/, '.')

  return `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/${SANITY_PROJECT_DATASET}/${fileName}`
}
