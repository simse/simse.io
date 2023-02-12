import { buildConfig } from 'payload/config';
import path from 'path';

// collections
import Users from './collections/Users';
import Articles from './collections/Articles';
import ArticleCategories from './collections/ArticleCategories';
import Media from './collections/Media';
import Projects from './collections/Projects';
import ProjectCategories from './collections/ProjectCategories';
import ProjectLanguages from './collections/ProjectLanguages';

export default buildConfig({
  serverURL: process.env.PAYLOAD_SERVER_URL,
  admin: {
    user: Users.slug,
    webpack: (config) => {
      // Do something with the config here
      config.resolve.alias['process'] = 'process/browser';

      return config;
    }
  },
  collections: [
    Users,
    Articles,
    ArticleCategories,
    Media,
    Projects,
    ProjectCategories,
    ProjectLanguages
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
