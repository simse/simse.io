import { CollectionBeforeChangeHook } from 'payload/types';


export const publishedAt: CollectionBeforeChangeHook = async ({
    data,
}) => {
    if (data._status === 'published' && !data.published_at) {
        data.published_at = new Date().toISOString();
    }

    return data; // Return data to either create or update a document with
}