<script lang="ts">
	import ItemCard from './components/Items/ItemCard.svelte';
	import { zoomFactor } from '$lib/stores/itemsZoom';
	import { Accordion, AccordionItem, Spinner } from 'sveltestrap';
	import { useQuery } from '@sveltestack/svelte-query';
	import { shoppingBag } from '$lib/stores/shoppingBag';
	import type { Item } from '$lib/types/Item';
	import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';
	import { getDatabase } from '$lib/data';
	import { searchResults, searchTerm } from './SearchInput.svelte';

	const queryResult = useQuery('items', async () => {
		return getDatabase();
	});

	interface categoryItems {
		category: Item['category'];
		items: Item[];
	}

	let items: Item[];
	let itemsByCategory: categoryItems[];

	$: {
		if ($queryResult.isSuccess) {
			items = $queryResult.data.map((item: Item) => {
				let shoppingBagEntry = $shoppingBag.find(
					(shoppingBagEntry: ShoppingBagEntry) => shoppingBagEntry.id == item.id
				);
				let shoppingBagAmount = shoppingBagEntry ? shoppingBagEntry.amount : 0;
				return { ...item, amount: item.amount - shoppingBagAmount };
			});
			itemsByCategory = splitItemsToCategorys(items);
		}
	}

	function splitItemsToCategorys(items: Item[]) {
		let itemsByCategory: categoryItems[] = [];
		for (let index = 0; index < items.length; index++) {
			const item = items[index];
			let categoryIndex = itemsByCategory.findIndex(
				(categoryEntry) => categoryEntry.category == item.category
			);
			if (categoryIndex == -1) {
				itemsByCategory.push({ category: item.category, items: [] });
				categoryIndex = itemsByCategory.length - 1;
			}
			itemsByCategory[categoryIndex].items.push(item);
		}
		itemsByCategory = itemsByCategory.sort((a, b) => {
			if (a.category > b.category) {
				return 1;
			}
			if (a.category < b.category) {
				return -1;
			}
			return 0;
		});
		return itemsByCategory;
	}
</script>

{#if $queryResult.isSuccess}
	<div style="font-size: {($zoomFactor / 1.5) * 0.2}rem">
		{#if $searchTerm.length}
			<div
				on:wheel={(event) => {
					if (Math.abs(event.deltaX) == 0) {
						event.preventDefault();
						event.currentTarget.scrollLeft += event.deltaY;
					}
				}}
				class="p-2 w-100"
				id="searchWrapper"
			>
				{#each $searchResults as item}
					<ItemCard {...item} isSearchItemCard={true} />
				{:else}
					<h4 class="m-auto my-5">Nothing found.</h4>
				{/each}
			</div>{/if}
		<Accordion stayOpen={true} class="ItemGroup">
			{#each itemsByCategory as category}
				<AccordionItem active={true}>
					<span class="ACCORDIONHEADER" slot="header">{category.category}</span>
					<div class="p-1" id="wrapper">
						{#each category.items as item}
							<ItemCard {...item} />
						{/each}
					</div>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
{:else}
	<div class="h-100 d-flex justify-content-center align-items-center">
		{#if $queryResult.isLoading}
			<Spinner type="grow" />
		{/if}
		{#if $queryResult.isError}
			<span class="h4">Error: While loading the data an error occured.</span>
		{/if}
	</div>
{/if}

<style>
	#searchWrapper {
		display: grid;
		overflow-x: auto;
		grid-template-columns: repeat(auto-fill, minmax(15em, 15em));
		gap: 0.5em;
		grid-auto-rows: min-content;
		/* grid-auto-flow: column; */
	}
	#wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
		grid-auto-rows: min-content;
		gap: 0.5em;
	}
	:global(.ItemGroup .accordion-header) {
		font-size: inherit;
	}
	:global(.ItemGroup .accordion-item .accordion-button) {
		font-size: inherit;
		padding: 1em 1.25em;
	}
	:global(.ItemGroup .accordion-item .accordion-button::after) {
		width: 1.25em;
		height: 1.25em;
		background-size: inherit;
		background-position: center;
	}

	:global(.ItemGroup .accordion-body) {
		padding: 0.2em;
	}
</style>
