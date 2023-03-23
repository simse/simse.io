import { CollectionBeforeChangeHook } from 'payload/types';
import slugify from 'slugify';

export const createSlug: CollectionBeforeChangeHook = async ({
  data,
}) => {
    if (!data.slug) {
      try {
        data.slug = slugify(data.name, {
          lower: true
        });
      } catch {
        // console.log("could not create slug at this time");
      }
    }

  return data; // Return data to either create or update a document with
}