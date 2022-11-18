<script lang="ts">
	import { shoppingBag } from '$lib/stores/shoppingBag';
	import { useQuery } from '@sveltestack/svelte-query';
	import { ListGroup } from 'sveltestrap';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import ShoppingBagEntry from './components/ShoppingBag/ShoppingBagEntry.svelte';
	import type { Item } from '$lib/types/Item';

	let queryResult = useQuery<Item[], Error>('items');
</script>

<ListGroup class="p-2" style="overflow-x: hidden">
	{#if $queryResult.isSuccess}
		{#each $shoppingBag as { id, amount } (id)}
			<span
				animate:flip={{ duration: 200 }}
				in:fly={{ y: -10, duration: 300 }}
				out:fly={{ y: 5, duration: 100 }}
			>
				<ShoppingBagEntry
					{...$queryResult.data.find((item) => item.id == id)}
					shoppingBagAmount={amount}
				/>
			</span>
		{/each}
		<div style="height: 5rem;" />
	{/if}
</ListGroup>
