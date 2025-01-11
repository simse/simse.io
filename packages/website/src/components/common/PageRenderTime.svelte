<script lang="ts">
    import { onMount } from "svelte";

    let renderTime = $state<number | null>(0);

    const updateRenderTime = () => {
        const navEntry = performance.getEntriesByType('navigation')[0];
        // @ts-expect-error both responseStart and requestStart DO exist on that type
        const serverTime = navEntry.responseStart - navEntry.requestStart;
        renderTime = Math.round(serverTime);

        console.log(Math.round(serverTime))
    };

    onMount(() => {
        updateRenderTime();
        document.addEventListener('astro:page-load', updateRenderTime)

        return () => {
            document.removeEventListener('astro:page-load', updateRenderTime)
        }
    });
</script>

{#if renderTime}
<span class="max-w-4xl mx-auto block mt-4 text-zinc-300">
    Page rendered in <code>{renderTime}ms</code>
</span>
{/if}