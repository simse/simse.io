<script>
	import { breadcrumbs } from '../stores';

	export let title;

	breadcrumbs.update((_) => [
		{
			path: '/articles',
			name: 'Articles'
		},
		{
			path: '/',
			name: title
		}
	]);
</script>

<h1 class="text-4xl">{title}</h1>

<slot />
