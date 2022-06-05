<script>
	// global styles
	import '../app.css';

	// components
	import Navbar from '../components/navbar.svelte';
</script>

<Navbar />

<main class="container mx-auto mt-16">
	<slot />
</main>
