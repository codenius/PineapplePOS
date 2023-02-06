<script lang="ts">
	import type { Item } from '$lib/types/Item';
	import ListItemImage from '$lib/components/ListItemImage.svelte';
	import { ListGroupItem } from 'sveltestrap';
	import { language } from '$lib/i18n';
	import { formatCurrency } from '$lib/currencyHelpers';

	export let item: Item;
	export let shoppingBagAmount: Item['amount'];
</script>

<ListGroupItem class="d-flex justify-content-between gap-2">
	<span class="d-flex gap-2">
		<ListItemImage image={item.image} />
		<span>{item.name}</span>
	</span>

	<span class="flex-shrink-0">
		<div>
			{shoppingBagAmount} x {formatCurrency(item.price, $language)}
		</div>
		<div>
			= {formatCurrency(shoppingBagAmount * item.price, $language)}
		</div>
	</span>
</ListGroupItem>
