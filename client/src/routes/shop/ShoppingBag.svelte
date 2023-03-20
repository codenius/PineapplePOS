<script context="module" lang="ts">
	export function restoreShoppingBag() {
		if (get(clearedShoppingBag).length) {
			shoppingBag.set(get(clearedShoppingBag));
		}
	}
</script>

<script lang="ts">
	import { shoppingBag, clearedShoppingBag } from '$lib/stores/shoppingBag';
	import { useQuery } from '@sveltestack/svelte-query';
	import { ListGroup, Icon, Button } from 'sveltestrap';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import ShoppingBagEntry from './components/ShoppingBag/ShoppingBagEntry.svelte';
	import type { Item } from '$lib/types/Item';
	import { get } from 'svelte/store';

	let queryResult = useQuery<Item[], Error>('items');

	let totalPices: number;
	$: {
		totalPices = 0;
		for (let index = 0; index < $shoppingBag.length; index++) {
			totalPices += $shoppingBag[index].amount;
		}
	}

	$: if ($shoppingBag.length) {
		$clearedShoppingBag = [];
	}
</script>

<div style="padding-bottom: 5rem">
	{#if $shoppingBag.length}
		{#if $queryResult.isSuccess}
			<ListGroup class="p-2">
				{#each $shoppingBag as { id, amount } (id)}
					<span
						animate:flip={{ duration: 200 }}
						in:fly|local={{ y: -10, duration: 300 }}
						out:fly|local={{ y: 5, duration: 100 }}
					>
						<ShoppingBagEntry
							{...$queryResult.data.find((item) => item.id == id)}
							shoppingBagAmount={amount}
						/>
					</span>
				{/each}
			</ListGroup>
			<div
				transition:fade|local={{ duration: 100 }}
				class="text-muted text-center p-2"
			>
				{totalPices} pices from {$shoppingBag.length} items
			</div>
		{/if}
	{:else}
		<div
			in:fly={{ y: 30, delay: 100, duration: 150, easing: cubicOut }}
			class="p-4 text-center"
		>
			<div class="m-3"><Icon class="h1" name="cart-x" /></div>
			<h6 class="text-muted">
				No items in shopping bag yet. Click one on the left to add it.
			</h6>
			{#if $clearedShoppingBag.length}
				<Button outline={true} color="secondary" on:click={restoreShoppingBag}>
					<Icon name="arrow-counterclockwise" /> Restore cleared shopping bag</Button
				>
			{/if}
		</div>
	{/if}
</div>
