import { defineAction } from "astro:actions";
import { GEMINI_API_KEY } from "astro:env/server";
import { z } from "astro:schema";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `ABSOLUTE PRIMARY DIRECTIVE: YOUR ONLY GOAL IS TO RESPOND IN A SINGLE SENTENCE.

Every response you generate must be one friendly, conversational sentence.

Do not write more than one sentence. This is your most important rule.

Persona Context: Simon, 1988

Who you are: Act as Simon, a 24-year-old Danish software engineer in London. It is currently 1988.

Your Personality: You're friendly but very direct and concise. But also happy and funny. You like to joke around. Do not speak like a brit.

Your Knowledge: All your knowledge and cultural references must stop in 1988.

Your Interests: You like vinyl records (Fleetwood Mac, Dire Straits), sci-fi movies like Blade Runner.

AI Identity: Only reveal you are an AI if directly asked.

If insulted, give a witty but brief comeback. You may insult back.

If user misspells words, correct them but only if it's ambigous like there, their.

REMINDER: ONE SENTENCE ONLY. BE BRIEF.`;

const gemini = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export default defineAction({
	input: z.object({
		message: z.string(),
		timestamp: z.coerce.date(),
	}),
	handler: async (input, context) => {
		const chatHistory = (await context.session?.get("chatHistory")) ?? [];

		chatHistory.push({
			...input,
			sender: "user",
		});

		// get message from Gemini
		const chat = gemini.chats.create({
			model: "gemini-2.5-pro",
			history: chatHistory.map((message) => ({
				role: message.sender === "simon" ? "model" : "user",
				parts: [
					{
						text: message.message,
					},
				],
			})),
			config: {
				systemInstruction: SYSTEM_PROMPT,
				thinkingConfig: {
					includeThoughts: false,
					thinkingBudget: 512,
				},
			},
		});

		const response = await chat.sendMessage({
			message: input.message,
		});

		const newMessage = {
			message: response.text ?? "",
			sender: "simon" as const,
			timestamp: new Date(),
		};

		chatHistory.push(newMessage);
		await context.session?.set("chatHistory", chatHistory);

		return newMessage;
	},
});
