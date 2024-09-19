import { defineConfig, defineField, defineType } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

const breakBlock = defineType({
  name: 'break',
  type: 'object',
  title: 'Break',
  fields: [
    {
      name: 'style',
      type: 'string',
      title: 'Break style',
      options: {
        list: [{ title: 'Line break', value: 'lineBreak' }],
      },
      initialValue: 'lineBreak',
    },
  ],
})

const codeBlock = defineType({
  name: 'codeBlock',
  type: 'object',
  title: 'Code Block',
  fields: [
    {
      name: 'language',
      type: 'string',
      title: 'Language',
      options: {
        list: [
          { title: 'Typescript', value: 'ts' },
          { title: 'Javascript', value: 'js' },
        ],
      },
      initialValue: 'ts',
    },
    {
      name: 'sourceCode',
      type: 'text',
      title: 'Source Code',
    },
  ],
})

const graphBlock = defineType({
  name: 'graphBlock',
  type: 'object',
  title: 'Graph',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'type',
      type: 'string',
      options: {
        list: [
          {
            title: 'Line Graph',
            value: 'line',
          }
        ]
      }
    },
    {
      name: 'datasets',
      type: 'file',
    }
  ],
})

const postType = defineType({
  name: 'post',
  title: 'Posts',
  type: 'document',
  groups: [
    {
      title: 'Post',
      name: 'post',
      default: true,
    },
    {
      title: 'SEO',
      name: 'seo',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'post',
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'post',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'post',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'post',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'post',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        { type: 'break' },
        { type: 'codeBlock' },
        { type: 'graphBlock' },
      ],
      group: 'post',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'seo',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 200,
      },
    }),
  ],
})

const projectType = defineType({
  type: 'document',
  name: 'project',
  title: 'Projects',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: "Featured",
      type: 'boolean',
      description: "Whether this project should be prominently featured"
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }
      ],
    }),
    defineField({
      title: 'Type',
      // description: "Pick the format of your post",
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Library', value: 'library' },
          { title: 'Application', value: 'application' },
          { title: 'Website', value: 'website' },
          { title: 'Experiment', value: 'experiment' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'sourceCode',
      title: 'Source code',
      type: 'url',
    }),
    defineField({
      name: 'demo',
      title: 'Demo',
      type: 'url',
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        { type: 'break' },
        { type: 'codeBlock' },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 200,
      },
    }),
  ],
})

const experienceType = defineType({
  type: 'document',
  name: 'experience',
  title: 'Work Experiences',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'officialTitle',
      title: 'Official Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employer',
      title: 'Employer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employerLogo',
      title: 'Employer Logo',
      type: 'image',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }, { type: 'break' }],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 200,
      },
    }),
  ],
})

export default defineConfig({
  name: 'simse-io',
  title: 'simse.io',
  projectId: 'rjqusm5i',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [postType, projectType, experienceType, breakBlock, codeBlock, graphBlock],
  },
})
