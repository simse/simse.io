import { CollectionConfig } from 'payload/types';
import { publicRead } from '../utils/publicRead';

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: publicRead
  },
  upload: {
    staticURL: '/media',
    staticDir: '/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*']
  },
  fields: []
}

export default Media;