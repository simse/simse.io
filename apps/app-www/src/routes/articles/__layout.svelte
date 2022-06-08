<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	// @ts-ignore
	export async function load({ url, fetch }) {
		// @ts-ignore
		const post = await fetch(`${url.pathname}.json`).then(res => res.json());
		if (!post) {
			return {
				status: 404,
				error: new Error('Post could not be found')
			};
		}

		if (post.image) {
			const { default: srcset } = await import(`../../../static/images/${post.image}.jpg`);

			post.srcset = srcset[2];
		}

		return {
			props: {
				post
			}
		};
	}
</script>

<script lang="ts">
	import "../../styles/prism.css";
	import "../../styles/article.scss";
	import Image from "../../components/image.svelte"
	import { setBreadcrumbs } from "$lib/breadcrumbs";

	export let post: any;

	setBreadcrumbs([["/articles", "Articles"], ["/", post.title]])
</script>

<svelte:head>
	<title>{post.title} / Simon Sorensen</title>
</svelte:head>

<main class="max-w-5xl mb-32 pt-16">
	<div class="mb-8">

		
		<div class="">
			<h1 class="text-4xl mb-2">{post.title}</h1>
			<p class="text-lg text-gray-600">2022-05-24 — Ramblings</p>
		</div>
		
		{#if post.image}
		<Image srcset={post.srcset} credit={post.imageCredit} css="my-8" />
		{/if}
	</div>

	<div class="article max-w-3xl text-lg">
		<slot />
	</div>
</main>