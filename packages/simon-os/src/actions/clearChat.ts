import { defineAction } from "astro:actions";

export default defineAction({
	handler: async (_input, context) => {
		await context.session?.set("chatHistory", []);

		return {};
	},
});
