import { getSanityFileUrl } from '@cms'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params }) => {
  const reference = params.reference

  if (!reference) {
    return new Response(
      JSON.stringify({
        error: 'Need reference to fetch data',
      }),
      {
        status: 400,
      },
    )
  }

  const datasetUrl = getSanityFileUrl(reference)
  const dataset = await fetch(datasetUrl)

  if (!dataset.ok) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch chart data',
      }),
      {
        status: 400,
      },
    )
  }

  return new Response(await dataset.text(), {
    headers: {
      'Content-Type': dataset.headers.get('Content-Type') || '',
    },
  })
}
