import { slugFromPath } from '$lib/utils';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
	const modules = import.meta.glob(`./*.{md,svx,svelte.md}`);

	let match;
	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === params.slug) {
			match = [path, resolver];
			break;
		}
	}

	if (!match) {
		return {
			status: 404
		};
	}

    // @ts-ignore
	let post = await match[1]();

    /*if (post.metadata.image) {
        // @ts-ignore
        let srcset = await import('../../../static/images/' + post.metadata.image + '.jpg'); // ?w=600;1100;1600&aspect=5:3&format=webp&srcset
        post.metadata.srcset = srcset.default;
    }*/

	return {
		body: post.metadata
	};
}