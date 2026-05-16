/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
	interface SessionData {
		// @deprecated
		chatHistory: {
			message: string;
			sender: "user" | "simon";
			timestamp: Date;
		}[];
		chatSession: {
			id: string;
			history: {
				message: string;
				sender: "user" | "simon";
				timestamp: Date;
			}[];
		};
	}
}

declare const __APP_VERSION__: string
