import { thumbHashToDataURL } from 'thumbhash';
import { base64ToBinary } from '@/common';

export const getImages = async (albumId: string): Promise<Image[]> => {
    const immichResponse = await fetch('https://img.0x1.earth/api/album/' + albumId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.IMMICH_API_KEY
        }
    });

    const immichJson = await immichResponse.json();

    return immichJson.assets.map((asset: any) => {
        let image: Image = asset;
        image.thumbhashDataUri = thumbHashToDataURL(base64ToBinary(asset.thumbhash));

        return image;
    });
}

export interface Image {
    id: string;
    checksum: string;
    thumbhash: string;
    thumbhashDataUri: string;
};