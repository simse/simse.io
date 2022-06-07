<script>
	// global styles
	import '../app.css';

	// components
	import Navbar from '../components/navbar.svelte';
</script>

<Navbar />

<main class="max-w-6xl mx-auto">
	<slot />
</main>
