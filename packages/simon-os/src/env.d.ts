/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
	interface SessionData {
		chatHistory: {
			message: string;
			sender: "user" | "simon";
			timestamp: Date;
		}[];
	}
}
