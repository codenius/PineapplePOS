<script lang="ts">
	import { Styles } from 'sveltestrap'; // component, that includes Bootstrap
	import SidebarNav from '$lib/components/nav/SidebarNav.svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import ProgressBar from 'svelte-progress-bar';

	let progress: any;
	beforeNavigate(() => {
		progress.start();
	});
	afterNavigate(() => {
		progress.complete();
	});
</script>

<!-- includes Bootstrap stylesheet -->
<Styles />

<ProgressBar bind:this={progress} />

<div id="wrapper">
	<SidebarNav />
	<main><slot /></main>
</div>

<style>
	:global(html, body) {
		height: 100%;
		overflow-y: hidden;
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
