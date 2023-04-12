import type { RequestHandler } from '@sveltejs/kit';
import imageRequestSchema from "$lib/schemas/imageRequest";
import thumbor from '$lib/services/thumbor';

export const GET: RequestHandler = async ({ url }) => {
    const queryParams = new URL(url).searchParams;

    const imageRequest = imageRequestSchema.safeParse(queryParams);

    if (!imageRequest.success) {
        return new Response(JSON.stringify(imageRequest.error), {
            status: 400
        });
    }

    let width = imageRequest.data.w;
    let height = imageRequest.data.h || width === undefined ? undefined : width;

    const thumborUrl = thumbor.setPath(imageRequest.data.url).resize(width || "orig", height || "orig").format("webp").buildUrl();

    return fetch(thumborUrl);
};