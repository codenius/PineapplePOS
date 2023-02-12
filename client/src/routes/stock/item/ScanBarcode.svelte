<script lang="ts">
	import { Button, Form, Input, Modal, Spinner } from 'sveltestrap';
	import type { Product, ProductSelectCallback } from './+page.svelte';
	import ProductResultCard from './ProductResultCard.svelte';

	export let callback: ProductSelectCallback;

	let barcode: string = '';
	let productResult: Promise<Product>;

	const BARCODE_ENDPOINT = 'https://world.openfoodfacts.org/api/v2/product/';

	async function loadProduct(barcode: string): Promise<Product> {
		return fetch(`${BARCODE_ENDPOINT}${barcode}`)
			.then((res) => res.json())
			.then((res) => res.product);
	}

	let open = false;
	const toggle = () => (open = !open);

	let input: HTMLInputElement;
</script>

<Button on:click={toggle}>Scan barcode</Button>
<Modal
	isOpen={open}
	{toggle}
	body
	header="Scan barcode"
	size="lg"
	on:open={() => {
		input.focus();
	}}
>
	<Form
		class="d-flex gap-2"
		on:submit={(e) => {
			e.preventDefault();
			productResult = loadProduct(barcode);
		}}
	>
		<Input bind:inner={input} bind:value={barcode} type="search" />
		<Button type="submit">Load</Button>
	</Form>

	<div class="my-2">
		{#if productResult}
			{#await productResult}
				<div class="d-flex align-items-center p-5">
					<Spinner class="m-auto" />
				</div>
			{:then product}
				<ProductResultCard
					{product}
					callback={(product, mode) => {
						open = false;
						callback(product, mode);
					}}
				/>
			{/await}
		{/if}
	</div>
</Modal>
