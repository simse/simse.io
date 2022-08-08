<script lang="ts">
    import Image from "../components/image.svelte";

    export let posts: any;
</script>

<div>
    {#each posts as post}
    <a href={"/articles/" + post.slug} class="first:border-t border-b border-gray-200 block">
        <div class="my-1 py-1 flex items-center gap-3">
            <Image css="h-8" src={post.image} sizes="200w" />

            <span>{post.date}</span>
            <h2 class="font-bold hover:underline text-blue-800 hover:text-blue-900">{post.title}</h2>
                
            <button class="ml-auto text-white bg-blue-700 py-0.5 px-4 text-sm border border-black hover:bg-black">Read →</button>
        </div>
    </a>
    {/each}
</div>