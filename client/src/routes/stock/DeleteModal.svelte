<script lang="ts">
	import { Button, Modal, ModalBody, ModalFooter, Spinner } from 'sveltestrap';
	import type { Item } from '$lib/types/Item';
	import { useMutation, useQueryClient } from '@sveltestack/svelte-query';
	import { createEventDispatcher } from 'svelte';
	import { ItemsController } from '$lib/ApiControllers';

	export let id: Item['id'];
	export let open = false;
	const queryClient = useQueryClient();

	function toggle() {
		open = !open;
	}

	const dispatch = createEventDispatcher();

	const deleteItemMutation = useMutation<void, void, Item['id']>(
		async (id: Item['id']) => {
			ItemsController.deleteItem(id);
		},
		{
			onSuccess: () => {
				open = false;
			}
		}
	);

	let deleteButton: HTMLButtonElement;
</script>

<Modal
	header="Confirm deletion"
	{toggle}
	isOpen={open}
	on:open={() => {
		deleteButton.focus();
	}}
	on:close={() => {
		if ($deleteItemMutation.isSuccess) {
			dispatch('deleted');
			queryClient.invalidateQueries('items');
		}
	}}
>
	<ModalBody>Are you sure you want to delete this item?</ModalBody>
	<ModalFooter>
		<Button
			bind:inner={deleteButton}
			on:click={() => {
				$deleteItemMutation.mutate(id);
			}}
			color="danger"
		>
			Delete {#if $deleteItemMutation.isLoading}
				<Spinner size="sm" />
			{/if}
		</Button>
		<Button
			on:click={() => {
				open = false;
			}}>Cancel</Button
		>
	</ModalFooter>
</Modal>
