<script lang="ts">
	import { NavItem, NavLink, Icon } from 'sveltestrap';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	export let href: string = '#';
	let className: string = '';
	export { className as class };
	export let icon: string = '';
	export let expanded: boolean = false;
</script>

<NavItem>
	<NavLink
		{...$$restProps}
		{href}
		on:click
		active={/* Workaround to prevent '/' route from beeing active with every path */
		($page.url.pathname.includes(href) && href != '/') ||
			($page.url.pathname == '/' && href == '/')}
		class="nav-link d-flex align-items-center gap-2 py-2 border-bottom {className}"
		><Icon name={icon} class="bi" />
		{#if expanded}<span transition:fade={{ duration: 200 }}>
				<slot />
			</span>{/if}
	</NavLink>
</NavItem>

<style global>
	nav .nav-link {
		border-radius: 0 !important;
	}
	nav .bi {
		font-size: 2rem;
	}
</style>
