import { PEPY_API_KEY } from "astro:env/server"
import type { APIRoute } from "astro";
import TTLCache from '@isaacs/ttlcache';

export const prerender = false;

const cache = new TTLCache({ max: 10000, ttl: 60 * 60 * 1000 });

export const GET: APIRoute = async ({ params, request }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response(
      JSON.stringify({
        error: "Missing project slug",
      }),
      {
        status: 400,
      },
    );
  }

  const downloads = await getDownloadsCached(slug);

  if (!downloads) {
    return new Response(
        JSON.stringify({
          error: `Could not fetch statistics for project with slug: ${slug}`,
        }),
        {
          status: 404,
        },
    );
  }

  return new Response(
      JSON.stringify({
        downloads: downloads,
      }),
  );
};

const getDownloadsCached = async (identifier: string) => {
  if (cache.has(identifier)) {
    return cache.get<number>(identifier);
  }

  const downloads = await getDownloads(identifier);
  if (downloads && downloads !== 0) {
    cache.set(identifier, downloads);
  }

  return downloads;
}

const getDownloads = async (identifier: string) => {
  if (identifier === "chronos") {
    return getDockerhubDownloads("simsemand/chronos");
  }
  if (identifier === 'pymitv') {
    return getPypiDownloads('pymitv');
  }

  return undefined;
}

const getDockerhubDownloads = async (identifier: string): Promise<number> => {
  const response = await fetch(
    `https://hub.docker.com/v2/repositories/${identifier}`,
  );

  if (!response.ok) {
    return 0;
  }

  const parsedResponse = await response.json();
  return parsedResponse.pull_count as number;
};

const getPypiDownloads = async (identifier: string): Promise<number> => {
  const response = await fetch(
      `https://api.pepy.tech/api/v2/projects/${identifier}`,
      {
        headers: {
          'x-api-key': PEPY_API_KEY
        }
      }
  );

  if (!response.ok) {
    return 0;
  }

  const parsedResponse = await response.json();
  return parsedResponse.total_downloads as number;
}