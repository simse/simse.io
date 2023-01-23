import { CollectionConfig } from 'payload/types';
import { createSlug } from '../hooks/slugFromName';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const ArticleCategories: CollectionConfig = {
  slug: 'article-categories',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    beforeChange: [createSlug]
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      admin: {
        readOnly: true
      }
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name'
    },
  ],
}

export default ArticleCategories;