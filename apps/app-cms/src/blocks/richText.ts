import type { Block } from "payload/types";

const RichTextBlock: Block = {
    slug: "richText",
    fields: [
        {
            name: "richText",
            type: "richText",
            label: "Rich Text",
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
        },
    ]
};

export default RichTextBlock;