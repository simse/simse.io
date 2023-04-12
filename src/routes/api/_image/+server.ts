import type { RequestHandler } from '@sveltejs/kit';
import imageRequestSchema from "$lib/schemas/imageRequest";

export const GET: RequestHandler = async ({ url }) => {
    const queryParams = new URL(url).searchParams;

    const imageRequest = imageRequestSchema.safeParse(queryParams);

    if (!imageRequest.success) {
        return new Response(JSON.stringify(imageRequest.error), {
            status: 400
        });
    }

    let width = imageRequest.data.w || 0;
    let height = imageRequest.data.h || width === 0 ? 0 : width;

    const thumborUrl = `https://image.sorensen.cloud/unsafe/${width}x${height}/filters:format(webp):quality(${imageRequest.data.q || 80})/${imageRequest.data.url}`;

    return fetch(thumborUrl);
};