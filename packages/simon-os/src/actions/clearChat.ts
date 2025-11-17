import { defineAction } from "astro:actions";

export default defineAction({
	handler: async (_input, context) => {
		context.session?.set("chatSession", {
			id: crypto.randomUUID(),
			history: [],
		});

		context.session?.delete("chatHistory");

		return {};
	},
});
