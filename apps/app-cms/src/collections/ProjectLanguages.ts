import { CollectionConfig } from 'payload/types';
import { createSlug } from '../hooks/slugFromName';
import { publicRead } from '../utils/publicRead';

const ProjectLanguages: CollectionConfig = {
  slug: 'project-languages',
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
      label: 'Name',
      required: true
    },
    {
      name: 'colour',
      type: 'text',
      label: 'Colour',
      required: true
    },
    {
      name: 'text_colour',
      type: 'text',
      label: 'Text Colour',
      required: true
    },
  ],
}

export default ProjectLanguages;