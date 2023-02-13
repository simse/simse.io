import { CollectionConfig } from 'payload/types';
import { createSlug } from '../hooks/slugFromName';
import { publicRead } from '../utils/publicRead';

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: publicRead
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
    {
      name: 'summary',
      type: 'text',
      label: 'Summary',
      admin: {
        description: 'quick one liner about the project'
      }
    },
    {
      name: 'language',
      type: 'relationship',
      relationTo: 'project-languages',
      label: 'Language',
      hasMany: true
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'project-categories',
      label: 'Category'
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Maintained',
          value: 'maintained'
        },
        {
          label: 'Security Fixes',
          value: 'security_fixes'
        },
        {
          label: 'Done',
          value: 'done'
        },
        {
          label: 'Archived',
          value: 'archived'
        },
        {
          label: 'Won\'t complete',
          value: 'wont_complete'
        }
      ],
      label: 'status'
    },
    {
      name: 'source_code',
      type: 'text',
      label: 'Source Code URL'
    },
    {
      name: 'demo',
      type: 'text',
      label: 'Demo URL'
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      label: 'Image'
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description'
    }
  ],
}

export default Projects;