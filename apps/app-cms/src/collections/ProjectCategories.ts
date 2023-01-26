import { CollectionConfig } from 'payload/types';
import { createSlug } from '../hooks/slugFromName';
import { publicRead } from '../utils/publicRead';

const ProjectCategories: CollectionConfig = {
  slug: 'project-categories',
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
      name: 'plural',
      type: 'text',
      label: 'Plural'
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description'
    },
    {
      name: 'sort_hint',
      type: 'number',
      label: 'Sort Hint'
    },
  ],
}

export default ProjectCategories;