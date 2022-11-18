<script lang="ts">
	import ItemCard from './components/Items/ItemCard.svelte';
	import { zoomFactor } from '$lib/stores/itemsZoom';
	import { Spinner } from 'sveltestrap';
	import { useQuery } from '@sveltestack/svelte-query';
	import { getDatabase } from '$lib/data';
	import { shoppingBag } from '$lib/stores/shoppingBag';
	import type { Item } from '$lib/types/Item';
	import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';

	export const queryResult = useQuery('items', async () => {
		return getDatabase();
	});

	let items: Item[];
	$: {
		if ($queryResult.isSuccess) {
			items = $queryResult.data.map((item: Item) => {
				let shoppingBagEntry = $shoppingBag.find(
					(shoppingBagEntry: ShoppingBagEntry) => shoppingBagEntry.id == item.id
				);
				let shoppingBagAmount = shoppingBagEntry ? shoppingBagEntry.amount : 0;
				return { ...item, amount: item.amount - shoppingBagAmount };
			});
		}
	}
</script>

{#if $queryResult.isSuccess}
	<div style="font-size: {($zoomFactor / 1.5) * 0.2}rem" id="wrapper">
		{#each items as item}
			<ItemCard {...item} />
		{/each}
	</div>
{:else}
	<div class="h-100 d-flex justify-content-center align-items-center">
		{#if $queryResult.isLoading}
			<Spinner type="grow" />
		{/if}
		{#if $queryResult.isError}
			<span class="h4">Error: While loading the data an error occured.</span>
		{/if}
	</div>
{/if}

<style>
	#wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
		grid-auto-rows: min-content;
	}
</style>
