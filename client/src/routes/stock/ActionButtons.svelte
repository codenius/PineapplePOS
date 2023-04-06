<script lang="ts">
	import type { Item } from '$lib/types/Item';
	import { Button, Icon } from 'sveltestrap';
	import DeleteModal from './DeleteModal.svelte';

	export let id: Item['id'];

	let isDeleteModalOpen = false;
</script>

<span class="d-flex gap-1 flex-wrap">
	<Button color="primary" outline href={`/stock/item?id=${id}`}
		><Icon name="pencil" /></Button
	>
	<Button
		on:click={(e) => {
			e.stopPropagation();
			isDeleteModalOpen = true;
		}}
		color="danger"
		outline
		><Icon name="trash" />
	</Button>
</span>

<DeleteModal bind:open={isDeleteModalOpen} {id} />
