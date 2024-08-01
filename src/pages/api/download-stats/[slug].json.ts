import type { APIRoute } from "astro";

export const prerender = false;

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

  if (slug === "chronos") {
    const downloads = await getDockerhubDownloads("simsemand/chronos");

    return new Response(
      JSON.stringify({
        downloads: downloads,
      }),
    );
  }

  return new Response(
    JSON.stringify({
      error: `Could not fetch statistics for project with slug: ${slug}`,
    }),
    {
      status: 404,
    },
  );
};

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
