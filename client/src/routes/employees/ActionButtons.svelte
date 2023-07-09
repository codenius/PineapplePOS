<script lang="ts">
	import { Button, Icon } from 'sveltestrap';
	import DeleteModal from './DeleteModal.svelte';
	import type { Employee } from '$lib/types/Employee';

	export let id: Employee['id'];

	let isDeleteModalOpen = false;
</script>

<span class="d-flex gap-1 flex-wrap">
	<Button color="primary" outline href={`/employees/employee?id=${id}`}
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
