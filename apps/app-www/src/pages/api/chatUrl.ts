import type { APIRoute } from 'astro';

export const get: APIRoute = async function get ({request}) {
    let url = 'wss://simse-io-service-chat-dev.sorensen.cloud';

    if (import.meta.env.DEV) {
        url = 'ws://localhost:4040';
    }

    return {
        body: JSON.stringify({
            url: url
        }),
    };
}