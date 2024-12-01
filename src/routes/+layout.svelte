<script lang="ts">
    import Navbar from "../components/Navbar.svelte";
	import '../app.css';
	let { children } = $props();
</script>

<Navbar />

{@render children()}
