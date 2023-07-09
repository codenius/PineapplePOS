<script lang="ts" context="module">
	export let searchResultsContainer: HTMLDivElement;
</script>

<script lang="ts">
	import ItemCard from './components/Items/ItemCard.svelte';
	import { zoomFactor } from '$lib/stores/itemsZoom';
	import {
		Accordion,
		AccordionItem,
		Button,
		ButtonToolbar,
		Spinner
	} from 'sveltestrap';
	import { useQuery } from '@sveltestack/svelte-query';
	import { shoppingBag } from '$lib/stores/shoppingBag';
	import type { Item } from '$lib/types/Item';
	import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';
	import { searchResults, searchTerm } from './SearchInput.svelte';
	import { ItemsController } from '$lib/ApiControllers';
	import { t } from '$lib/i18n';
	import EditCategoriesOrderModal from './components/Items/EditCategoriesOrderModal.svelte';

	const itemsQuery = useQuery('items', async () => {
		return ItemsController.getItems();
	});

	const categoriesQuery = useQuery('categories', async () => {
		return ItemsController.getCategories();
	});

	interface categoryItems {
		category: Item['category'];
		items: Item[];
		_isDefault?: boolean;
	}

	let items: Item[];
	let itemsByCategory: categoryItems[];

	$: {
		if ($itemsQuery.isSuccess && $categoriesQuery.isSuccess) {
			items = substracteShoppingBagAmount($itemsQuery.data, $shoppingBag);
			itemsByCategory = splitItemsToCategorys(items);

			const defaultCategoryIndex = itemsByCategory.findIndex(
				(categoryItem) => categoryItem._isDefault
			);
			if (defaultCategoryIndex != -1) {
				itemsByCategory[defaultCategoryIndex].category = $t(
					'uncategorized'
				) as string;
			}
		}
	}

	let searchItems: Item[];

	$: {
		searchItems = substracteShoppingBagAmount($searchResults, $shoppingBag);
	}

	function substracteShoppingBagAmount(
		items: Item[],
		shoppingBag: ShoppingBagEntry[]
	): Item[] {
		return items.map((item: Item) => {
			let shoppingBagEntry = shoppingBag.find(
				(shoppingBagEntry: ShoppingBagEntry) => shoppingBagEntry.id == item.id
			);
			let shoppingBagAmount = shoppingBagEntry ? shoppingBagEntry.amount : 0;
			return { ...item, amount: item.amount - shoppingBagAmount };
		});
	}

	function splitItemsToCategorys(items: Item[]) {
		let itemsByCategory: categoryItems[] = [];
		for (let index = 0; index < $categoriesQuery.data.length; index++) {
			const category = $categoriesQuery.data[index];
			const categoryItems = items.filter((item) =>
				item.category ? item.category.id == category.id : false
			);
			itemsByCategory.push({
				category: category.name,
				items: categoryItems,
				_isDefault: category._isDefault
			});
		}
		return itemsByCategory;
	}

	let activeSection: string;
</script>

{#if $itemsQuery.isSuccess}
	<div id={$t('stock:all')} style="font-size: {($zoomFactor / 1.5) * 0.2}rem">
		<ButtonToolbar
			class="position-sticky top-0 bg-white p-2 d-flex flex-nowrap overflow-auto gap-1 shadow-sm"
			style="
				z-index: 2;
				/* scroll shadows */
				background-image: 
					linear-gradient(to right, white, white), 
					linear-gradient(to right, white, white), 
					linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0)), 
					linear-gradient(to left, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0));
				background-position: left center, right center, left center, right center;
				background-repeat: no-repeat;
				background-color: white;
				background-size: 2rem 100%, 2rem 100%, 1rem 100%, 1rem 100%;
				background-attachment: local, local, scroll, scroll;
				"
		>
			{#each [{ category: $t('stock:all') }, ...itemsByCategory] as category}
				<Button
					class="rounded-pill text-nowrap"
					color="primary"
					outline={!(activeSection == category.category)}
					size="sm"
					href="#{category.category}"
					on:click={() => {
						activeSection = category.category;
					}}>{category.category}</Button
				>
			{/each}
			<EditCategoriesOrderModal />
		</ButtonToolbar>

		{#if $searchTerm.length}
			<div
				bind:this={searchResultsContainer}
				on:wheel={(event) => {
					if (Math.abs(event.deltaX) == 0) {
						event.preventDefault();
						event.currentTarget.scrollLeft += event.deltaY;
					}
				}}
				class="p-2 w-100"
				id="searchWrapper"
			>
				{#each searchItems as item}
					<ItemCard {...item} isSearchItemCard={true} />
				{:else}
					<h4 class="m-auto my-5">{$t('no_items_found')}</h4>
				{/each}
			</div>
		{/if}
		<Accordion stayOpen={true} class="ItemGroup">
			{#each itemsByCategory as category}
				<AccordionItem active={true}>
					<span class="ACCORDIONHEADER" slot="header" id={category.category}
						>{category.category}</span
					>
					<div class="p-1" id="wrapper">
						{#each category.items as item}
							<ItemCard {...item} />
						{:else}
							<span class="m-auto my-5">{$t('no_items')}</span>
						{/each}
					</div>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
{:else}
	<div class="h-100 d-flex justify-content-center align-items-center px-4">
		{#if $itemsQuery.isLoading}
			<Spinner type="grow" />
		{/if}
		{#if $itemsQuery.isError}
			<span class="h4">{$t('loading_error')}</span>
		{/if}
	</div>
{/if}

{#if $itemsQuery.isSuccess}
	{#if !itemsByCategory.length}
		<div class="h-100 d-flex justify-content-center align-items-center px-4">
			<span class="h4">{$t('no_items')}</span>
		</div>
	{/if}
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
