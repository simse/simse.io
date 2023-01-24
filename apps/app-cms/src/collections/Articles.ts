import { CollectionConfig } from 'payload/types';
import { createSlug } from '../hooks/slugFromName';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title'
  },
  hooks: {
    beforeChange: [createSlug]
  },
  versions: {
    drafts: true
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
      label: 'Title'
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle'
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'article-categories',
      label: 'Categories',
      hasMany: true
    },
    {
      name: 'featured_image',
      label: 'Featured Image',
      type: 'group',
      fields: [
        {
          name: 'media',
          type: 'relationship',
          relationTo: 'media',
          label: 'Image'
        },
        {
          name: 'credit',
          type: 'text',
          label: 'Credit'
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt'
        },
      ]
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Article Content'
    }
  ],
}

export default Articles;