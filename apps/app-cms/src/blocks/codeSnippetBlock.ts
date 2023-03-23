import type { Block } from "payload/types";

const CodeSnippetBlock: Block = {
  slug: "codeSnippet",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title/Filename",
    },
    {
      name: "code",
      type: "code",
      label: "Code",
      required: true,
    },
    {
      name: "language",
      type: "text",
      label: "Language",
      admin: {
        description: 'can be left empty :)'
      }
    },
    {
      name: "highlightedLines",
      type: "text",
      label: "Highlighted Lines",
      admin: {
        description: 'comma separated list of line numbers to highlight. e.g. 1,2,3,4,5'
      }
    }
  ]
};

export default CodeSnippetBlock;