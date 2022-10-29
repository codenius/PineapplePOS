<script>
	import { ListGroup } from 'sveltestrap';
	import ItemListEntry from './ShoppingBag/ItemListEntry.svelte';
</script>

<ListGroup class="p-2">
	{#each Array(10) as _}
		<ItemListEntry />
	{/each}
</ListGroup>
