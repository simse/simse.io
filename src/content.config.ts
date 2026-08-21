import { file } from "astro/loaders";
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
      type: z.enum(["project", "hobby", "former_hobby", "writing", "musing", "other"]),
      href: z.string().optional(),
      title: z.string().optional(),
      titleConfig: titleConfigSchema({ image }).optional(),
      description: z.string().optional(),
      lastUpdated: z.coerce.date().optional(),
      backgroundImage: image().optional(),
      backgroundImageMeta: imageMetaSchema,
      animatedBackground: z
        .object({
          src: z.string(),
          autoplay: z.boolean().default(false),
          resetOnLeave: z.boolean().default(false),
          loop: z.boolean().default(true),
        })
        .optional(),
      contrastTop: z.enum(["light", "dark"]).optional(),
      contrastBottom: z.enum(["light", "dark"]).optional(),
      screenshotImage: image().optional(),
      screenshotImageMeta: imageMetaSchema,
      size: z.union([z.literal(1), z.literal(2)]).default(1),
    }),
});

const wallpapers = defineCollection({
  loader: file("src/data/wallpapers.yml"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    contrastColour: z.string(),
    image: z.object({
      src: z.string(),
      repeat: z.string().optional(),
      size: z.string().optional(),
    }),
  }),
});

const music = defineCollection({
  loader: file("src/data/music.yml"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    artist: z.string(),
    url: z.string(),
  }),
});

export const collections = { things, wallpapers, music };
