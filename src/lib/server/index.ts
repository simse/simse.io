import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { getPost, getPosts, getProject, getProjects } from '@lib/cms'
import { Elysia, t } from 'elysia'

const app = new Elysia()
  .use(
    cors({
      origin: ['http://localhost:4321', 'https://os.simse.io', 'https://simse.io'],
    }),
  )
  .use(
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
  // posts
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
        slug: t.String(),
      }),
    },
  )
  // projects
  .get('/api/projects', getProjects)
  .get('/api/projects/:slug', async ({ params: { slug } }) => getProject(slug))

export default app

export type Server = typeof app
