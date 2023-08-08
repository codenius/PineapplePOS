<script lang="ts">
	import ListItemImage from '$lib/components/ListItemImage.svelte';
	import { ListGroupItem, Button, Icon } from 'sveltestrap';
	import Counter from './Counter.svelte';
	import type { Item } from '$lib/types/Item';
	import { shoppingBag } from '$lib/stores/shoppingBag';
	import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';
	import { formatCurrency } from '$lib/currencyHelpers';
	import { language } from '$lib/i18n';

	export let id: Item['id'];
	export let name: Item['name'];
	export let company: Item['company'];
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
	<span
		title={`${name || '–'} ${company ? '–' : ''} ${company || ''}`}
		class="d-flex justify-content-between align-items-center gap-2"
	>
		<ListItemImage {image} />
		<span
			style="overflow-y:hidden; 
			word-break: break-word;  
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;"
			>{name} {company ? '–' : ''} {company ? company : ''}</span
		>
	</span>
	<span class="d-flex align-items-center flex-shrink-0 gap-2">
		<Counter max={amount} bind:value={shoppingBagAmount} />
		<span>{formatCurrency(shoppingBagAmount * price, $language)}</span>
		<Button
			on:click={() => {
				shoppingBagAmount = 0;
			}}
			outline={true}
			color="danger"
		>
			<Icon name="trash" />
		</Button>
	</span>
</ListGroupItem>
