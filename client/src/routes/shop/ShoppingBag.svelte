<script lang="ts">
	import { shoppingBag } from '$lib/stores/shoppingBag';
	import { useQuery } from '@sveltestack/svelte-query';
	import { ListGroup } from 'sveltestrap';
	import ShoppingBagEntry from './components/ShoppingBag/ShoppingBagEntry.svelte';
	import type { Item } from '$lib/types/Item';

	let queryResult = useQuery<Item[], Error>('items');
</script>

<ListGroup class="p-2">
	{#if $queryResult.isSuccess}
		{#each $shoppingBag as { id, amount }}
			<ShoppingBagEntry
				{...$queryResult.data.find((item) => item.id == id)}
				shoppingBagAmount={amount}
			/>
		{/each}
		<div style="height: 5rem;" />
	{/if}
</ListGroup>
