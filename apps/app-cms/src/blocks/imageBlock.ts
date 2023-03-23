import type { Block } from "payload/types";

const ImageBlock: Block = {
  slug: "image",
  fields: [
    {
      name: "media",
      type: "relationship",
      label: "Image",
      relationTo: "media",
      required: true,
    }
  ]
};

export default ImageBlock;