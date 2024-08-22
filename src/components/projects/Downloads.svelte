<script lang="ts">
  import { onMount } from 'svelte';
  import { kFormatter } from '@utils/number';

  export let projectSlug: string;
  let data = '';
  let downloads;
  let loading = true;
  let error = '';

  // replace with your url
  const url = `/api/download-stats/${projectSlug}.json`;

  onMount(async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      data = await response.json();

      downloads = kFormatter(data.downloads);
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div>loading...</div>
{:else if error}
  <div>{error}</div>
{:else}
  <div>{downloads}</div>
{/if}

<style>

</style>
