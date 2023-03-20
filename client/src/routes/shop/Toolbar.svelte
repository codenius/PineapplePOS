<script context="module" lang="ts">
	export function clearShoppingBag() {
		if (get(shoppingBag).length) {
			clearedShoppingBag.set(get(shoppingBag));
			shoppingBag.set([]);
		}
	}
</script>

<script lang="ts">
	import ZoomController from './components/ZoomController.svelte';
	import { shoppingBag, clearedShoppingBag } from '$lib/stores/shoppingBag';
	import { Button, ButtonToolbar, Icon } from 'sveltestrap';
	import SearchInput from './SearchInput.svelte';
	import { get } from 'svelte/store';
	import { createStoreMethods } from 'svelte-command-palette';
</script>

<div
	style="padding: 0.8rem;"
	class="bg-light d-flex justify-content-between align-items-center flex-wrap gap-2"
>
	<span class="d-flex align-items-center flex-wrap gap-3">
		<SearchInput />
		<ZoomController />
	</span>
	<ButtonToolbar class="d-flex align-items-center gap-2">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a
			href=""
			class="text-secondary"
			on:click={(event) => {
				event.preventDefault();
				createStoreMethods().openPalette();
			}}
			>Open help with <kbd
				class="bg-light text-black border text-decoration-none">h</kbd
			> or click here</a
		>
		<Button><Icon name="arrow-counterclockwise" /> Undo last purchase</Button>
		<Button
			disabled={!$shoppingBag.length}
			outline={true}
			color="danger"
			on:click={clearShoppingBag}
			><Icon name="x-lg" /> Clear shopping bag</Button
		>
	</ButtonToolbar>
</div>
