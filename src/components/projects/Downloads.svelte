<script lang="ts">
import { kFormatter } from '@utils/number'
import { onMount } from 'svelte'

export let projectSlug: string
let data = ''
let downloads
let loading = true
let error = ''

// replace with your url
const url = `/api/download-stats/${projectSlug}.json`

onMount(async () => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    data = await response.json()

    downloads = kFormatter(data.downloads)
  } catch (err) {
    error = err.message
  } finally {
    loading = false
  }
})
</script>

{#if loading}

{:else if error}

{:else}
  <tr>
    <td class="py-3 px-3 font-bold">Downloads</td>
    <td class="py-3 px-3"></td>
  </tr>
{/if}
