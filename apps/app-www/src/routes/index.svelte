<script context="module" lang="ts">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }: any) {
		let posts = await fetch('/articles.json?limit=10').then((res: any) => res.json());

		return {
			props: {
				posts
			}
		};
	}
</script>

<script lang="ts">
    // import parts
    import { setBreadcrumbs } from "$lib/breadcrumbs"
    import ArticleList from "../components/articleList.svelte";

    export let posts: any;

    setBreadcrumbs([])

    const personalInformation = [
        ["Name", "Simon Sorensen"],
        ["City", "London 😎"],
        ["Occupation", "Software Engineering Intern"],
        ["Employer", "LEGO"],
        ["University", "Kingston University"],
        ["Degree", "Computer Science"],
        ["Social Security", "078-05-1120"]
    ];

    
</script>

<main class="py-32 border-b flex items-center">
    <div>
        <img class="w-28 mr-8" src="/images/wink.png" />
    </div>

    <div>
        <h1 class="text-3xl mb-4">Good evening 👋</h1>
        <p class="text-xl">Welcome to my slice of the internet.</p>
    </div>
</main>

<div class="py-8 border-b">
    <h2 class="text-lg font-bold mb-4">About</h2>

    <table>
        <tbody>
            {#each personalInformation as p}
            <tr class="border-b border-x first:border-t">
                {#each p as i}
                <td class="py-2 px-2 min-w-[8rem] first:font-bold">{i}</td>
                {/each}
            </tr>
            {/each}
        </tbody>
    </table>
</div>

<div class="py-8 ">
    <h2 class="text-lg font-bold mb-4">Articles</h2>

    <ArticleList posts={posts} />
</div>