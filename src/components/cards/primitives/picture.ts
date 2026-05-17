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
}

export async function getPictureData(
  image: ImageMetadata,
  options: GetPictureDataOptions = {},
): Promise<PictureData> {
  const formats: ImageFormat[] = options.formats ?? ["avif", "webp"];
  const baseOptions = {
    src: image,
    ...(options.widths ? { widths: options.widths } : {}),
    ...(options.densities ? { densities: options.densities } : {}),
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
    width: image.width,
    height: image.height,
    sources,
  };
}
