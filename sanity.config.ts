import { defineConfig, defineField, defineType } from "sanity";
import { structureTool } from "sanity/structure";

const breakBlock = defineType({
  name: "break",
  type: "object",
  title: "Break",
  fields: [
    {
      name: "style",
      type: "string",
      title: "Break style",
      options: {
        list: [
          { title: "Line break", value: "lineBreak" },
        ]
      },
      initialValue: "lineBreak"
    }
  ]
})

const postType = defineType({
  name: "post",
  title: "Post",
  type: 'document',
  groups: [
    {
      title: "Post",
      name: "post",
      default: true
    },
    {
      title: "SEO",
      name: "seo"
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "post",
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      group: "post",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "post",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "post",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      group: "post",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        { type: "image" },
        { type: "break" }
      ],
      group: "post",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "seo",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 200,
      },
    }),
  ]
});

export default defineConfig({
  name: "simse-io",
  title: "simse.io",
  projectId: "rjqusm5i",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: [
      postType,
      breakBlock
    ],

  },
});
