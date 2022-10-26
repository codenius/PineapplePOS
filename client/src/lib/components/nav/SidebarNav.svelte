<script lang="ts">
	import { Nav } from 'sveltestrap';
	import NavPart from './NavPart.svelte';
	import Settings from './Settings.svelte';
	import { beforeNavigate } from '$app/navigation';
	import { t } from '$lib/i18n';

	let expanded: boolean = false;

	function toogleSidebar(): void {
		expanded = !expanded;
	}

	beforeNavigate(() => {
		expanded = false;
	});
</script>

<aside
	class="{expanded
		? 'expanded'
		: ''} h-100 sticky-top border-end bg-light d-flex flex-column flex-shrink-0 justify-content-between"
>
	<nav class="d-flex flex-column gap-5">
		<div class="list-unstyled">
			<NavPart
				on:click={toogleSidebar}
				icon="list"
				class="text-black bg-white shadow-sm"
				bind:expanded>{$t('menu')}</NavPart
			>
		</div>

		<Nav pills vertical class="d-flex flex-nowrap flex-column">
			<NavPart href="/" icon="house-fill" bind:expanded>{$t('home')}</NavPart>
			<NavPart href="/shop" icon="shop" bind:expanded>{$t('shop')}</NavPart>
			<NavPart href="/stock" icon="boxes" bind:expanded>{$t('stock')}</NavPart>
		</Nav>
	</nav>

	<div>
		<Settings bind:expanded />
	</div>
</aside>

<style global>
	aside {
		transition: 0.2s ease max-width;
		max-width: 4rem;
	}
	aside.expanded {
		max-width: 12rem !important;
		overflow-x: hidden;
		animation: overflow2 0.2s ease 0s 1 normal;
	}
	aside:not(.expanded) {
		animation: overflow 0.2s ease 0s 1 normal;
	}
	@keyframes overflow {
		form {
			overflow-x: hidden;
		}
		99% {
			overflow-x: hidden;
		}
		to {
			overflow-x: initial;
		}
	}
	@keyframes overflow2 {
		form {
			overflow-x: hidden;
		}
		99% {
			overflow-x: hidden;
		}
		to {
			overflow-x: initial;
		}
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
