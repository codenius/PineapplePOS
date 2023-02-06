<script lang="ts">
	import { Styles } from 'sveltestrap'; // component, that includes Bootstrap
	import SidebarNav from '$lib/components/nav/SidebarNav.svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import ProgressBar from 'svelte-progress-bar';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

	let progress: any;
	beforeNavigate(() => {
		progress.start();
	});
	afterNavigate(() => {
		progress.complete();
	});

	const queryClient = new QueryClient();
</script>

<!-- includes Bootstrap stylesheet -->
<Styles />

<ProgressBar bind:this={progress} />
<QueryClientProvider client={queryClient}>
	<div id="wrapper">
		<SidebarNav />
		<main><slot /></main>
	</div>
</QueryClientProvider>

<style>
	:global(html, body) {
		height: 100%;
		overflow-y: hidden;
	}
	:global(*, *::before, *::after) {
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}
	:global(input, textarea) {
		-webkit-user-select: auto;
		-moz-user-select: auto;
		user-select: auto;
	}
	#wrapper {
		height: 100%;
		display: flex;
		overflow-y: auto;
	}
	main {
		width: 100%;
	}
	:global(.svelte-progress-bar, .svelte-progress-bar-leader) {
		background-color: var(--bs-primary);
		z-index: 1030; /* this is bootstraps z-index for position fixed things */
	}
</style>
