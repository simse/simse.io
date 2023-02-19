import { CollectionConfig, CollectionBeforeChangeHook  } from 'payload/types';
import { publicRead } from '../utils/publicRead';
import { getIncomingFiles } from '../utils/getIncomingFiles';
import FormData from 'form-data';
import axios from 'axios';
import { triggerAfterChange } from '../hooks/triggerBuild';

const forwardToCloudflareImages: CollectionBeforeChangeHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
  originalDoc, // original document
}) => {
  req.payload.logger.info('Forwarding image to Cloudflare Images')

  try {
    const files = getIncomingFiles({ req, data });
    req.payload.logger.info(`Uploading file...`)

    const form = new FormData();
    form.append('file', files[0].buffer);

    const resp = await axios.post(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_IMAGES_ACCOUNT_ID}/images/v1`, form, {
      headers: {
        "Authorization": `Bearer ${process.env.CLOUDFLARE_IMAGES_TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    });

    data.cloudflareImageId = resp.data['result']['id'];
  } catch (err: unknown) {
    req.payload.logger.error(
      `There was an error while uploading files corresponding to the collection Images with filename ${data.filename}:`,
    )
    req.payload.logger.error(err)
  }

  return data; // Return data to either create or update a document with
}


const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: publicRead
  },
  hooks: {
    beforeChange: [forwardToCloudflareImages],
    afterChange: [triggerAfterChange]
  },
  upload: {
    staticURL: '/images',
    staticDir: 'images',
    disableLocalStorage: true,
    adminThumbnail: ({doc}) => {
      return `https://imagedelivery.net/${process.env.PAYLOAD_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH}/${doc.cloudflareImageId}/thumbnail`
    },
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      type: 'text',
      name: 'alt',
      label: 'Alt'
    },
    {
      type: 'text',
      name: 'credit',
      label: 'Credit'
    },
    {
      type: 'text',
      name: 'cloudflareImageId',
      admin: {
        readOnly: true
      }
    }
  ]
}

export default Media;