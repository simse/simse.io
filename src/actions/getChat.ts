import { defineAction } from "astro:actions";

export default defineAction({
  handler: async (_input, context) => {
    return (
      (await context.session?.get("chatSession")) ?? {
        id: crypto.randomUUID(),
        history: [],
      }
    );
  },
});
