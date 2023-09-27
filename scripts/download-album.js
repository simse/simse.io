import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exit } from 'node:process';

import 'dotenv/config';
import sharp from 'sharp';
import fetch from 'node-fetch';
import { Spinner } from 'cli-spinner';
import prompts from 'prompts';
import { stringify } from 'yaml';

const OUTPUT_FORMAT = 'avif';

// script input
if (!process.env.IMMICH_API_KEY) {
    console.log('You must set IMMICH_API_KEY for this script to work');
    exit(1);
}

// load all albums
const allAlbumsRequest = await fetch('https://img.0x1.earth/api/album', {
    method: 'GET',
    headers: {
        'x-api-key': process.env.IMMICH_API_KEY || ''
    }
});
let allAlbums = await allAlbumsRequest.json();

// sort by last modified
allAlbums.sort((a, b) => {
    const aDate = new Date(a.lastModifiedAssetTimestamp);
    const bDate = new Date(b.lastModifiedAssetTimestamp);

    return bDate - aDate;
});

// get script input
const { albumId, dest } = await prompts([
    {
        type: 'multiselect',
        name: 'albumId',
        message: 'Which album?',
        choices: allAlbums.map(album => ({
            title: album.albumName,
            value: album.id
        }))
    },
    {
        type: 'text',
        name: 'dest',
        message: 'Where to put it?'
    }
])

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

// delete downloaded images that are not in the album
const downloadedImages = fs.readdirSync(destinationFolder);
for (let downloadedImage of downloadedImages) {
    const downloadedImageId = downloadedImage.split('.')[0];

    if (!albumImageIds.includes(downloadedImageId)) {
        console.log(`deleting ${downloadedImage}`);
        fs.unlinkSync(path.resolve(destinationFolder, downloadedImage));
    }
}

// figure out which images have not been downloaded
for (let imageId of albumImageIds) {
    const imageFile = path.resolve(destinationFolder, `${imageId}.${OUTPUT_FORMAT}`);

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

    spinner.setSpinnerTitle(`converting to ${OUTPUT_FORMAT}...`)

    // convert to AVIF
    const sharpImage = await sharp(downloadBody)
        .withMetadata()
        .resize({
            width: 4000
        })
        .avif({
            effort: 4,
            quality: 80
        })
        .toBuffer()

    spinner.setSpinnerTitle('saving to disk...')

    // save file
    fs.writeFileSync(imageFile, sharpImage);

    spinner.setSpinnerTitle(`downloaded ${imageFile}`);
    spinner.stop();
    console.log('');
}

console.log('\nfor yaml file:')


let imagesForYaml = [];
for (let imageId of albumImageIds) {
    const imageFile = path.join('../../assets/cities-on-film', dest, `${imageId}.${OUTPUT_FORMAT}`);

    // find alt
    const caption = album['assets'].find(asset => imageId === asset.id).exifInfo.description;

    imagesForYaml.push({
        image: imageFile,
        caption,
        alt: ''
    });
}

console.log(stringify(imagesForYaml));

export {};