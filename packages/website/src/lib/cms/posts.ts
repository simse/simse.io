import { postFields } from '@lib/cms/common'
import { type InferType, q } from 'groqd'
import client from './client'
import type { Image } from '@lib/cms/types'
import { imageUrlFromAssetRef } from '@lib/image'

const { query: allPostsQuery, schema: allPostsSchema } = q('*')
  .filter("_type == 'post' && defined(slug)")
  .order('publishedAt desc')
  .grab(postFields)

const blocksToText = (blocks: Post['content']): string => {
  return blocks.map(block => {
    if (block._type !== "block" || !block.children) {
      return "";
    }

    return block.children.map(child => child.text).join('')
  })
    .join(" ")
}

const shortenText = (text: string, maxChars = 160): string => {
  if (text.length < maxChars) {
    return text;
  }

  return text.slice(0, maxChars) + '...';
}

const excerptFromPost = (post: SanityPost): string => {
  if (post.excerpt) {
    return post.excerpt;
  }

  return shortenText(blocksToText(post.content));
}

const imageRefToURL = (ref: string, width: number, height?: number): string => {
  return imageUrlFromAssetRef(ref, {
    width,
    height,
    resizing_type: 'fill',
  })
}

const transformImageBlock = (image: SanityPost['content'][0]): Image | null => {
  if (image._type !== "image") return null;

  return {
    // @ts-expect-error
    alt: image.asset.alt,
    // @ts-expect-error
    caption: image.asset.caption,
    // @ts-expect-error
    src: imageRefToURL(image.asset._ref, 1200, 800),
    srcset: [],
  }
}

const transformPost = (post: SanityPost): Post => {
  // transform image
  let image: Image | undefined = undefined;

  if (post.image) {
    image = {
      alt: post.image.alt,
      caption: post.image.caption,
      src: imageRefToURL(post.image.asset._ref, 1200, 800),
      srcset: [],
    }
  }

  const content = post.content.map(block => {
    if (block._type === 'image') {
      return {
        ...block,
        image: transformImageBlock(block),
      }
    }

    return block
  })

  return {
    ...post,
    content,
    excerpt: excerptFromPost(post),
    image,
  };
};

export const getPosts = async (): Promise<Post[]> => {
  const sanityResponse = await client.fetch(allPostsQuery)

  return allPostsSchema.parse(sanityResponse).map(post => transformPost(post));
}

export const getPost = async (slug: string): Promise<Post | null> => {
  const { query: postQuery, schema: postSchema } = q('*')
    .filter(`_type == 'post' && slug.current == '${slug}'`)
    .order('publishedAt desc')
    .grab(postFields)

  const sanityResponse = await client.fetch(postQuery)
  const parsedResponse = postSchema.parse(sanityResponse)

  if (!parsedResponse.length) {
    return null
  }

  return transformPost(parsedResponse[0])
}

export type SanityPost = InferType<typeof allPostsSchema>[0];
export type Post = Omit<InferType<typeof allPostsSchema>[0], 'image'> & {
  image?: Image;
}
