import { nullToUndefined, q } from 'groqd'

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
  _type: q.string(),
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
