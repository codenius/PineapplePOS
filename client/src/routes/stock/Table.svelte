<script lang="ts">
	import { getDatabase } from '$lib/data';
	import {
		createTable,
		Subscribe,
		Render,
		createRender
	} from 'svelte-headless-table';
	import { addSortBy } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';
	import { useQuery } from '@sveltestack/svelte-query';
	import type { Item } from '$lib/types/Item';
	import ItemImage from './ItemImage.svelte';
	import { Icon, Table } from 'sveltestrap';
	import ActionButtons from './ActionButtons.svelte';

	let queryResult = useQuery<Item[], Error>('Stock', async () => {
		return getDatabase();
	});

	const data = writable<Item[]>([]);
	$: if ($queryResult.isSuccess) {
		$data = $queryResult.data;
	}
	const table = createTable(data, {
		sort: addSortBy({
			toggleOrder: ['asc', 'desc'],
			initialSortKeys: [{ id: 'name', order: 'asc' }]
		})
	});

	const columns = table.createColumns([
		table.column({
			header: 'Image',
			accessor: 'image',
			cell: ({ value }) => createRender(ItemImage, { image: value }),
			plugins: {
				sort: { disable: true }
			}
		}),
		table.column({
			header: 'Name',
			accessor: 'name'
		}),
		table.column({
			header: 'Category',
			accessor: 'category'
		}),
		table.column({
			header: 'Amount',
			accessor: 'amount'
		}),
		table.column({
			header: '',
			accessor: 'id',
			cell: ({ value }) => createRender(ActionButtons, {id: value}),
			plugins: {
				sort: { disable: true }
			}
		})
	]);

	const { headerRows, rows, tableAttrs, tableBodyAttrs } =
		table.createViewModel(columns);
</script>

{#if $queryResult.isSuccess}
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
								<th {...attrs} on:click={props.sort.toggle}>
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
								</th>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</thead>
		<tbody {...$tableBodyAttrs}>
			{#each $rows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<tr on:click={()=>{alert()}} {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<td {...attrs}>
									<Render of={cell.render()} />
								</td>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</tbody>
	</Table>
{:else}
	Loading...
{/if}
