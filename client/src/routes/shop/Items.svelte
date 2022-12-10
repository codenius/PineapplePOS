<script lang="ts">
	import ItemCard from './components/Items/ItemCard.svelte';
	import { zoomFactor } from '$lib/stores/itemsZoom';
	import { Accordion, AccordionItem, Spinner } from 'sveltestrap';
	import { useQuery } from '@sveltestack/svelte-query';
	import { shoppingBag } from '$lib/stores/shoppingBag';
	import type { Item } from '$lib/types/Item';
	import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';
	import { getDatabase } from '$lib/data';

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

	function splitItemsToCategorys(data: Item[]) {
		let items = data.sort((a, b) => {
			if (a.category > b.category) {
				return 1;
			}
			if (a.category < b.category) {
				return -1;
			}
			return 0;
		});

		let itemsByCategory: categoryItems[] = [];
		let categoryArray: Item[] = [];
		let prevItemCategory: Item['category'] = items[0].category;

		for (let index = 0; index < items.length; index++) {
			const element = items[index];
			if (element.category == prevItemCategory) {
				categoryArray.push(element);
			} else {
				itemsByCategory.push({
					category: prevItemCategory,
					items: categoryArray
				});
				categoryArray = [];
				categoryArray.push(element);
			}
			prevItemCategory = element.category;
		}
		return itemsByCategory;
	}
</script>

{#if $queryResult.isSuccess}
	<Accordion stayOpen={true} class="ItemGroup">
		{#each itemsByCategory as category}
			<AccordionItem active={true} header={category.category}>
				<div style="font-size: {($zoomFactor / 1.5) * 0.2}rem" id="wrapper">
					{#each category.items as item}
						<ItemCard {...item} />
					{/each}
				</div>
			</AccordionItem>
		{/each}
	</Accordion>
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
	#wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
		grid-auto-rows: min-content;
	}
	:global(.ItemGroup .accordion-body) {
		padding: 0.2em;
	}
</style>
