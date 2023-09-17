export async function onRequest(context) {
    const { searchParams } = new URL(context.request.url)
    let assetId = searchParams.get('assetId');

    if (!assetId) {
        return new Response('assetId is required', { status: 400 });
    }

    const image = await fetch(`https://img.0x1.earth/api/asset/file/${assetId}?isThumb=true`, {
        method: 'GET',
        headers: {
            'x-api-key': context.env.IMMICH_API_KEY
        }
    });

    if (image.status !== 200) {
        return new Response('image not found', { status: 404 });
    }

    return image
}