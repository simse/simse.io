import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";

export interface PictureData {
  src: string;
  srcset?: string;
  width: number;
  height: number;
  sources: Array<{ srcset: string; type: string }>;
}

type ImageFormat = "avif" | "webp" | "png" | "jpg" | "jpeg";

interface GetPictureDataOptions {
  formats?: ImageFormat[];
  widths?: number[];
  densities?: Array<number | `${number}x`>;
  aspectRatio?: number | `${number}:${number}`;
}

function parseAspectRatio(ratio: number | `${number}:${number}`): number {
  if (typeof ratio === "number") return ratio;
  const [w, h] = ratio.split(":").map(Number);
  return w / h;
}

export async function getPictureData(
  image: ImageMetadata,
  options: GetPictureDataOptions = {},
): Promise<PictureData> {
  const formats: ImageFormat[] = options.formats ?? ["avif", "webp"];
  const aspectRatio =
    options.aspectRatio !== undefined ? parseAspectRatio(options.aspectRatio) : undefined;
  const baseWidth =
    aspectRatio !== undefined
      ? options.widths?.length
        ? Math.max(...options.widths)
        : image.width
      : undefined;
  const baseOptions = {
    src: image,
    ...(options.widths ? { widths: options.widths } : {}),
    ...(options.densities ? { densities: options.densities } : {}),
    ...(aspectRatio !== undefined && baseWidth
      ? {
          width: baseWidth,
          height: Math.round(baseWidth / aspectRatio),
          fit: "cover" as const,
        }
      : {}),
  };

  const sources = await Promise.all(
    formats.map(async (format) => {
      const result = await getImage({ ...baseOptions, format });
      return {
        srcset: result.srcSet?.attribute || result.src,
        type: `image/${format}`,
      };
    }),
  );

  const fallback = await getImage(baseOptions);

  return {
    src: fallback.src,
    srcset: fallback.srcSet?.attribute || undefined,
    width: fallback.attributes.width ?? image.width,
    height: fallback.attributes.height ?? image.height,
    sources,
  };
}
