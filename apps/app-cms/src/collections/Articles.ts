import { CollectionConfig } from 'payload/types';
import { createSlug } from '../hooks/slugFromName';
import { summarise } from '../hooks/summarise';
import { triggerAfterChange } from '../hooks/triggerBuild';
import { publishedAt } from '../hooks/publishedAt';
import { publicReadPublished } from '../utils/publicReadPublished';

const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'name'
  },
  hooks: {
    beforeChange: [createSlug, summarise, publishedAt],
    afterChange: [triggerAfterChange]
  },
  access: {
    read: publicReadPublished
  },
  versions: {
    drafts: {
      autosave: true
    }
  },
  fields: [
    {
      name: 'published_at',
      type: 'date',
      label: 'Published At',
      admin: {
        position: 'sidebar',
        date: {
          displayFormat: "yyyy/MM/dd",
        }
      }
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Metadata',
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
            }
          ]
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              label: 'Editor',
              admin: {
                elements: [
                  'h1',
                  'h2',
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  // codeBlock,
                  'link',
                  'upload',
                  'ol',
                  'ul',
                  'relationship'
                ],
                leaves: [
                  'underline',
                  'bold',
                  'code',
                  'italic',
                  'strikethrough',
                ],
              }
            }
          ]
        }
      ]
    },
  ],
}

export default Articles;