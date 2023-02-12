import { CollectionConfig } from 'payload/types';
import { createSlug } from '../hooks/slugFromName';
import { publicRead } from '../utils/publicRead';
import { summarise } from '../hooks/summarise';

const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'name'
  },
  hooks: {
    beforeChange: [createSlug, summarise]
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
        description: 'this field is programmatically set. careful!'
      }
    },
    {
      name: 'name',
      type: 'text',
      label: 'Title',
      required: true
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle'
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Summary',
      admin: {
        description: 'AI generated summary'
      }
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'article-categories',
      label: 'Categories',
      hasMany: true,
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      label: 'Featured Image'
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Article Content'
    }
  ],
}

export default Articles;