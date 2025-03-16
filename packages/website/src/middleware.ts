import { defineMiddleware } from 'astro/middleware'
import logger from './logger'

export const onRequest = defineMiddleware(async ({ request, url }, next) => {
  const startTime = performance.now()

  // Wait for the response from next middleware/page render
  const response = await next()

  const endTime = performance.now()
  const renderTime = endTime - startTime

  // Clone the response so we can modify headers
  const newResponse = new Response(response.body, response)

  // Add render time to response headers
  newResponse.headers.set(
    'Server-Timing',
    `render;dur=${renderTime.toFixed(2)}`,
  )

  logger.info(
    {
      renderTime,
      path: url.pathname,
      method: request.method,
      prefecthed:
        request.headers.has('Purpose') &&
        request.headers.get('Purpose') === 'prefetch',
    },
    'served page',
  )

  return newResponse
})
