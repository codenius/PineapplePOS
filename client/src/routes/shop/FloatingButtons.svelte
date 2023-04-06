<script lang="ts">
	import { payModal } from '$lib/stores/payModal';
	import { shoppingBag } from '$lib/stores/shoppingBag';
	import { useQuery } from '@sveltestack/svelte-query';
	import { Button, ButtonToolbar, Icon } from 'sveltestrap';
	import type { Item } from '$lib/types/Item';
	import { formatCurrency } from '$lib/currencyHelpers';
	import { calculateTotal } from './+page.svelte';
	import { language } from '$lib/i18n';

	let queryResult = useQuery<Item[], Error>('items');

	let total: number;
	$: total = calculateTotal($shoppingBag, $queryResult.data || []);
</script>

<ButtonToolbar
	id="wrapper"
	style="left: initial; right: 0"
	class="fixed-bottom m-4 gap-2"
>
	<span class="shadow-lg rounded-pill bg-secondary text-white btn-lg">
		{formatCurrency(total, $language)}</span
	>

	<Button
		disabled={!$shoppingBag.length}
		on:click={() => {
			$payModal = true;
		}}
		size="lg"
		color="primary"
		class="shadow-lg rounded-pill">Pay <Icon name="arrow-right" /></Button
	>
</ButtonToolbar>
