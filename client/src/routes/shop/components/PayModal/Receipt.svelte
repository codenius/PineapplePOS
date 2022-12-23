<script lang="ts">
	import { shoppingBag } from '$lib/stores/shoppingBag';
	import type { Item } from '$lib/types/Item';
	import { useQuery } from '@sveltestack/svelte-query';
	import { ListGroup } from 'sveltestrap';
	import ReceiptItem from './ReceiptItem.svelte';

	let queryResult = useQuery<Item[], Error>('items');
</script>

<ListGroup class="overflow-auto" style="height: 100%">
	{#each $shoppingBag as { id, amount }}
		<ReceiptItem
			item={$queryResult.data.find((item) => item.id == id)}
			shoppingBagAmount={amount}
		/>
	{/each}
</ListGroup>
