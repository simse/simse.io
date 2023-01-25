import { CollectionConfig } from 'payload/types';
import { createSlug } from '../hooks/slugFromName';
import { publicRead } from '../utils/publicRead';

const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'name'
  },
  hooks: {
    beforeChange: [createSlug]
  },
  access: {
    read: publicRead
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