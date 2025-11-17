/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import type { PostHog } from "posthog-js";

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

declare global {
	interface Window {
		posthog?: PostHog;
	}
}
