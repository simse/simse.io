import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import fetch from 'node-fetch';

import { Spinner } from 'cli-spinner';
import { exit } from 'node:process';

// script input
const albumId = 'd5ad148d-5676-43c3-b8ae-cc8dfd856e54';
const dest = 'london/kingston';

if (!process.env.IMMICH_API_KEY) {
    console.log('You must set IMMICH_API_KEY for this script to work');
    exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ensure destination folder exists
const destinationFolder = path.resolve(__dirname, '../src/assets/cities-on-film/', dest);
if (!fs.existsSync(destinationFolder)){
    fs.mkdirSync(destinationFolder, { recursive: true });
}

// get list of images in album
const albumRequest = await fetch('https://img.0x1.earth/api/album/' + albumId, {
    method: 'GET',
    headers: {
        'x-api-key': process.env.IMMICH_API_KEY || ''
    }
});

const album = await albumRequest.json();
const albumImageIds = album['assets'].map((asset) => asset.id);

// figure out which images have not been downloaded
for (let imageId of albumImageIds) {
    const imageFile = path.resolve(destinationFolder, `${imageId}.avif`);

    if (fs.existsSync(imageFile)) {
        console.log(`${imageFile} already downloaded!`);
        continue;
    }

    // spinner for progress
    const spinner = new Spinner('downloading...');
    spinner.setSpinnerString('|/-\\');
    spinner.start();

    // download
    const downloadResult = await fetch('https://img.0x1.earth/api/asset/file/' + imageId, {
        method: 'GET',
        headers: {
            'x-api-key': process.env.IMMICH_API_KEY || ''
        }
    });
    const downloadBody = await downloadResult.arrayBuffer()

    spinner.setSpinnerTitle('converting to avif...')

    // convert to AVIF
    const sharpImage = await sharp(downloadBody)
        .withMetadata()
        .resize({
            width: 4000
        })
        .avif({
            effort: 6,
            quality: 70
        })
        .toBuffer()

    spinner.setSpinnerTitle('saving to disk...')

    // save file
    fs.writeFileSync(imageFile, sharpImage);

    spinner.setSpinnerTitle(`downloaded ${imageFile}`);
    spinner.stop();
    console.log('\n');
}



export {};