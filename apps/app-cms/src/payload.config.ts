import { buildConfig } from 'payload/config';
import path from 'path';

// collections
import Users from './collections/Users';
import Articles from './collections/Articles';
import ArticleCategories from './collections/ArticleCategories';

export default buildConfig({
  serverURL: (process.env.NODE_ENV === "production") ? 'https://cms.simse.io' : 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Articles,
    ArticleCategories
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
