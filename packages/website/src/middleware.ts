import { defineMiddleware } from 'astro/middleware'

export const onRequest = defineMiddleware(async ({ request }, next) => {
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

  // Log render time (optional)
  // console.log(`Page render time: ${renderTime.toFixed(2)}ms`);

  return newResponse
})
