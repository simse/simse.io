import { imageUrlFromAssetRef } from '@lib/image'
import { nullToUndefined, q } from 'groqd'
import type { Image, ImageSize } from './types'

export const contentBlocks = q
  .union([
    q.contentBlock(),
    q.object({
      _type: q.literal('break'),
      style: q.string(),
    }),
    q.object({
      _type: q.literal('codeBlock'),
      sourceCode: q.string(),
      language: q.string(),
    }),
    q.object({
      _type: q.literal('image'),
      asset: q.object({
        _ref: q.string(),
        alt: q.string().optional(),
        caption: q.string().optional(),
      }),
    }),
    q.object({
      _type: q.literal('graphBlock'),
      type: q.literal('line'),
      datasets: q.object({
        asset: q.object({
          _ref: q.string(),
        }),
        _type: q.literal('file'),
      }),
      title: q.string(),
    }),
    q.object({
      _type: q.literal('terminalRecordingBlock'),
      title: q.string(),
      cast_file: q.object({
        asset: q.object({
          _ref: q.string(),
        }),
        _type: q.literal('file'),
      }),
    }),
  ])
  .array()

export const postFields = {
  _type: q.literal('post'),
  title: q.string(),
  slug: q.slug('slug'),
  excerpt: nullToUndefined(q.string().optional()),
  image: nullToUndefined(
    q
      .object({
        asset: q.object({
          _ref: q.string(),
        }),
        caption: q.string().optional(),
        alt: q.string(),
      })
      .optional(),
  ),
  published: q.string(),
  content: contentBlocks,
  tags: nullToUndefined(q.string().array().optional()),
}

export const projectFields = {
  _type: q.literal('project'),
  title: q.string(),
  description: q.string(),
  featured: nullToUndefined(q.boolean().default(false)),
  slug: q.slug('slug'),
  icon: nullToUndefined(
    q
      .object({
        asset: q.object({
          _ref: q.string(),
        }),
      })
      .optional(),
  ),
  published: q.date(),
  details: nullToUndefined(contentBlocks.optional()),
  languages: nullToUndefined(q.string().array().optional()),
  technologies: nullToUndefined(q.string().array().optional()),
  sourceCode: nullToUndefined(q.string().optional()),
  demo: nullToUndefined(q.string().optional()),
  type: q.string(),
  images: nullToUndefined(
    q
      .object({
        alt: q.string().optional(),
        caption: q.string().optional(),
        asset: q.object({
          _ref: q.string(),
        }),
      })
      .array()
      .optional(),
  ),
}

/**
 * Helper function to create ImageSize given Sanity asset ref and size.
 * The object contains a transform URL and the size.
 * @param ref - Sanity asset image ref
 * @param width - Target width of image
 * @param height - Optional height, if left out image retains original aspect ratio
 * @param options - Object of extra transform options
 * @returns Object containing transformed image URL, etc.
 */
const imageSize = (
  ref: string,
  width: number,
  height?: number,
  options?: Record<string, any>,
): ImageSize => {
  return {
    src: imageUrlFromAssetRef(ref, {
      width,
      height,
      resizing_type: 'fill',
      format: 'avif',
      ...options,
    }),
    width,
    height,
  }
}

/**
 * Returns an image with all sizes given a Sanity asset ref
 *
 */
export const assetRefToImage = (
  ref: string,
  alt: string,
  caption?: string,
): Image => {
  return {
    alt: alt,
    caption: caption,
    src: imageUrlFromAssetRef(ref, {
      width: 1200,
      height: 900,
      resizing_type: 'fill',
      format: 'avif',
    }),
    sizes: {
      icon: imageSize(ref, 120, 120),
      thumbnail: imageSize(ref, 600, 400),
    },
  }
}
