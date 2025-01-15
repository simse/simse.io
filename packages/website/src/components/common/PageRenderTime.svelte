<script lang="ts">
import { onMount } from 'svelte'

let renderTime = $state<number | null>(0)

const updateRenderTime = () => {
  // @ts-expect-error
  const linkEntry = window.performance
    .getEntriesByType('resource')
    .filter((entry) => entry.initiatorType === 'fetch')
    .pop()

  if (linkEntry) {
    // @ts-expect-error
    renderTime = Math.round(linkEntry.serverTiming[0].duration)
  } else {
    const navEntry = performance.getEntriesByType('navigation')[0]
    // @ts-expect-error
    renderTime = Math.round(navEntry.serverTiming[0].duration)
  }
}

onMount(() => {
  updateRenderTime()
  document.addEventListener('astro:page-load', updateRenderTime)

  return () => {
    document.removeEventListener('astro:page-load', updateRenderTime)
  }
})
</script>

{#if renderTime}
<span class="max-w-4xl mx-auto block my-4 text-zinc-400 text-sm uppercase">
    Page rendered in <code>{renderTime}ms</code>
</span>
{/if}