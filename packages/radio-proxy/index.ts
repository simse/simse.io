import type { ServerWebSocket } from "bun";

const intervalMap = new Map();
const lastEmittedSong = new Map();

setInterval(() => {
	updateCurrentlyPlaying();
}, 2000);

let currentlyPlaying = "";

const updateCurrentlyPlaying = async () => {
	if (intervalMap.size === 0) {
		console.log("skipping currently playing check due to no connected clients");
		return;
	}

	const metadata = await fetch("https://status.rcast.net/250933", {
		headers: {
			Origin: "https://players.rcast.net",
		},
	});
	const data = await metadata.text();

	currentlyPlaying = data;
};

updateCurrentlyPlaying();

const CORS_HEADERS = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "OPTIONS, POST",
		"Access-Control-Allow-Headers": "Content-Type",
	},
};

Bun.serve({
	async fetch(req, server) {
		const url = new URL(req.url);

		if (url.pathname === "/currently-playing") {
			if (
				server.upgrade(req, {
					...CORS_HEADERS,
				})
			)
				return;
		}

		if (url.pathname === "/up") return new Response("OK");

		if (url.pathname === "/stream") {
			try {
				const audioResponse = await fetch(
					"https://80.streeemer.com/listen/80s/radio.mp3",
				);

				if (!audioResponse.ok) {
					return new Response(
						`Failed to fetch audio: ${audioResponse.status} ${audioResponse.statusText}`,
						{ status: audioResponse.status },
					);
				}

				// Create a new response, copying headers and body
				const proxiedResponse = new Response(audioResponse.body, {
					status: audioResponse.status,
					statusText: audioResponse.statusText,
					headers: {
						...audioResponse.headers, // Forward headers
						...CORS_HEADERS.headers,
					},
				});

				return proxiedResponse;
			} catch (error) {
				console.error("Error proxying audio:", error);
				return new Response("Internal server error", { status: 500 });
			}
		}

		return new Response("Not Found", { status: 404 });
	},

	websocket: {
		open(ws: ServerWebSocket) {
			updateCurrentlyPlaying();

			intervalMap.set(
				ws,
				setInterval(() => {
					// only send updates
					if (lastEmittedSong.get(ws) !== currentlyPlaying) {
						ws.send(currentlyPlaying);
						lastEmittedSong.set(ws, currentlyPlaying);
					}
				}, 500),
			);
		},
		close(ws: ServerWebSocket) {
			clearInterval(intervalMap.get(ws));
			intervalMap.delete(ws);
			lastEmittedSong.delete(ws);
			console.log("cleared interval");
		},
		message(_: ServerWebSocket, message: string) {
			console.log(`received message: ${message}`);
		},
	},
});
