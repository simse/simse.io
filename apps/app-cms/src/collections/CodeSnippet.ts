import { CollectionConfig } from 'payload/types';
import { createSlug } from '../hooks/slugFromName';
import { triggerAfterChange } from '../hooks/triggerBuild';
import { publicRead } from '../utils/publicRead';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const CodeSnippet: CollectionConfig = {
  slug: 'code-snippet',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: publicRead
  },
  hooks: {
    beforeChange: [createSlug],
    afterChange: [triggerAfterChange]
  },
  fields: [
    {
      name: 'Name',
      type: 'text',
      label: 'Name'
    },
    {
      name: 'language',
      type: 'text',
      label: 'Language'
    },
    {
      name: 'code',
      type: 'code',
      label: 'Code',
      required: true
    },
  ],
}

export default CodeSnippet;