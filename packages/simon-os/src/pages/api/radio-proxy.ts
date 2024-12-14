import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const metadata = await fetch("https://status.rcast.net/250933", {
		headers: {
			Origin: "https://players.rcast.net",
		},
	});
	const data = await metadata.text();

	return new Response(
		JSON.stringify({
			song: data,
		}),
	);
};
