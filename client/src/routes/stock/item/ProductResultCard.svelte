<script lang="ts">
	import ListItemImage from '$lib/components/ListItemImage.svelte';
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
				on:click={() => {
					callback(product, 'all');
				}}>Load product data</Button
			>
			<Button
				on:click={() => {
					callback(product, 'image');
				}}>Only load image</Button
			></ButtonToolbar
		>
	</div>
</ListGroupItem>
