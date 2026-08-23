import { promises as fs } from "node:fs";
import path from "node:path";

import { glob } from "astro/loaders";
import type { Loader } from "astro/loaders";
import { marked } from "marked";
import sharp from "sharp";
import { decode, encode } from "splathash-ts";

// Astro stores image() fields in the content data store as `__ASTRO_IMAGE_<path>`,
// where <path> is relative to the entry's source file. We unwrap that to read the
// actual pixels at build time.
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

const TOP_BAND_FRACTION = 0.2;
const BOTTOM_BAND_FRACTION = 0.4;

type Contrast = "light" | "dark";

interface ImageMeta {
  placeholder: string;
  contrastTop: Contrast;
  contrastBottom: Contrast;
}

/**
 * Wraps the glob loader for `things` so each entry gets `<field>Meta` fields
 * containing a splathash placeholder (data URL) and per-region contrast hints
 * for any `backgroundImage` / `screenshotImage` it references.
 */
export function thingsLoader(): Loader {
  const inner = glob({ base: "./src/content", pattern: "**/*.mdoc" });
  return {
    name: "things-loader",
    load: async (ctx) => {
      await inner.load(ctx);

      for (const [id, entry] of ctx.store.entries()) {
        if (!entry.filePath) continue;
        const enriched = await enrichEntryData(entry.data, entry.filePath, ctx.logger);
        if (enriched === entry.data) continue;

        // store.set() short-circuits when the new entry's digest equals the existing
        // one, so we delete first to bypass that and preserve the glob-assigned digest.
        ctx.store.delete(id);
        ctx.store.set({ ...entry, id, data: enriched });
      }
    },
  };
}

async function enrichEntryData(
  data: Record<string, unknown>,
  entryFilePath: string,
  logger: { warn: (message: string) => void },
): Promise<Record<string, unknown>> {
  let next: Record<string, unknown> | null = null;

  for (const field of ["backgroundImage", "screenshotImage"] as const) {
    const value = data[field];
    if (typeof value !== "string" || !value.startsWith(IMAGE_IMPORT_PREFIX)) continue;

    const imagePath = resolveImagePath(value, entryFilePath);
    try {
      const meta = await imageMetaFor(imagePath);
      const existing = data[`${field}Meta`] as ImageMeta | undefined;
      if (!metaEqual(existing, meta)) {
        next ??= { ...data };
        next[`${field}Meta`] = meta;
      }
    } catch (error) {
      logger.warn(`things-loader: failed to compute meta for ${imagePath}: ${error}`);
    }
  }

  if (typeof data.description === "string") {
    const html = await marked.parseInline(data.description);
    if (html !== data.description) {
      next ??= { ...data };
      next.description = html;
    }
  }

  return next ?? data;
}

function resolveImagePath(prefixedValue: string, entryFilePath: string): string {
  const relativeToEntry = prefixedValue.slice(IMAGE_IMPORT_PREFIX.length);
  const entryDir = path.dirname(path.resolve(process.cwd(), entryFilePath));
  return path.resolve(entryDir, relativeToEntry);
}

const cache = new Map<string, { mtimeMs: number; meta: ImageMeta }>();

async function imageMetaFor(imagePath: string): Promise<ImageMeta> {
  const { mtimeMs } = await fs.stat(imagePath);
  const cached = cache.get(imagePath);
  if (cached?.mtimeMs === mtimeMs) return cached.meta;

  const meta = await computeImageMeta(imagePath);
  cache.set(imagePath, { mtimeMs, meta });
  return meta;
}

async function computeImageMeta(imagePath: string): Promise<ImageMeta> {
  const { width, height } = await sharp(imagePath).metadata();
  if (!width || !height) throw new Error(`Could not read dimensions of ${imagePath}`);

  const topHeight = Math.max(1, Math.floor(height * TOP_BAND_FRACTION));
  const bottomHeight = Math.max(1, Math.floor(height * BOTTOM_BAND_FRACTION));

  return {
    placeholder: await splathashDataUrl(imagePath),
    contrastTop: await contrastForRegion(imagePath, { top: 0, height: topHeight, width }),
    contrastBottom: await contrastForRegion(imagePath, {
      top: height - bottomHeight,
      height: bottomHeight,
      width,
    }),
  };
}

async function splathashDataUrl(imagePath: string): Promise<string> {
  const { data, info } = await sharp(imagePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const hash = encode(new Uint8ClampedArray(data), info.width, info.height);
  const decoded = decode(hash);
  const png = await sharp(Buffer.from(decoded.rgba), {
    raw: { width: decoded.width, height: decoded.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

async function contrastForRegion(
  imagePath: string,
  region: { top: number; height: number; width: number },
): Promise<Contrast> {
  const [r, g, b] = await sharp(imagePath)
    .extract({ left: 0, top: region.top, width: region.width, height: region.height })
    .resize(1, 1, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer();
  return relativeLuminance(r, g, b) > 0.5 ? "dark" : "light";
}

function relativeLuminance(r: number, g: number, b: number): number {
  const linear = (channel: number) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

function metaEqual(a: ImageMeta | undefined, b: ImageMeta): boolean {
  return (
    !!a &&
    a.placeholder === b.placeholder &&
    a.contrastTop === b.contrastTop &&
    a.contrastBottom === b.contrastBottom
  );
}
