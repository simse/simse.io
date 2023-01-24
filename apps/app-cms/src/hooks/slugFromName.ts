import { CollectionBeforeChangeHook } from 'payload/types';
import slugify from 'slugify';

export const createSlug: CollectionBeforeChangeHook = async ({
  data,
}) => {
    if (!data.slug) {
        data.slug = slugify(data.name, {
          lower: true
        });
    }

  return data; // Return data to either create or update a document with
}