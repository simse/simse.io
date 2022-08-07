<script lang="ts">
    import { createSrcset } from "$lib/image";

    export let src: string;
    export let credit: string = "";
    export let css: string = "";

    const srcset = createSrcset(src)
</script>

<div class={"aspect-[5/3] relative " + css}>
    <img class="w-full h-full" src="/images/placeholder.svg" alt="" />
    
    <img class="top-0 max-h-full absolute" srcset={srcset} alt="" />

    {#if credit !== ""}
    <p class="mt-4 text-gray-500">{credit}</p>
    {/if}
</div>