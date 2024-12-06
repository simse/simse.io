import {
  IMGPROXY_ENDPOINT,
  IMGPROXY_KEY,
  IMGPROXY_SALT,
} from 'astro:env/server'
import {
  type IGenerateImageUrl,
  generateImageUrl,
} from '@imgproxy/imgproxy-node'

export const imageUrl = (
  url: string,
  options?: IGenerateImageUrl['options'],
): string => {
  if (!IMGPROXY_ENDPOINT || !IMGPROXY_SALT || !IMGPROXY_KEY) return url

  return generateImageUrl({
    endpoint: IMGPROXY_ENDPOINT,
    salt: IMGPROXY_SALT,
    key: IMGPROXY_KEY,
    url,
    options,
  })
}
