import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';

export default {
    plugins: [
        sveltekit(),
        imagetools({
            include: '**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}*',
            defaultDirectives: new URLSearchParams('?width=400;1200;1600&aspect=5:3&webp'),
        })
    ]
}