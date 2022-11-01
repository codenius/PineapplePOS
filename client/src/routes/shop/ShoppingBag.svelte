<script>
	import { ListGroup } from 'sveltestrap';
	import ItemListEntry from './components/ShoppingBag/ItemListEntry.svelte';
	import data from '$lib/example.json';
</script>

<ListGroup class="p-2">
	{#each data as item}
		<ItemListEntry {...item} />
	{/each}
</ListGroup>
