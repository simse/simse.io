import { generateImageUrl, type IGenerateImageUrl } from '@imgproxy/imgproxy-node';
import {
    IMGPROXY_ENDPOINT,
    IMGPROXY_KEY,
    IMGPROXY_SALT
} from 'astro:env/server'

export const imageUrl = (url: string, options?: IGenerateImageUrl['options']): string => {
    return generateImageUrl({
        endpoint: IMGPROXY_ENDPOINT,
        salt: IMGPROXY_SALT,
        key: IMGPROXY_KEY,
        url,
        options,
    });
}