<script lang="ts">
	import {
		Button,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Form,
		Input,
		ListGroup,
		Modal,
		Spinner
	} from 'sveltestrap';

	import type { Product, ProductSelectCallback } from './+page.svelte';
	import ProductResultCard from './ProductResultCard.svelte';
	import { t } from '$lib/i18n';

	export let callback: ProductSelectCallback;

	let searchTerm: string = '';
	let resultCount: number = 10;
	const resultCounts: number[] = Array.from(
		{ length: 5 },
		(v, i) => (i + 1) * 10
	);

	const SEARCH_ENDPOINT = 'https://world.openfoodfacts.org/cgi/search.pl';

	function searchProducts(searchTerm: string): Promise<Product[]> {
		return fetch(
			`${SEARCH_ENDPOINT}?search_terms=${searchTerm}&json=1&page_size=${resultCount}`
		)
			.then((res) => res.json())
			.then((json) => json.products);
	}

	function startSearch() {
		if (searchTerm != '') {
			searchResults = searchProducts(searchTerm);
		}
	}

	let searchResults: Promise<Product[]> | undefined;

	let open = false;
	const toggle = () => (open = !open);

	let input: HTMLInputElement;
</script>

<Button on:click={toggle}>{$t('stock:search_item')}</Button>
<Modal
	isOpen={open}
	{toggle}
	body
	header={$t('stock:search_item')}
	size="lg"
	on:open={() => {
		input.focus();
	}}
>
	<Form
		class="d-flex gap-2"
		on:submit={(e) => {
			e.preventDefault();
			startSearch();
		}}
	>
		<Input bind:inner={input} bind:value={searchTerm} type="search" />
		<Dropdown>
			<DropdownToggle caret
				>{$t('stock:result', { count: resultCount })}</DropdownToggle
			>
			<DropdownMenu>
				{#each resultCounts as count}
					<DropdownItem
						active={resultCount == count}
						on:click={() => {
							resultCount = count;
							startSearch();
						}}>{count}</DropdownItem
					>
				{/each}
			</DropdownMenu>
		</Dropdown>
		<Button type="submit">{$t('search')}</Button>
	</Form>

	<div class="my-2">
		{#if searchResults}
			{#await searchResults}
				<div class="d-flex align-items-center p-5">
					<Spinner class="m-auto" />
				</div>
			{:then products}
				<ListGroup>
					{#each products as product}
						<ProductResultCard
							callback={(product, mode) => {
								open = false;
								callback(product, mode);
							}}
							{product}
						/>
					{:else}
						<small>{$t('stock:no_items_found')}</small>
					{/each}
				</ListGroup>
			{/await}
		{:else}
			<small
				>{$t('stock:search_provider_info', {
					provider: 'OpenFoodFacts.org'
				})}</small
			>
		{/if}
	</div>
</Modal>
