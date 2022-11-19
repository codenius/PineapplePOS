<script lang="ts">
	import { ListGroupItem } from 'sveltestrap';
	import Counter from './Counter.svelte';
	import type { Item } from '$lib/types/Item';
	import { shoppingBag } from '$lib/stores/shoppingBag';
	import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';

	export let id: Item['id'];
	export let name: Item['name'];
	export let amount: Item['amount'];
	export let price: Item['price'];
	export let image: Item['image'];

	export let shoppingBagAmount: ShoppingBagEntry['amount'];

	$: shoppingBagAmount, updateAmount(); // run updateAmount when shoppingBagAmount changes

	function updateAmount() {
		const shoppingBagIndex = $shoppingBag.findIndex(
			(shoppingBagEntry) => shoppingBagEntry.id === id
		);
		$shoppingBag[shoppingBagIndex].amount = shoppingBagAmount;

		if (shoppingBagAmount <= 0) {
			$shoppingBag.splice(shoppingBagIndex, 1);
		}
		$shoppingBag = $shoppingBag;
	}
</script>

<ListGroupItem class="d-flex justify-content-between align-items-center">
	<span class="d-flex justify-content-between align-items-center gap-2">
		<span class="rounded border p-1" style="height: 3rem; aspect-ratio: 1 / 1;">
			<img
				class="h-100 w-100"
				style="object-fit: contain;"
				src={image}
				alt=""
			/>
		</span>
		<span
			style="overflow-y:hidden; 
			word-break: break-word;  
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;">{name}</span
		>
	</span>
	<span class="d-flex align-items-center flex-shrink-0 gap-2">
		<Counter max={amount} bind:value={shoppingBagAmount} />
		<span>{price}</span>
	</span>
</ListGroupItem>
