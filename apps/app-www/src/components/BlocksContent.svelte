<script>
    import CodeSnippet from "./blocks/CodeSnippet.svelte";
import RichText from "./blocks/RichText.svelte";

    export let blocks = [];
</script>

{#each blocks as block}
    {#if block.blockType === 'richText'}
        {#each block.richText as element}
            <RichText element={element} />
        {/each}
    {/if}

    {#if block.blockType === 'codeSnippet'}
        <CodeSnippet element={block} />
    {/if}
{/each}