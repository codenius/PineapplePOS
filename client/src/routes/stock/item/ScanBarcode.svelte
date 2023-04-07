<script lang="ts">
	import { Button, Form, Icon, Input, Modal, Spinner } from 'sveltestrap';
	import type { Product, ProductSelectCallback } from './+page.svelte';
	import BarcodeScanner from './BarcodeScanner.svelte';
	import ProductResultCard from './ProductResultCard.svelte';
	import { t } from '$lib/i18n';

	export let callback: ProductSelectCallback;

	let barcode: string = '';
	let productResult: Promise<Product>;

	const BARCODE_ENDPOINT = 'https://world.openfoodfacts.org/api/v2/product/';

	async function loadProduct(barcode: string): Promise<Product> {
		return fetch(`${BARCODE_ENDPOINT}${barcode}`)
			.then((res) => res.json())
			.then((res) => (res.status == 0 ? null : res.product));
	}

	let open = false;
	const toggle = () => (open = !open);

	let input: HTMLInputElement;
</script>

<Button on:click={toggle}>{$t('stock:scan_barcode')}</Button>
<Modal
	isOpen={open}
	{toggle}
	body
	header={$t('stock:scan_barcode')}
	size="lg"
	on:open={() => {
		input.focus();
	}}
>
	<BarcodeScanner
		bind:code={barcode}
		on:scan={() => {
			productResult = loadProduct(barcode);
		}}
	/>
	<Form
		class="d-flex gap-2"
		on:submit={(e) => {
			e.preventDefault();
			productResult = loadProduct(barcode);
		}}
	>
		<Input
			bind:inner={input}
			bind:value={barcode}
			type="search"
			inputmode="numeric"
		/>
		<Button type="submit">{$t('stock:load')}</Button>
	</Form>

	<div class="my-2">
		{#if productResult}
			{#await productResult}
				<div class="d-flex align-items-center p-5">
					<Spinner class="m-auto" />
				</div>
			{:then product}
				{#if product == null}
					<div class="m-0 p-1">{$t('stock:no_items_found')}</div>
				{:else}
					<ProductResultCard
						{product}
						callback={(product, mode) => {
							open = false;
							callback(product, mode);
						}}
					/>
				{/if}
			{/await}
		{/if}
	</div>
</Modal>
