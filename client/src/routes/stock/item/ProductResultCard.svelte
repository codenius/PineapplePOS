<script lang="ts">
	import ListItemImage from '$lib/components/ListItemImage.svelte';
	import { t } from '$lib/i18n';
	import { Button, ButtonToolbar, ListGroupItem } from 'sveltestrap';
	import type { Product } from './+page.svelte';

	export let product: Product;
	export let callback: (product: Product, mode: 'all' | 'image') => void;
</script>

<ListGroupItem class="d-flex gap-2">
	<ListItemImage height="8rem" image={product.image_front_small_url} />
	<div
		class="d-flex flex-column align-items-start justify-content-between gap-2"
	>
		<div>
			<h4 class="m-0">{product.product_name || '–'}</h4>
			<small>{product.brands}</small>
		</div>
		<ButtonToolbar class="gap-2">
			<Button
				color="primary"
				on:click={() => {
					callback(product, 'all');
				}}>{$t('stock:load_item_data')}</Button
			>
			<Button
				on:click={() => {
					callback(product, 'image');
				}}>{$t('stock:only_load_image')}</Button
			></ButtonToolbar
		>
	</div>
</ListGroupItem>
