<script context="module" lang="ts">
	import { writable, type Writable } from 'svelte/store';
	export const searchResults: Writable<Item[]> = writable([]);
	export const searchTerm: Writable<string> = writable('');

	let input: HTMLInputElement;

	export function focusSearch() {
		input.focus();
	}
</script>

<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import {
		Button,
		Form,
		Icon,
		Input,
		InputGroup,
		InputGroupText
	} from 'sveltestrap';
	import Fuse from 'fuse.js';
	import type { Item } from '$lib/types/Item';
	import { ItemsController } from '$lib/ApiControllers';

	const SEARCH_RESULTS_LIMIT = 10;
	const options = { keys: ['name', 'category', 'company'] };

	let fuse = new Fuse([] as Item[], options);

	const queryResult = useQuery(
		'items',
		async () => {
			return ItemsController.getItems();
		},
		{
			onSuccess: (data) => {
				fuse.setCollection(data);
			}
		}
	);

	function search(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		if (value.length) {
			$searchResults = fuse
				.search(value, { limit: SEARCH_RESULTS_LIMIT })
				.map((searchResult) => searchResult.item);
		} else {
			$searchResults = [];
		}
	}
</script>

<Form
	class="d-flex gap-1"
	on:submit={(event) => {
		event.preventDefault();
	}}
>
	<InputGroup>
		<Input
			disabled={!$queryResult.isSuccess}
			bind:value={$searchTerm}
			on:input={search}
			on:keydown={(e) => {
				if (e.key == 'Escape') {
					input.blur();
					e.preventDefault();
				}
				if (e.key != 'Enter') {
					/* pass Enter, to prevent form default */
					e.stopPropagation(); /* prevent global shortcuts from firing  */
				}
			}}
			on:focus={input.select}
			bind:inner={input}
			type="search"
			placeholder="search..."
		/>
		<InputGroupText class="p-0">
			<Button
				style="border-top-left-radius: 0;
                       border-bottom-left-radius: 0;"
				on:click={() => {
					$searchTerm = '';
					focusSearch();
				}}><Icon name="x-lg" /></Button
			>
		</InputGroupText>
	</InputGroup>
</Form>
