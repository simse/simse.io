import { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID } from 'astro:env/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_PROJECT_DATASET,
  useCdn: true,
  apiVersion: '2023-05-03',
})

export default client
