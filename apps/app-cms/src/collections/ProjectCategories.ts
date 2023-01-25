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
      name: 'description',
      type: 'text',
      label: 'Description'
    },
  ],
}

export default ProjectCategories;