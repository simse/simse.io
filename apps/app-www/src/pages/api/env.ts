import type { APIRoute } from 'astro';

export const get: APIRoute = async function get () {
    return {
        body: JSON.stringify({
            SERVICE_CHAT_URL: process.env.SERVICE_CHAT_URL
        }),
    };
}