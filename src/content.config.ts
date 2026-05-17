import { z } from "astro/zod";
import { defineCollection } from "astro:content";

import { titleConfigSchema } from "./components/cards/primitives/titleConfig";
import { thingsLoader } from "./loaders/things";

const imageMetaSchema = z
  .object({
    placeholder: z.string(),
    contrastTop: z.enum(["light", "dark"]),
    contrastBottom: z.enum(["light", "dark"]),
  })
  .optional();

const things = defineCollection({
  loader: thingsLoader(),
  schema: ({ image }) =>
    z.object({
      type: z.enum(["project", "hobby", "former_hobby", "writing", "other"]),
      href: z.string().optional(),
      title: z.string().optional(),
      titleConfig: titleConfigSchema({ image }).optional(),
      description: z.string().optional(),
      updatedDate: z.coerce.date().optional(),
      backgroundImage: image().optional(),
      backgroundImageMeta: imageMetaSchema,
      screenshotImage: image().optional(),
      screenshotImageMeta: imageMetaSchema,
      size: z
        .union([z.literal(1), z.literal(2)])
        .default(1),
    }),
});

export const collections = { things };
