import { swagger } from '@elysiajs/swagger'
import { getPosts, getPost } from '@lib/cms'
import { Elysia, t} from 'elysia'

const app = new Elysia()
  .get('/api/posts', async () => {
    return await getPosts()
  })
  .get(
    '/api/posts/:slug',
    async ({ params: { slug } }) => {
      return await getPost(slug)
    },
    {
      params: t.Object({
        slug: t.String()
      })
    }
  )

// @ts-ignore
app.use(
  swagger({
    path: '/api',
    documentation: {
      info: {
        title: 'simse.io API',
        description: 'Semi-private API used by simse.io',
        version: '1.0.0',
      },
    },
    exclude: ['/api', '/api/json'],
  }),
)

export default app

export type Server = typeof app