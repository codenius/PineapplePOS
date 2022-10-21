<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { Nav } from 'sveltestrap';
	import NavPart from './NavPart.svelte';
	let expanded: boolean = false;

	function toogleSidebar(): void {
		expanded = !expanded;
		console.log(expanded);
	}

	beforeNavigate(() => {
		expanded = false;
	});
</script>

<nav class="h-100 sticky-top me-3">
	<Nav
		pills
		vertical
		class="nav flex-nowrap {expanded ? 'expanded' : ''} 
    bg-light border-end d-flex flex-column h-100"
	>
		<NavPart
			on:click={toogleSidebar}
			icon="list"
			class="text-black bg-white"
			bind:expanded>Menü</NavPart
		>
		<NavPart disabled tabindex="-1" icon="three-dots" class="opacity-0" />
		<NavPart href="/" icon="house-fill" bind:expanded>Start</NavPart>
		<NavPart href="/shop" icon="shop" bind:expanded>Shop</NavPart>
		<NavPart href="/stock" icon="boxes" class="border-bottom-0" bind:expanded
			>Lager</NavPart
		>
	</Nav>
</nav>

<style global>
	nav .nav {
		transition: 0.2s ease max-width;
		max-width: 4rem;
		overflow-x: hidden;
		overflow-y: auto;
	}
	nav .expanded {
		max-width: 10rem !important;
	}

	/* nav .nav-link span {
    opacity: 0;
    visibility: hidden;
    transition: opacity 200ms ease-out, visibility 0ms 200ms;
  }
  nav .expanded span {
    opacity: 1;
    visibility: visible;
    transition: opacity 200ms ease-out 100ms;
  } */
</style>
