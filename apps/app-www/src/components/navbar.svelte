<script lang="ts">
import { page } from "$app/stores";
import { breadcrumbs } from "../stores.js";

	const pages = [
		{
			name: 'Home',
			path: '/'
		},
		{
			name: 'Contact',
			path: '/contact'
		},
		{
			name: 'Articles',
			path: '/articles'
		},
        {
			name: 'Projects',
			path: '/projects'
		}
	];

    const matchPath = (itemPath: string, pagePath: string) => {
        if (itemPath === "/") {
            return itemPath === pagePath
        }

        return pagePath.startsWith(itemPath)
    }

	let currentPath: string;

    $: currentPath = $page.url.pathname;
</script>

<nav class="flex justify-between py-4 container mx-auto border-b">
	<div>
		<a href="/" class="hover:underline">
            <span class="font-bold text-xl">Simon Sorensen</span>
        </a>
	</div>

	<div class="flex items-center">
		<ul class="p-0 m-0 flex">
			{#each pages as page}
				<li><a class="p-4 mx-2 hover:underline" class:font-bold="{ matchPath(page.path, currentPath) }" href={page.path}>{page.name}</a></li>
			{/each}
		</ul>
	</div>
</nav>

<nav class="container mx-auto py-2 border-b flex gap-2">
		<a href="/" class="hover:underline">~</a>

		{#each $breadcrumbs as crumb}
			<span>/</span>

			<a href={crumb.path} class="hover:underline">{crumb.name}</a>
		{/each}
</nav>