import type { Block } from "payload/types";

const EmailBlock: Block = {
  slug: "email",
  fields: [
    {
      name: "from",
      type: "text",
      label: "From",
      required: true,
    },
    {
      name: "to",
      type: "text",
      label: "To",
      required: true,
    },
    {
      name: "subject",
      type: "text",
      label: "Subject",
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: {
        date: {
          displayFormat: "yyyy/MM/dd HH:mm",
          pickerAppearance: 'dayAndTime'
        }
      }
    },
    {
      name: "body",
      type: "richText",
      label: "Body",
      required: true,
      admin: {
        elements: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'link',
          'ol',
          'ul'
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
};

export default EmailBlock;