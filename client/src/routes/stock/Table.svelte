<script lang="ts">
	import {
		createTable,
		Subscribe,
		Render,
		createRender
	} from 'svelte-headless-table';
	import {
		addColumnFilters,
		addSortBy,
		addTableFilter,
		matchFilter
	} from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';
	import { useQuery } from '@sveltestack/svelte-query';
	import type { Item } from '$lib/types/Item';
	import ItemImage from './ItemImage.svelte';
	import { Icon, Spinner, Table } from 'sveltestrap';
	import ActionButtons from './ActionButtons.svelte';
	import SortSelect from './SortSelect.svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import TableSearch from './TableSearch.svelte';
	import { searchTerm } from './searchTerm';
	import { ItemsController } from '$lib/ApiControllers';
	import Price from './Price.svelte';
	import { formatCurrency } from '$lib/currencyHelpers';
	import { language } from '$lib/i18n';

	let queryResult = useQuery<Item[], Error>(
		'items',
		async () => {
			return ItemsController.getItems();
		},
		{ refetchOnMount: 'always' }
	);

	function checkEmpty<T>({ value }: { value: T }) {
		if (value !== null) {
			return value;
		}
		return '–';
	}

	const data = writable<Item[]>([]);
	$: if ($queryResult.isSuccess) {
		$data = $queryResult.data;
	}
	const table = createTable(data, {
		sort: addSortBy({
			toggleOrder: ['asc', 'desc'],
			initialSortKeys: [{ id: 'name', order: 'asc' }]
		}),
		colFilter: addColumnFilters(),
		tableFilter: addTableFilter({
			fn: ({ filterValue, value }) =>
				value.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			header: 'Image',
			accessor: 'image',
			cell: ({ value }) => createRender(ItemImage, { image: value }),
			plugins: {
				sort: { disable: true },
				tableFilter: { exclude: true }
			}
		}),
		table.column({
			header: 'Name',
			accessor: 'name'
		}),
		table.column({
			header: 'Category',
			accessor: 'category',
			cell: checkEmpty,
			plugins: {
				colFilter: {
					fn: matchFilter,
					render: ({ filterValue, preFilteredValues }) =>
						createRender(SortSelect, { filterValue, preFilteredValues })
				}
			}
		}),
		table.column({
			header: 'Amount',
			accessor: 'amount',
			cell: checkEmpty
		}),
		table.column({
			header: 'Price',
			accessor: 'price',
			cell: ({ value }) => createRender(Price, { price: value }),
			plugins: {
				tableFilter: {
					getFilterValue: (price) => formatCurrency(price, $language)
				}
			}
		}),
		table.column({
			header: () => createRender(TableSearch),
			accessor: 'id',
			cell: ({ value }) => createRender(ActionButtons, { id: value }),
			plugins: {
				sort: { disable: true },
				tableFilter: { exclude: true }
			}
		})
	]);

	const { headerRows, rows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { filterValue } = pluginStates.tableFilter;
	$: $filterValue = $searchTerm;
</script>

<div class="d-flex flex-column" style="height: 100%;">
	{#if $queryResult.isRefetching}
		<div
			transition:fade
			class="right-0 bottom-0 position-fixed m-2 p-2 px-3 text-primary bg-light rounded-pill border shadow-lg"
		>
			<Spinner size="sm" />
			Refreshing...
		</div>
	{/if}

	<Table striped hover {...$tableAttrs}>
		<thead class="sticky-top bg-white shadow-sm">
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
					<tr {...rowAttrs}>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe
								attrs={cell.attrs()}
								let:attrs
								props={cell.props()}
								let:props
							>
								<th {...attrs}>
									<span class="d-flex align-items-center gap-1">
										<button
											style="height: 2rem;"
											class="d-flex align-items-center gap-1 text-dark font-bold bg-transparent p-0 border-0"
											on:click={props.sort.toggle}
											disabled={props.sort.disabled}
											type="button"
										>
											<Render of={cell.render()} />
											<Icon
												class="d-inline-block {props.sort.order === undefined
													? 'invisible'
													: ''}"
												name={props.sort.order === 'asc'
													? 'sort-down'
													: props.sort.order === 'desc'
													? 'sort-up'
													: 'filter-left'}
											/>
										</button>

										{#if props.colFilter?.render}
											<Render of={props.colFilter.render} />
										{/if}
									</span>
								</th>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</thead>
		<tbody {...$tableBodyAttrs}>
			{#if $queryResult.isSuccess}
				{#each $rows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<tr
							on:click={() => {
								goto(`/stock/item?id=${row.original.id}`);
							}}
							{...rowAttrs}
						>
							{#each row.cells as cell (cell.id)}
								<Subscribe
									attrs={cell.attrs()}
									let:attrs
									props={cell.props()}
									let:props
								>
									<td {...attrs}>
										<Render of={cell.render()} />
									</td>
								</Subscribe>
							{/each}
						</tr>
					</Subscribe>
				{/each}
			{/if}
		</tbody>
	</Table>
	{#if $queryResult.isSuccess}
		{#if !$rows.length}
			<h4 class="m-auto">No products found.</h4>
		{/if}
	{/if}
	{#if $queryResult.isLoading}
		<div
			class="flex-grow-1 m-auto d-flex justify-content-center align-items-center"
		>
			<Spinner type="grow" />
		</div>
	{/if}
</div>
