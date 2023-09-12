<script lang="ts">
    import HealthSummary from "./HealthSummary.svelte";

    const fetchHealthData = (async () => {
		const response = await fetch('https://files.simse.io/body/latest.json')

        return await response.json()
	})()
</script>

{#await fetchHealthData}
    
    <p>loading...</p>

{:then data}
    
    <HealthSummary metrics={data} />

{:catch error}
    
    <p>error: {error.message}</p>
    
{/await}
