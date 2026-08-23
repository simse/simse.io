import type { ImageMetadata } from "astro";
import { z } from "astro/zod";
import type { SchemaContext } from "astro:content";

export const titleLayouts = ["prominent", "subtle"] as const;
export const titleFontStyles = ["sans", "serif"] as const;
export const titlePositions = ["top", "bottom"] as const;

export type TitleLayout = (typeof titleLayouts)[number];
export type TitleFontStyle = (typeof titleFontStyles)[number];
export type TitlePosition = (typeof titlePositions)[number];

export const titleConfigSchema = ({ image }: Pick<SchemaContext, "image">) =>
  z.object({
    layout: z.enum(titleLayouts).default("prominent"),
    fontStyle: z.enum(titleFontStyles).default("sans"),
    position: z.enum(titlePositions).default("bottom"),
    image: image().optional(),
  });

export interface TitleConfig {
  layout?: TitleLayout;
  fontStyle?: TitleFontStyle;
  position?: TitlePosition;
  image?: ImageMetadata;
}
