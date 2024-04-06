import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
    return fetch('https://radio.sorensen.engineer/api/live-info');
  };